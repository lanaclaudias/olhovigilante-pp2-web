import axios from "axios";
import { notifyError } from "./Util";

export const TOKEN_SESSION_ATTRIBUTE_NAME = "token";
export const EXPIRATION_SESSION_ATTRIBUTE_NAME = "expiration";
export const USERNAME_SESSION_ATTRIBUTE_NAME = "username";

export const registerSuccessfulLoginForJwt = (username, token, expiration) => {
  localStorage.setItem(USERNAME_SESSION_ATTRIBUTE_NAME, username);
  localStorage.setItem(TOKEN_SESSION_ATTRIBUTE_NAME, token);
  localStorage.setItem(EXPIRATION_SESSION_ATTRIBUTE_NAME, expiration);

  setupAxiosInterceptors();
};

export const setupAxiosInterceptors = () => {
  let token = createJWTToken(
    localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME)
  );

  if (isUserLoggedIn()) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const createJWTToken = (token) => {
  return "Bearer " + token;
};

export const logout = () => {
  localStorage.clear();
  delete axios.defaults.headers.common["Authorization"];
};

export const isTokenExpired = () => {
  let expiration = localStorage.getItem(EXPIRATION_SESSION_ATTRIBUTE_NAME);
  return expiration === null || expiration < new Date().getTime();
};

export const isUserLoggedIn = () => {
  let user = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);

  if (user === null) {
    return false;
  } else {
    return true;
  }
};

export const getToken = () => {
  let token = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);
  if (token === null) return "";
  return token;
};

export const getUserId = /*  async */ () => {
  let token = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);
  let username = localStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME);
  //console.log(username)
  let id = 0;
  if (token === null) return "";
  axios
    .get(`http://localhost:8082/api/usuario/u/${username}`)
    .then((res) => {
      id = res.data;
    })
    .catch((error) => {
      notifyError("Usuário inválido. Logue-se novamente.");
    });

  return id;
  /* try {
        id = await axios.get(`http://localhost:8082/api/usuario/u/${username}`);
    } catch (error) {
        notifyError("Usuário inválido. Logue-se novamente.")
        return '';
    } */

  /* return id.data; */
};
