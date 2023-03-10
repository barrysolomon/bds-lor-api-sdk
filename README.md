# The One API SDK Wrapper

This SDK wrapper provides access to "The One API" at https://the-one-api.dev/v2. 

The class includes three methods:
- `getMovies`:          Retrieve all movies from The One API.
- `getMovieById`:       Retrieve a movie with the specified ID from The One API.
- `getMovieQuotesById`: Retrieve all quotes for a movie with the specified ID from The One API.

You can easily use this SDK in your Node.js project by creating a new instance of the `TheOneApi` class and calling its methods.

## Getting Started

### Prerequisites

To use this SDK, you will need:

- An API key from The One API. You can sign up for an API key at https://the-one-api.dev/sign-up.
- Node.js installed on your machine.

### Installation

1. Clone this repository: `git clone https://github.com/your-username/the-one-api-sdk.git`
2. Install the dependencies: `npm install`

To install dotenv, axios and jest separately, you can run the following commands:

- npm install axios
- npm install jest --save-dev
- npm install dotenv

## Usage

Replace 'YOUR_API_KEY' with your actual API key. This example code creates a new instance of the `TheOneApi` class, calls its methods to retrieve information from The One API, and logs the results to the console.

```javascript
const TheOneApi = require('./sdk/the-one-api-sdk.js');

const apiKey = 'YOUR_API_KEY';
const api = new TheOneApi(apiKey);

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
```

## Testing

Test cases for the SDK functions are written in Jest and can be found in the `/tests` directory. Currently, only positive tests are included.

To run the tests, use the command `npm test`.

## Version History

| Version | Author         | Date       | Details         |
| ------- | --------------| ---------- | --------------- |
| 0.1     | Barry Solomon | 3/10/2023  | Initial Version |

