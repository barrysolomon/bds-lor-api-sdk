/***
 * 
 * One SDK wrapper for "The One API" at https://the-one-api.dev/v2
 * 
 * The class includes three methods:
 *    lorMoviesGet:          Retrieves all movies from The One API.
 *    lorMovieByIdGet:       Retrieves a movie with the specified ID from The One API.
 *    lorMovieQuotesByIdGet: Retrieves all quotes for a movie with the specified ID from The One API.
 * 
 *  Notes
 * 
 *    You can use this SDK in your Node.js project by creating a new instance of this TheOneApi class and calling its methods. 
 *
 *  Version   Author          Date        Details
 *    0.1     Barry Solomon   3/10/2023   Initial Version
 *
 */

const axios = require('axios');
const ONE_API_BASE_URL = 'https://the-one-api.dev/v2';

class TheOneApi {

  constructor(apiKey) {

    if (apiKey === undefined || apiKey === null)
      throw new Error("TheOneApi: apiKey is undefined")

    this.apiKey = apiKey;
    this.apiUrl = ONE_API_BASE_URL;
  }

  async makeRequest(path) {

    if (path === undefined || path === null)
      throw new Error("makeRequest: path is required")

    let url = `${this.apiUrl}${path}`;
    let headers = {
      Authorization: `Bearer ${this.apiKey}`,
    };
    let response = await axios.get(url, { headers });
    return response.data;

  }

  /* Retrieve all movies from The One API. 
  */
  async lorMoviesGet() {
    const movies = await this.makeRequest('/movie');
    return movies;
  }

  /* Retrieve a movie with the specified ID from The One API. 
  */
  async lorMovieByIdGet(id) {
    if (id === undefined || id === null)
      throw new Error("lorMovieByIdGet: id is undefined")

    let movie = await this.makeRequest(`/movie/${id}`);
    return movie;
  }

  /* Retrieve all quotes for a movie with the specified ID from The One API. 
  */
  async lorMovieQuotesByIdGet(id) {

    if (id === undefined || id === null)
      throw new Error("lorMovieQuotesByIdGet: id is undefined")

    const quotes = await this.makeRequest(`/movie/${id}/quote`);
    return quotes.docs;

  }

}

module.exports = TheOneApi;
