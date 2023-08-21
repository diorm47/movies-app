import { MESSAGE_MOVIESAPI_GETFILMS_FAIL } from "../constants/constants";

const apiOptions = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
};

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponseStatus(response, message) {
    return response.ok ? response.json() : Promise.reject(`${response.status}: ${message}`)
  }

  async getAllMovies() {
    const res = await fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers,
    });
    return this._checkResponseStatus(res, MESSAGE_MOVIESAPI_GETFILMS_FAIL);
  }
}

export const moviesApi = new MoviesApi(apiOptions);
