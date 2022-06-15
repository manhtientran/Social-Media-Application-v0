import { BACKEND_URL } from "../config/config.js";

const create = async (user) => {
  try {
    let response = await fetch(BACKEND_URL + "/api/users/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const list = async () => {
  try {
    let response = await fetch(BACKEND_URL + "/api/users/", {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const read = async (params, credentials) => {
  try {
    let response = await fetch(BACKEND_URL + "/api/users/" + params.userId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (params, credentials, user) => {
  try {
    let response = await fetch(BACKEND_URL + "/api/users/" + params.userId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(BACKEND_URL + "/api/users/" + params.userId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, list, read, update, remove };
