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
      token: "",
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
  updateUserData(name: string, email: string, city?: string, token?: string) {
    const currentState = this.getState();
    currentState.userData.name = name;
    currentState.userData.email = email;
    if (city) {
      currentState.userData.city = city;
    }
    if (token) {
      currentState.userData.token = token;
    }
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
        state.updateUserData(
          res.user.firstName,
          res.user.email,
          res.user.city,
          res.token
        );
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
  getToken() {
    const currentToken = this.getState().userData.token;
    return currentToken;
  },
  getUserName() {
    const currentName = this.getState().userData.name;
    return currentName;
  },
};

export { state };
