# The One API SDK Design

## Overview
The One API SDK is a Node.js library that provides a simple interface for accessing The One API. The library provides three methods to retrieve data from The One API: `lorMoviesGet`, `lorMovieByIdGet`, and `lorMovieQuotesByIdGet`. To use the SDK in your Node.js project, you can create a new instance of the `TheOneApi` class and call its methods.

## Implementation Details
### Class Definition
The SDK is implemented as a single class named `TheOneApi`. The class constructor accepts an API key as a parameter, which is used to authenticate requests to The One API. If an API key is not provided, an error will be thrown.

```javascript
class TheOneApi {
  constructor(apiKey) {
    if (apiKey === undefined || apiKey === null)
      throw new Error("TheOneApi: apiKey is undefined")

    this.apiKey = apiKey;
    this.apiUrl = ONE_API_BASE_URL;
  }

  // methods...
}
```

### Method Definitions
The SDK provides the following three methods to retrieve data from The One API:

The following method retrieves all movies from The One API.
```javascript
async lorMoviesGet()
```

This method retrieves a movie with the specified ID from The One API.
```javascript
async lorMovieByIdGet(id)
```

This method retrieves all quotes for a movie with the specified ID from The One API.
```javascript
async lorMovieQuotesByIdGet(id)
```