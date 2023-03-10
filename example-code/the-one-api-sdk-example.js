
require('dotenv').config();
const TheOneAPI = require('bds-lor-api-sdk');
//const TheOneAPI = require('../sdk/the-one-api-sdk.js');

const TheOneApiKey = process.env.ONE_API_KEY;
if (process.env.ONE_API_KEY === undefined)
  throw new Error("process.env.ONE_API_KEY is undefined")

const TheOneApi = require('../sdk/the-one-api-sdk.js');
const api = new TheOneApi(TheOneApiKey);

async function main() {
  
  const movies = await api.lorMoviesGet();
  console.log('lorMoviesGet(): ', movies);

  const movieId = '5cd95395de30eff6ebccde5c';
  const movie = await api.lorMovieByIdGet(movieId);
  console.log(`lorMoviesGet(${movieId}): `, movie);

  const movieQuotes = await api.lorMovieQuotesByIdGet(movieId);
  console.log(`lorMovieQuotesByIdGet(${movieId}):`, movieQuotes);

}

main();
