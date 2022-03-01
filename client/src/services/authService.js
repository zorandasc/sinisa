import jwtDecode from "jwt-decode";
import http from "./httpService";

//SVAKI PUT KAD SE MODUL LOADUJE
//SET HEADER IZ TOKENA BILO DA GA IMA ILI NEMA
http.setJwt(getJwt());

async function login(user) {
  const { headers } = await http.post("/api/users/login", user);
  const token = headers["authorization"]?.replace("Bearer ", "");
  localStorage.setItem("token", token);
}

function logout() {
  localStorage.clear();
}

function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem("token");
}

const auth = {
  login,
  logout,
  getCurrentUser,
  getJwt,
};

export default auth;
