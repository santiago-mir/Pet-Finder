import algoliasearch from "algoliasearch";
const ALGOLIA_TOKEN = process.env.ALGOLIA_TOKEN;
// Connect and authenticate with your Algolia app
const client = algoliasearch("LODOCO1MRH", ALGOLIA_TOKEN);

// Create a new index and add a record
const index = client.initIndex("reports");

const record = index
  .saveObject({
    objectID: 3,
    name: "testong",
    imgData: "url test",
    _geoloc: {
      lat: 1,
      lng: 2,
    },
    userId: 2,
  })
  .wait();
export { index };
