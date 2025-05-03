import { LitElement, html, css, nothing } from "lit";
import { sortCalendarEvents } from "@utilities/sort-calendar-events";
import { filterOutUnofficialCalendarEvents } from "@utilities/filter-out-unofficial-calendar-events";
import { transformToThisMonthData } from "@utilities/transform-to-this-month-data";
import { addExtraProperties } from "@utilities/add-extra-properties";

import "@components/hp-month/hp-month.js";

const tagName = "hp-event-list";

export class HPEventList extends LitElement {
  static styles = css`
    :host {
      font-family: sans-serif;
      color: var(--palette-dominant-contrast, #000);
      display: block;
      overflow: hidden;
      border-radius: 10px;
      margin: 10px 0;
    }

    .root {
      border-bottom: calc(var(--space-size-100) / 2) dotted
        var(--palette-dominant-contrast);
      margin: 0 0 var(--space-size-200) 0;
    }
  `;

  static properties = {
    index: { type: Number },
    year: { type: Number },
    data: { type: Array },
    list: { type: Array },
  };

  constructor() {
    super();

    this.index;
    this.year;
    this.data = [];
    this.list = [];
  }

  willUpdate(changedProperties, ...rest) {
    if (
      changedProperties.has("index") ||
      changedProperties.has("year") ||
      changedProperties.has("data")
    ) {
      this.transformData();
    }
  }

  transformData() {
    const listOfficial = addExtraProperties(
      filterOutUnofficialCalendarEvents(sortCalendarEvents(this.data)),
    );

    this.list = transformToThisMonthData(listOfficial, this.index);
  }

  render() {
    if (!Array.isArray(this.list) || this.list.length < 1) {
      return html`<slot name="fallback"></slot>`;
    }

    return this.list.map((event) => {
      return html`<p class="root">
        ${event.start.displayDate} - ${event.displaySummary}
      </p>`;
    });
  }
}

customElements.define(tagName, HPEventList);
