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
    if (userReports.length == 0) {
      const emptyPageURL = require("url:../../assets/empty.png");
      this.createImage(reportsContainerEl!, emptyPageURL);
    } else {
      // create all lost pets cards
      this.createCards(reportsContainerEl, userReports);
    }
    // go back home bubbont
    this.addButton(reportsContainerEl!);
  }
  createImage(container: Element, imgURL) {
    const imgEl = document.createElement("img");
    imgEl.src = imgURL;
    container.appendChild(imgEl);
  }
  getText() {
    const userReports = state.getUserReports();
    if (userReports.length == 0) {
      return "No has reportado ninguna mascota aun";
    } else {
      return "Tus mascotas reportadas";
    }
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
        <button class="report-button">Editar Reporte</button>
      </div>
      `;
      const editReportButtonEl = newCard.querySelector(".report-button");
      editReportButtonEl?.addEventListener("click", (ev) => {
        state.setReportId(report.id);
        Router.go("/edit-report");
      });
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
        <div class="user-report-container">
        <h1 class="text">${this.getText()}</h1>
        <div class="pets-container"></div>
        </div>
    `;
    this.addListeners();
  }
}
customElements.define("user-reports-page", UserReports);
