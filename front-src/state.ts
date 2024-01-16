const API_BASE_URL = process.env.API_BASE_URL;

const state = {
  data: {
    userData: {
      name: "",
      _geoloc: {
        lat: "",
        lng: "",
      },
      email: "",
    },
  },
  listeners: [],
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log(this.data);
  },
  suscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
  updateUserLocation(lat: number, lng: number) {
    const currentState = this.getState();
    currentState.userData._geoloc.lat = lat;
    currentState.userData._geoloc.lng = lng;
    this.setState(currentState);
  },
  signInUser(email: string, password: string) {
    fetch(API_BASE_URL + "/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  },
  signUpUser(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    fetch(API_BASE_URL + "/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  },
};

export { state };
