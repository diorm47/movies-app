const mainApiOptions = {
  baseUrl: "https://api.akhtool.movies.nomoredomains.xyz",
  headers: {
    "Content-Type": "application/json",
  },
};

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Проверяем статус ответа сервера:
  _checkResponseStatus(response) {
    return response.ok
      ? response.json()
      : response.json().then((err) => Promise.reject(err.message));
  }

  async signup(userData) {
    const res = await fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(userData),
    });
    return this._checkResponseStatus(res);
  }

  async signin(userData) {
    const res = await fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(userData),
    });
    return this._checkResponseStatus(res);
  }

  async reEnter() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: "include",

      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return this._checkResponseStatus(res);
  }

  async editUserData(userData) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userData),
    });
    return this._checkResponseStatus(res);
  }

  async logoutUser() {
    const res = await fetch(`${this._baseUrl}/signout`, {
      method: "GET",
      credentials: "include",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return this._checkResponseStatus(res);
  }

  // Фильмы
  async getSavedMovies() {
    const res = await fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      credentials: "include",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return this._checkResponseStatus(res);
  }

  async saveMovie(movieData) {
    const res = await fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: "include",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(movieData),
    });
    return this._checkResponseStatus(res);
  }

  async deleteMovie(movieId) {
    const res = await fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return this._checkResponseStatus(res);
  }
}

export const mainApi = new MainApi(mainApiOptions);
