import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class ReportCreated extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {
    // actualiza los reports del usuario, con el nuevo report
    state.updateUserReports();
    // return home button
    const returnButtonEl = this.querySelector(".return");
    returnButtonEl?.addEventListener("click", (ev) => {
      state.resetReportFlag();
      Router.go("/home");
    });
    // new report button
    const newReportButtonEl = this.querySelector(".report");
    newReportButtonEl?.addEventListener("click", (ev) => {
      state.resetReportFlag();
      Router.go("/report-pet");
    });
  }
  render() {
    this.innerHTML = `
    <custom-header></custom-header>
    <div class="main-container">
    <h1>El reporte fue creado correctamente</h1>
    <p>Te avisaremos a tu mail si alguien ve a tu mascota!</p>
    <button class="button report">Crear un nuevo reporte</button>
    <button class="button return">Volver</button>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("report-created-page", ReportCreated);
