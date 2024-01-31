import { Router } from "@vaadin/router";
import { state } from "../../state";

class UserReports extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {
    this.displayReports();
  }
  displayReports() {
    const reportsContainerEl = this.querySelector(".pets-container");
    const userReports = state.getUserReports();
    // create all lost pets cards
    this.createCards(reportsContainerEl, userReports);
    // go back home bubbont
    this.addButton(reportsContainerEl!);
  }
  createCards(container, reportsArr) {
    for (const report of reportsArr) {
      const newCard = document.createElement("div");
      newCard.innerHTML = `
      <img class="card-image" src="${report.img_URL}">
      <div class="card-info-container">
        <div class="text-container">
          <h3 class="text">${report.name}</h3>
          <h5 class="text">${report.city}</h5>
        </div>
        <button class="edit-button">Editar Reporte</button>
      </div>
      `;
      const editReportButtonEl = newCard.querySelector(".edit-button");
      editReportButtonEl?.addEventListener("click", (ev) => {});
      newCard.classList.add("card-container");
      container?.appendChild(newCard);
    }
  }
  addButton(container: Element) {
    const backButtonEl = document.createElement("button");
    backButtonEl.textContent = "Volver";
    backButtonEl.classList.add("button");
    backButtonEl.addEventListener("click", (ev) => {
      Router.go("/home");
    });
    container?.appendChild(backButtonEl);
  }
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
