import { LitElement, html, css, nothing } from 'lit';
import { composeMonthData, getWeekDays } from './utils';

const tagName = 'hp-month';

export class HPMonth extends LitElement {
  static styles = css`
    :host {
      font-family: sans-serif;
      background: #fff;
      color: #000;
      display: block;
      overflow: hidden;
      border-radius: 10px;
      margin: 10px 0;
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
      text-align: var(--hp-month-caption-text-align, center);
    }

    table tr th {
      border-bottom: 1px solid var(--hp-month-th-border-color, #000);
      font-weight: normal;
    }

    table tr td {
      border-bottom: 1px solid var(--hp-month-td-border-color, #aaa);
    }

    table tr:last-child td {
      border-bottom: none;
    }

    table th,
    table td {
      padding: 6px;
      font-size: 14px;
    }

    table th {}

    table td:nth-last-child(2),
    table td:last-child {
      background: var(--hp-month-weekend-background, #fff);
      color: var(--hp-month-weekend-color, #000);
    }

    table td.suggestion {
      background: var(--hp-month-suggestion-background, #666);
      color: var(--hp-month-suggestion-color, #fff);
    }

    table td.holiday {
      background: var(--hp-month-holiday-background, #222);
      color: var(--hp-month-holiday-color, #fff);
    }

    table td.pre-month,
    table td.post-month {
      color: var(--hp-month-pre-post-color, #000);
    }
  `;

  static get properties() {
    return {
      index: { type: Number },
      year: { type: Number },
      name: { type: String },
      holidays: { type: Array },
      locale: { type: String },
    };
  };

  constructor() {
    super();

    this.index = 0;
    this.year = null;
    this.name;
    this.holidays = [];
    this.locale = 'bg';

    this.monthData = [];
    this.weekDays = [];
  };

  connectedCallback() {
    super.connectedCallback();
  };

  disconnectedCallback() {
    super.disconnectedCallback();
  };

  willUpdate(changedProperties) {
    if (changedProperties.has('index') || changedProperties.has('year') || changedProperties.has('holidays')) {
      this.monthData = composeMonthData(this.index, this.year, this.holidays);
    }

    if (changedProperties.has('locale')) {
      this.weekDays = getWeekDays(this.locale);
    }
  };

  renderCaption() {
    if (typeof this.name !== 'string' || this.name.length < 1) {
      return nothing;
    }

    return html`<caption>${this.name}</caption>`;
  };

  renderPreMonth() {
    return html`<td class="pre-month">x</td>`;
  };

  renderPostMonth() {
    return html`<td class="post-month">x</td>`;
  };

  renderSuggestion(day) {
    return html`<td class="suggestion">${day.label}</td>`;
  };

  renderHoliday(day) {
    return html`<td class="holiday">${day.label}</td>`;
  };

  renderDay(day) {
    return html`<td>${day.label}</td>`;
  };

  renderWeekDayLabel(index) {
    if (!Array.isArray(this.weekDays) || this.weekDays.length < 1) {
      return html`<td>X</td>`;
    }

    return html`<td>${this.weekDays[index]}</td>`;
  };

  render() {
    if (!Array.isArray(this.monthData) || this.monthData.length < 1) {
      return nothing;
    }

    return html`
      <table>
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
                  if (day.label === 'preMonth') {
                    return this.renderPreMonth();
                  }

                  if (day.label === 'postMonth') {
                    return this.renderPostMonth();
                  }

                  if (day.suggestion) {
                    return this.renderSuggestion(day);
                  }

                  if (day.holiday) {
                    return this.renderHoliday(day);
                  }

                  return this.renderDay(day);
                })}
              </tr>
            `;
          })}
        </tbody>
      </table>
    `;
  };
}

customElements.define(tagName, HPMonth);
