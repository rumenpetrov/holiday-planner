import { LitElement, html, css, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

const tagName = 'hp-typography';

export class HPTypography extends LitElement {
  static styles = css`
    * {
      padding: 0;
      margin: 0;
      outline: 0;
    }

    .h1,
    .h2,
    .h3,
    .h4 {
      font-family: var(--font-family-secondary);
      line-height: 1;
    }

    .h1 {
      font-size: 4.8rem;
    }
    .h2 {
      font-size: 3.4rem;
    }
    .h3 {
      font-size: 2.4rem;
    }
    .h4 {
      font-size: 2rem;
    }

    .p {
      font-family: var(--font-family-primary);
      font-size: 1.6rem;
      line-height: 1.3;
    }

    .font-primary {
      font-family: var(--font-family-primary);
    }

    .font-secondary {
      font-family: var(--font-family-secondary);
    }

    .margin-bottom {
      margin-bottom: 0.6em;
    }
  `;

  static get properties() {
    return {
      element: { type: String },
      appearance: { type: String },
      font: { type: String },
      lineHeight: { type: String },
      disableMarginBottom: { type: Boolean },
      styles: { type: Object },
    };
  };

  constructor() {
    super();

    this.element = 'p';
    this.appearance = 'p';
    this.font;
    this.lineHeight;
    this.disableMarginBottom = false;

    this.styles = {};
  };

  render() {
    const classRoot = classMap({
      [`${this.appearance}`]: Boolean(this.appearance),
      [`font-${this.font}`]: Boolean(this.font),
      'margin-bottom': !this.disableMarginBottom,
    });
    const styleRoot = styleMap({ ...this.styles, lineHeight: this.lineHeight });

    if (this.element === 'h1') {
      return html`<h1 class=${classRoot} style=${styleRoot}><slot></slot></h1>`;
    }

    if (this.element === 'h2') {
      return html`<h2 class=${classRoot} style=${styleRoot}><slot></slot></h2>`;
    }

    if (this.element === 'h3') {
      return html`<h3 class=${classRoot} style=${styleRoot}><slot></slot></h3>`;
    }

    if (this.element === 'h4') {
      return html`<h4 class=${classRoot} style=${styleRoot}><slot></slot></h4>`;
    }

    return html`<p class=${classRoot} style=${styleRoot}><slot></slot></p>`;
  };
}

customElements.define(tagName, HPTypography);
