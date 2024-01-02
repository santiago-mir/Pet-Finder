class CustomButton extends HTMLElement {
  shadow: ShadowRoot;
  color: string = "white";
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.color = this.getAttribute("color") || this.color;
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const buttonEl = document.createElement("button");
    const style = document.createElement("style");

    style.innerHTML = `
       .button{
          height: 60px;
          max-width: 500px;
          min-width: 300px;
          border: none;
          border-radius: 10px;
          font-family: 'POPPINS';
          font-weight: 700;  
       }
      `;
    buttonEl.textContent = this.textContent;
    buttonEl.style.backgroundColor = this.color;
    this.shadow.appendChild(style);
    buttonEl.classList.add("button");
    this.shadow.appendChild(buttonEl);
  }
}
customElements.define("custom-button", CustomButton);
