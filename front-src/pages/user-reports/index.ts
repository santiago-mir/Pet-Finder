import { Router } from "@vaadin/router";

class UserReports extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {}

  render() {
    this.innerHTML = `
        soy la user reports
    `;
    this.addListeners();
  }
}
customElements.define("user-reports-page", UserReports);
