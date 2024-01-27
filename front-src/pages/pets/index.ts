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
    console.log("antes del for");
    for (const pet of lostPets) {
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
      newCard.classList.add("card-container");
      lostPetsContainerEl?.appendChild(newCard);
    }
  }
  render() {
    this.innerHTML = `
    <custom-header></custom-header>
    <h1>Mascotas perdidas cerca</h1>
    <div class="pets-container"></div>
    `;
    this.addListeners();
  }
}
customElements.define("lost-pets-page", LostPets);
