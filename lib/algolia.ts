import algoliasearch from "algoliasearch";
const ALGOLIA_TOKEN = process.env.ALGOLIA_TOKEN;
// Connect and authenticate with your Algolia app
const client = algoliasearch("LODOCO1MRH", ALGOLIA_TOKEN);

// Create a new index and add a record
const index = client.initIndex("reports");

export { index };
