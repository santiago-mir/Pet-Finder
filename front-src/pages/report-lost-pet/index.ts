import { state } from "../../state.ts";
import { Router } from "@vaadin/router";
import { Dropzone } from "dropzone";
import { initMap } from "../../../lib/mapbox.ts";

class ReportPet extends HTMLElement {
  connectedCallback() {
    if (!state.getToken()) {
      Router.go("/home");
    }
    this.render();
  }
  addListeners() {
    let dataURL;
    let myDropzone = new Dropzone("#dropzone", {
      url: "/",
      clickable: true,
      autoProcessQueue: false,
    });
    myDropzone.on("thumbnail", (file) => {
      const textEl = this.querySelector(".drop-text");
      textEl!.textContent = "";
      dataURL = file.dataURL;
    });
    const locationData = initMap();
    const formEl = this.querySelector(".form");
    formEl?.addEventListener("submit", (event) => {
      event.preventDefault();
      let target = event.target as any;
      state.createLostPetReport(
        target.name.value,
        dataURL,
        locationData.lat,
        locationData.lng
      );
    });
    state.suscribe(() => {
      Router.go("/report-created");
    });
  }
  render() {
    this.innerHTML = `
    <script id="search-js" defer="" src="https://api.mapbox.com/search-js/v1.0.0-beta.18/web.js"></script>
    <custom-header></custom-header>
    <div class="report-container">
    <h1 class="title">Repotar Mascota</h1>
    <p class="text">Ingresá la siguiente información para realizar el reporte de la mascota</p>
    <form class="form">
    <label class="label">
    Nombre
    <input class="input" name="name" type="text" />
    </label>
    <div id="dropzone"><p class="drop-text">Subi una imagen de tu mascota</p></div>
    <h3 class="text" >Donde viste a tu mascota por ultima vez?</h3>
    <div id="map" style="width: 400px; height: 400px"></div>
    <button type="submit" class="button"> Reportar Mascota </button>
    <button class="button"> Cancelar </button>
    </form>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("report-pet-page", ReportPet);
