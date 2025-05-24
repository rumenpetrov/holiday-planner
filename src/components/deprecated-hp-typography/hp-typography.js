import { LitElement, html, css, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

const tagName = "hp-typography";

export class HPTypography extends LitElement {
  static styles = css`
    * {
      padding: 0;
      margin: 0;
      outline: 0;
      letter-spacing: 0.3px;
    }

    /* Scheme: 1.333 - Perfect fourth */
    .headline {
      font-family: var(--font-family-secondary);
      font-weight: 400;
      line-height: 1;
    }

    .h1 {
      margin-top: 0;
      font-size: var(--font-size-h1);
    }
    .h2 {
      font-size: var(--font-size-h2);
    }
    .h3 {
      font-size: var(--font-size-h3);
    }
    .h4 {
      font-size: var(--font-size-h4);
    }
    .h5 {
      font-size: var(--font-size-h5);
    }
    .p {
      font-family: var(--font-family-primary);
      font-size: var(--font-size-p);
      line-height: 1.3;
    }
    .small {
      font-size: var(--font-size-small);
      line-height: 1.3;
    }

    .font-primary {
      font-family: var(--font-family-primary);
    }

    .font-secondary {
      font-family: var(--font-family-secondary);
    }

    .margin-bottom {
      margin-bottom: 0.4em;
    }
    .margin-bottom.h1 {
      margin-bottom: 0.6em;
    }
  `;

  static properties = {
    element: { type: String },
    appearance: { type: String },
    font: { type: String },
    lineHeight: { type: String },
    disableMarginBottom: { type: Boolean },
    styles: { type: Object },
  };

  constructor() {
    super();

    this.element = "p";
    this.appearance = "p";
    this.font;
    this.lineHeight;
    this.disableMarginBottom = false;

    this.headlineElementList = ["h1", "h2", "h3", "h4", "h5"];

    this.styles = {};
  }

  render() {
    const classRoot = classMap({
      [`${this.appearance}`]: Boolean(this.appearance),
      [`font-${this.font}`]: Boolean(this.font),
      headline: this.headlineElementList.includes(this.appearance),
      "margin-bottom": !this.disableMarginBottom,
    });
    const styleRoot = styleMap({ ...this.styles, lineHeight: this.lineHeight });

    if (this.element === "h1") {
      return html`<h1 class=${classRoot} style=${styleRoot}><slot></slot></h1>`;
    }

    if (this.element === "h2") {
      return html`<h2 class=${classRoot} style=${styleRoot}><slot></slot></h2>`;
    }

    if (this.element === "h3") {
      return html`<h3 class=${classRoot} style=${styleRoot}><slot></slot></h3>`;
    }

    if (this.element === "h4") {
      return html`<h4 class=${classRoot} style=${styleRoot}><slot></slot></h4>`;
    }

    if (this.element === "h5") {
      return html`<h5 class=${classRoot} style=${styleRoot}><slot></slot></h5>`;
    }

    if (this.element === "small") {
      return html`<small class=${classRoot} style=${styleRoot}
        ><slot></slot
      ></small>`;
    }

    return html`<p class=${classRoot} style=${styleRoot}><slot></slot></p>`;
  }
}

customElements.define(tagName, HPTypography);
