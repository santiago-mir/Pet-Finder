import { state } from "../../state.ts";
import { Router } from "@vaadin/router";
import { Dropzone } from "dropzone";
import { initMap } from "../../../lib/mapbox.ts";

class ReportSeenPet extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {}
  render() {
    this.innerHTML = `
    soy la report seen page
    `;
    this.addListeners();
  }
}
customElements.define("report-seen-pet-page", ReportSeenPet);
