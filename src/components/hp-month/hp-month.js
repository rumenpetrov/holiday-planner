import { LitElement, html, css } from 'lit';
import { composeMonthData } from './utils';

const tagName = 'hp-month';

export class HPMonth extends LitElement {
  static styles = css`
    :host {
      font-family: var(--hp-month-font-family);
      color: var(--hp-month-color, #000);
      background-color: var(--hp-month-background-color, #f9f9f9);
      background-image: var(--hp-month-background-image);
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
      text-align: center;
    }

    table tr th {
      border-bottom: 1px solid var(--hp-month-th-border-color, #909090);
      font-weight: normal;
    }

    table tr td {
      border-bottom: 1px solid var(--hp-month-td-border-color, #e9e9e9);
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
      background-color: var(--hp-month-weekend-background-color, #edf2fb);
    }

    table td.suggestion {
      background-image: var(--hp-month-suggestion-background-image, linear-gradient(225deg, #f5f7fa 0%, #c3cfe2 100%));
    }

    table td.holiday {
      background-image: var(--hp-month-holiday-background-image, linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%));
    }

    table td.pre-month,
    table td.post-month {
      color: #aaa
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
