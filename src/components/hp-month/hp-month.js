import { LitElement, html, css, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { composeMonthData, getWeekDays } from "./utils";

const tagName = "hp-month";

export class HPMonth extends LitElement {
  static styles = css`
    ::selection {
      background-color: var(--selection-background-color);
      color: var(--selection-color);
    }

    :host {
      font-family: sans-serif;
      background: var(--block-calendar-background, #fff);
      color: var(--block-calendar-color, #000);
      overflow: hidden;
      border-radius: 10px;
      margin: 10px 0;
    }

    :host(:not([hidden])) {
      display: block;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      text-align: center;
    }

    table caption {
      margin: 0 0 10px;
      font-size: 18px;
      line-height: 1.2;
      font-weight: normal;
      text-align: var(--block-calendar-caption-text-align, center);
    }

    table tr th {
      border-bottom: 1px solid var(--block-calendar-th-border-color, #000);
      font-weight: normal;
    }

    table tr td {
      border-bottom: 1px solid var(--block-calendar-td-border-color, #aaa);
    }

    table tr:last-child td {
      border-bottom: none;
    }

    table th,
    table td {
      padding: 6px;
      font-size: 14px;
    }

    table td:nth-last-child(2),
    table td:last-child {
      background: var(--block-calendar-weekend-background, #fff);
      color: var(--block-calendar-weekend-color, #000);
    }

    table td.suggestion {
      background: var(--block-calendar-suggestion-background, #666);
      color: var(--block-calendar-suggestion-color, #fff);
    }

    table td.holiday {
      background: var(--block-calendar-holiday-background, #222);
      color: var(--block-calendar-holiday-color, #fff);
    }

    table td#today {
      background: var(--block-calendar-today-background, red);
      color: var(--block-calendar-today-color, #fff);
    }

    table td.pre-month,
    table td.post-month {
      color: var(--block-calendar-pre-post-color, #000);
    }
  `;

  static properties = {
    index: { type: Number },
    year: { type: Number },
    name: { type: String },
    holidays: { type: Array },
    now: { type: String },
    locale: { type: String },
  };

  constructor() {
    super();

    this.index = 0;
    this.year = null;
    this.name;
    this.holidays = [];
    this.now = "";
    this.locale = "bg";

    this.monthData = [];
    this.weekDays = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.setMetaAttributesOnHost();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  setMetaAttributesOnHost() {
    if (!this.now) {
      return;
    }

    const today = new Date(+this.now);
    const todayYear = today.getFullYear();
    const todayMonthIndex = today.getMonth();

    if (todayYear === this.year && todayMonthIndex === this.index) {
      this.setAttribute("data-temporal-state", "present");
    } else if (
      todayYear > this.year ||
      (todayYear === this.year && todayMonthIndex > this.index)
    ) {
      this.setAttribute("data-temporal-state", "past");
    } else {
      this.setAttribute("data-temporal-state", "future");
    }
  }

  willUpdate(changedProperties) {
    if (
      changedProperties.has("index") ||
      changedProperties.has("year") ||
      changedProperties.has("holidays")
    ) {
      this.monthData = composeMonthData(this.index, this.year, this.holidays);
    }

    if (changedProperties.has("locale")) {
      this.weekDays = getWeekDays(this.locale);
    }

    if (
      changedProperties.has("now") ||
      changedProperties.has("index") ||
      changedProperties.has("year")
    ) {
      this.setMetaAttributesOnHost();
    }
  }

  isToday(day) {
    if (!this.now || !+day.label) {
      return false;
    }

    const today = new Date(+this.now);
    const todayYear = today.getFullYear();
    const todayMonthIndex = today.getMonth();
    const todayDay = today.getDate();

    return (
      todayYear === this.year &&
      todayMonthIndex === this.index &&
      todayDay === +day.label
    );
  }

  renderCaption() {
    if (typeof this.name !== "string" || this.name.length < 1) {
      return nothing;
    }

    return html`<caption>
      ${this.name}
    </caption>`;
  }

  renderPreMonth() {
    return html`<td class="pre-month">x</td>`;
  }

  renderPostMonth() {
    return html`<td class="post-month">x</td>`;
  }

  renderSuggestion(day, today) {
    return html`<td
      class="suggestion"
      id="${ifDefined(today)}"
      part="${ifDefined(today)}"
    >
      ${day.label}
    </td>`;
  }

  renderHoliday(day, today) {
    return html`<td
      class="holiday"
      id="${ifDefined(today)}"
      part="${ifDefined(today)}"
    >
      ${day.label}
    </td>`;
  }

  renderDay(day, today) {
    return html`<td id="${ifDefined(today)}" part="${ifDefined(today)}">
      ${day.label}
    </td>`;
  }

  renderWeekDayLabel(index) {
    if (!Array.isArray(this.weekDays) || this.weekDays.length < 1) {
      return html`<td>X</td>`;
    }

    return html`<td>${this.weekDays[index]}</td>`;
  }

  render() {
    if (!Array.isArray(this.monthData) || this.monthData.length < 1) {
      return nothing;
    }

    return html`
      <table data-month="${this.month}">
        ${this.renderCaption()}
        <thead>
          <tr>
            ${this.weekDays.map((_, index) => this.renderWeekDayLabel(index))}
          </tr>
        </thead>
        <tbody>
          ${this.monthData.map((days) => {
            return html`
              <tr>
                ${days.map((day) => {
                  const today = this.isToday(day) ? "today" : undefined;

                  if (day.label === "preMonth") {
                    return this.renderPreMonth();
                  }

                  if (day.label === "postMonth") {
                    return this.renderPostMonth();
                  }

                  if (day.suggestion) {
                    return this.renderSuggestion(day, today);
                  }

                  if (day.holiday) {
                    return this.renderHoliday(day, today);
                  }

                  return this.renderDay(day, today);
                })}
              </tr>
            `;
          })}
        </tbody>
      </table>
    `;
  }
}

customElements.define(tagName, HPMonth);
