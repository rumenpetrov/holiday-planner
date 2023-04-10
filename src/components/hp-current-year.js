import { LitElement, html, css } from 'lit';

const tagName = 'hp-current-year';

export class HPCurrentYear extends LitElement {
  static styles = css`
    :host {
      background-image: var(--hp-current-year-background-image);
      background-color: var(--hp-current-year-background-color, white);
      font-family: var(--hp-current-year-font-family);
      display: inline-block;
      padding: 0 4px;
    }
  `;
  render() {
    return html` <strong>${new Date().getFullYear()}</strong> `;
  }
}

customElements.define(tagName, HPCurrentYear);
