import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class LostPets extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  async addListeners() {
    state.getLostPetsAroundLatLng();
    state.suscribe(() => {
      this.displayPets();
    });
  }
  displayPets() {
    const lostPetsContainerEl = this.querySelector(".pets-container");
    const lostPets = state.getLostPets();
    // create all lost pets cards
    this.createCards(lostPetsContainerEl, lostPets);

    // go back home bubbont
    this.addButton(lostPetsContainerEl!);
  }
  createCards(container, petArray) {
    for (const pet of petArray) {
      const newCard = document.createElement("div");
      newCard.innerHTML = `
      <img class="card-image" src="${pet.imgURL}">
      <div class="card-info-container">
        <div class="text-container">
          <h3 class="text">${pet.name}</h3>
          <h5 class="text">${pet.city}</h5>
        </div>
        <button class="report-button">Reportar</button>
      </div>
      `;
      // boton para reportar que el usuario vio a una mascota perdida
      const reportPetButtonEl = newCard.querySelector(".report-button");
      reportPetButtonEl?.addEventListener("click", (ev) => {
        // aux container para blurear el background
        const auxContainerEl = this.querySelector(".aux-container");
        auxContainerEl?.classList.add("blur");
        // mostrar form
        const formElContainer = this.querySelector(".form-container");
        this.displayForm(formElContainer!, pet.name, auxContainerEl!);
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
  displayForm(
    formContainer: Element,
    petName: string,
    blurredContainer: Element
  ) {
    formContainer?.classList.remove("form-container");
    formContainer?.classList.add("report-seen-pet");
    const petTitleEl = formContainer?.querySelector(".pet-name");
    petTitleEl!.textContent = `Reportar informacion de ${petName}`;
    const formEl = formContainer.querySelector(".form");
    formEl?.addEventListener("submit", (ev) => {
      ev.preventDefault();
      // restaruar background
      blurredContainer.classList.remove("blur");
      blurredContainer.classList.add("aux-container");
      // esconder form
      formContainer.classList.remove("report-seen-pet");
      formContainer.classList.add("form-container");
    });
  }
  render() {
    const imgURL = require("url:../../assets/icon.png");
    this.innerHTML = `
    <div class="aux-container">
    <custom-header></custom-header>
    <h1>Mascotas perdidas cerca de ${state.getUserCity()}</h1>
    <div class="pets-container"></div>
    </div>
    <div class="form-container">
    <img class="close" src="${imgURL}">
    <form class="form">
    <h2 class="pet-name"></h2>
    <label class="label">
    Nombre
    <input class="input" type="text" name="name">
    </label>
    <label class="label">
    Telefono
    <input class="input" type="tel" name="phone">
    </label>
    <label class="label">
    ¿Donde lo viste?
    <textarea class="textarea" name="information"></textarea>
    </label>
    <button class="button">Enviar Informacion</button
    </form>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("lost-pets-page", LostPets);
