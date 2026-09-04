import type { GoogleEvent, Params } from "@data/get-calendar-events";
import getCalendarEvents from "@data/get-calendar-events";
import { sortCalendarEvents } from "@utilities/sort-calendar-events";
import { filterOutUnofficialCalendarEvents } from "@utilities/filter-out-unofficial-calendar-events";
import { addExtraProperties } from "@utilities/add-extra-properties";
import { transformToThisYearData } from "@utilities/transform-to-this-year-data";

/**
 * A service to handle the calendar data pipeline:
 * Fetching -> Filtering -> Sorting -> Enriching -> Transforming
 */
export const CalendarService = {
  /**
   * Fetches, filters, sorts, enriches, and transforms data for a yearly view.
   */
  async getYearData(year: number, locale: string) {
    const { data, error } = await getCalendarEvents({
      fromYear: year,
      toYear: year + 1,
      locale,
      toNextJanuary: true,
    });

    if (error) {
      return { data: [], error };
    }

    // Pipeline: Sort -> Filter -> Enrich
    const processedData = addExtraProperties(
      filterOutUnofficialCalendarEvents(sortCalendarEvents(data)),
      locale
    );

    // Transform for Year view
    return {
      data: transformToThisYearData(processedData, year),
      error: null,
    };
  },

  /**
   * Fetches, filters, sorts, and enriches data for a monthly view.
   * (Placeholder for future use, but follows the same pattern)
   */
  async getMonthlyData(year: number, month: number, locale: string) {
    // This will need a different transformation in the future
    const { data, error } = await getCalendarEvents({
      fromYear: year,
      toYear: year,
      locale,
      toNextJanuary: false,
    });

    if (error) {
      return { data: [], error };
    }

    const processedData = addExtraProperties(
      filterOutUnofficialCalendarEvents(sortCalendarEvents(data)),
      locale
    );

    // For now, just return the processed data. 
    // We would need a transformToThisMonthData utility here.
    return {
      data: processedData, // This is technically a list of events, but not grouped by month
      error: null,
    };
  },

  /**
   * Just fetches and cleans the data without view-specific transformations.
   * Useful if a component needs the raw list of official events.
   */
  async getBaseData(params: Params) {
    const { data, error } = await getCalendarEvents(params);

    if (error) {
      return { data: [], error };
    }

    const locale = params.locale || "bg";
    return {
      data: addExtraProperties(
        filterOutUnofficialCalendarEvents(sortCalendarEvents(data)),
        locale
      ),
      error: null,
    };
  },
};
