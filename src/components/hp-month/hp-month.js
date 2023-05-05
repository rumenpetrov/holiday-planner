import { LitElement, html, css } from 'lit';
import { composeMonthData } from './utils';

const tagName = 'hp-month';

export class HPMonth extends LitElement {
  static styles = css`
    :host {
      font-family: var(--hp-month-font-family);
      background: var(--hp-month-background, #fff);
      color: var(--hp-month-color, #000);
      display: block;
      overflow: hidden;
      border-radius: 10px;
      padding: 10px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease-in-out;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      text-align: center;
    }

    table caption {
      margin: 0 0 10px;
      font-size: 16px;
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
      color: var(--hp-month-weekend-color, #aaa);
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
      color: var(--hp-month-pre-post-color, #aaa);
    }
  `;
  static get properties() {
    return {
      index: { type: Number },
      year: { type: Number },
      name: { type: String },
      holidays: { type: Array },
    };
  };

  constructor() {
    super();

    this.index = 0;
    this.year = null;
    this.name = 'Unknown';
    this.holidays = [];
  };

  render() {
    const monthData = composeMonthData(this.index, this.year, this.holidays);

    return html`
      <table>
        <caption>${this.name}</caption>
        <thead>
          <tr>
            <th>П</th>
            <th>В</th>
            <th>С</th>
            <th>Ч</th>
            <th>П</th>
            <th>С</th>
            <th>Н</th>
          </tr>
        </thead>
        <tbody>
          ${monthData.map((days) => {
            return html`
              <tr>
                ${days.map((day) => {
                  if (day.label === 'preMonth') {
                    return html`<td class="pre-month">x</td>`;
                  }

                  if (day.label === 'postMonth') {
                    return html`<td class="post-month">x</td>`;
                  }

                  if (day.suggestion) {
                    return html`<td class="suggestion">${day.label}</td>`;
                  }

                  if (day.holiday) {
                    return html`<td class="holiday">${day.label}</td>`;
                  }

                  return html`<td>${day.label}</td>`;
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
