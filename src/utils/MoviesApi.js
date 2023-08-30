import { FILMS_FETCH_FAILURE_MESSAGE } from "../constants/constants";

const apiOptions = {
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
};

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponseStatus(response, message) {
    return response.ok
      ? response.json()
      : Promise.reject(`${response.status}: ${message}`);
  }

  async _sendRequest({ endpoint = "", method = "GET", message = "" }) {
    const res = await fetch(`${this._baseUrl}${endpoint}`, {
      method,
      headers: this._headers,
    });

    return this._checkResponseStatus(res, message);
  }

  async getAllMovies() {
    return this._sendRequest({
      message: FILMS_FETCH_FAILURE_MESSAGE,
    });
  }
}

export const moviesApi = new MoviesApi(apiOptions);
