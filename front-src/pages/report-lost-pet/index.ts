import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class ReportPet extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {}
  render() {
    this.innerHTML = `
    <custom-header></custom-header>
    <h1>Soy la report pets</h1>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("report-pet-page", ReportPet);
