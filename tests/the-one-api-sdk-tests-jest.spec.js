/***
 * 
 * Test cases for the SDK functions:
 * 
 * For the /movie function:
 *  Test that the function returns a list of movies when called with valid authentication credentials.
 *  [TODO] Test that the function returns an error message when called without valid authentication credentials.
 *  [TODO] Test that the function returns an error message when called with an invalid API endpoint.
 * 
 * For the /movie/{id} function:
 *  Test that the function returns the correct movie information when called with a valid movie ID.
 *  [TODO] Test that the function returns an error message when called with an invalid movie ID.
 *  [TODO] Test that the function returns an error message when called without valid authentication credentials.
 * 
 * For the /movie/{id}/quote function:
 * 
 *  Test that the function returns a list of quotes for the specified movie when called with a valid movie ID.
 *  [TODO] Test that the function returns an error message when called with an invalid movie ID.
 *  [TODO] Test that the function returns an error message when called without valid authentication credentials.
 * 
 * Additionally, some edge cases to consider:
 * 
 *  What happens when the user provides an empty movie ID?
 *  What happens when the user provides a non-existent movie ID?
 *  What happens when the user provides an ID that is not in the correct format?
 *  What happens when the user provides an invalid API endpoint?
 *  What happens when the user provides invalid authentication credentials?
 *
 */

require('dotenv').config();
const TheOneApiKey = process.env.ONE_API_KEY;
if (process.env.ONE_API_KEY === undefined)
  throw new Error("process.env.ONE_API_KEY is undefined");

const axios = require('axios');
const TheOneAPI = require('../sdk/the-one-api-sdk.js');

jest.mock('axios');

describe('TheOneAPI', () => {

  var api;
  beforeEach(() => {
    api = new TheOneAPI(TheOneApiKey);
  });

  describe('lorMoviesGet', () => {

    it('lorMoviesGet should return a list of movies', async () => {

      axios.get.mockResolvedValueOnce({ data: [{ id: 'Fellowship of The Rings' }, { id: 'The Two Towers' }, { id: 'Return of The King' }] });

      const result = await api.lorMoviesGet();

      expect(result).toEqual([{ id: 'Fellowship of The Rings' }, { id: 'The Two Towers' }, { id: 'Return of The King' }]);

      expect(axios.get).toHaveBeenCalledWith(`${api.apiUrl}/movie`, {
        headers: {
          Authorization: `Bearer ${api.apiKey}`,
        },
      });

    });

  });

  describe('lorMovieByIdGet', () => {

    it('should return the movie with a given ID', async () => {

      axios.get.mockResolvedValueOnce({ data: { id: 'The Fellowship Of The Ring' } });

      const result = await api.lorMovieByIdGet('The Fellowship Of The Ring');

      expect(result).toEqual({ id: 'The Fellowship Of The Ring' });
      expect(axios.get).toHaveBeenCalledWith(`${api.apiUrl}/movie/The Fellowship Of The Ring`, {
        headers: {
          Authorization: `Bearer ${api.apiKey}`,
        },
      });
    });

  });

  describe('getMovieQuotes', () => {

    beforeEach(() => {
      api = new TheOneAPI(TheOneApiKey);
    });

    it('should return an array of quotes', async () => {

      const movieId = '5cd95395de30eff6ebccde5c';
      const expectedQuotes = [
        {
          _id: '5cd953e0de30eff6ebccfb3e',
          dialog: 'All we have to decide is what to do with the time that is given us.',
          movie: '5cd95395de30eff6ebccde5c',
          character: '5cd96e05de30eff6ebd5f5e5',
          __v: 0,
        },
        {
          _id: '5cd953e0de30eff6ebccfb3f',
          dialog: 'A wizard is never late, Frodo Baggins. Nor is he early. He arrives precisely when he means to.',
          movie: '5cd95395de30eff6ebccde5c',
          character: '5cd96e05de30eff6ebd5f62f',
          __v: 0,
        },
      ];

      axios.get.mockResolvedValueOnce({ data: { docs: expectedQuotes } });

      const quotes = await api.lorMovieQuotesByIdGet(movieId);

      expect(axios.get).toHaveBeenCalledWith(
        `https://the-one-api.dev/v2/movie/${movieId}/quote`,
        { headers: { Authorization: `Bearer ${TheOneApiKey}` } }
      );
      expect(quotes).toEqual(expectedQuotes);
    });

  });

});
