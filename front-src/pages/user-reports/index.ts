import { Router } from "@vaadin/router";
import { state } from "../../state";

class UserReports extends HTMLElement {
  connectedCallback() {
    this.render();
    state.getUserReports();
  }
  addListeners() {}

  render() {
    this.innerHTML = `
        <custom-header></custom-header>
        <h1>Tus mascotas reportadas</h1>
         <div class="pets-container"></div>
    `;
    this.addListeners();
  }
}
customElements.define("user-reports-page", UserReports);
