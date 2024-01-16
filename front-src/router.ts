import { Router } from "@vaadin/router";
const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/login", component: "login-page" },
  { path: "/signup", component: "signup-page" },
  { path: "/instructions", component: "instructions-page" },
  { path: "/lost-pets", component: "lost-pets-page" },
  { path: "/user-data", component: "user-data-page" },
  { path: "(.*)", redirect: "/" },
]);
