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
    reportCreated: false,
    lostPets: [],
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
  setUserLocation(lat: number, lng: number) {
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
        state.setUserData(
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
        state.signInUser(email, password);
      });
  },
  updateUserData(name: string, city: string) {
    fetch(API_BASE_URL + "/menu/update-data", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + state.getToken(),
      },
      body: JSON.stringify({
        name,
        city,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        state.setUserData(res.firstName, res.email, res.city);
      });
  },
  createReport(petName: string, imgURL: string, lat: number, lng: number) {
    // obtengo el nombre de la ciudad/localidad llamando a la api de mapbox
    let cityName = "algo";
    fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        lng +
        "," +
        lat +
        ".json?access_token=" +
        process.env.MAPBOX_TOKEN,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        let cityName = res.features[2].text; // nombre de ciudad/localidad
        // llamado a mi api para hacer el report
        fetch(API_BASE_URL + "/report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "bearer " + state.getToken(),
          },
          body: JSON.stringify({ petName, imgURL, lat, lng, cityName }),
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res.error) {
              console.log("token invalido, inicia sesion");
            } else {
              state.setReportStatus();
            }
          });
      });
  },
  getLostPetsAroundLatLng() {
    fetch(
      API_BASE_URL +
        "/lost-pets/" +
        "?lat=" +
        state.getUserLatLng().lat +
        "&lng=" +
        state.getUserLatLng().lng,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        state.setLostPets(res);
      });
  },
  setUserData(name: string, email: string, city?: string, token?: string) {
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
  setReportStatus() {
    const currentState = this.getState();
    currentState.reportCreated = true;
    this.setState(currentState);
  },
  setLostPets(petsFound: Array<Object>) {
    const currentState = this.getState();
    currentState.lostPets = petsFound;
    this.setState(currentState);
  },
  resetReportFlag() {
    const currentState = this.getState();
    currentState.reportCreated = false;
    this.setState(currentState);
  },
  getToken() {
    const currentToken = this.getState().userData.token;
    return currentToken;
  },
  getUserName() {
    const currentName = this.getState().userData.name;
    return currentName;
  },
  getUserLatLng() {
    const currentLocation = this.getState().userData._geoloc;
    return currentLocation;
  },
  getLostPets() {
    const currentPets = this.getState().lostPets;
    return currentPets;
  },
};

export { state };
