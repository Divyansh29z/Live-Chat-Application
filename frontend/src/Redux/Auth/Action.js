import { BASE_API_URL } from "../../config/api";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  REQ_USER,
  SEARCH_USER,
  UPDATE_USER,
} from "./ActionType";

// Action creator for user registration
export const register = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Registration failed with status: ${res.status}`);
    }
    const resData = await res.json();

    // Store the JWT token in local storage if available
    if (resData.jwt) {
      localStorage.setItem("token", resData.jwt);
    }

    console.log("register success", resData);
    dispatch({ type: REGISTER, payload: resData });
  } catch (error) {
    console.error("register error", error.message);
    // You may dispatch an error action here if needed
  }
};

// Action creator for user login
export const login = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Login failed with status: ${res.status}`);
    }
    const resData = await res.json();

    // Store the JWT token in local storage if available
    if (resData.jwt) {
      localStorage.setItem("token", resData.jwt);
    }

    console.log("login success", resData);
    dispatch({ type: LOGIN, payload: resData });
  } catch (error) {
    console.error("login error", error.message);
    // You may dispatch an error action here if needed
  }
};

// Action creator for fetching the current user's data
export const currentUser = (token) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch user data with status: ${res.status}`);
    }
    const resData = await res.json();

    console.log("current user success", resData);
    dispatch({ type: REQ_USER, payload: resData });
  } catch (error) {
    console.error("current user error", error.message);
    // You may dispatch an error action here if needed
  }
};

// Action creator for searching for users
export const searchUser = (data) => async (dispatch) => {
  try {
    console.log(data);
    const res = await fetch(`${BASE_API_URL}/api/users/${data.keyword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to search user with status: ${res.status}`);
    }
    const resData = await res.json();

    console.log("search success", resData);
    dispatch({ type: SEARCH_USER, payload: resData });
  } catch (error) {
    console.error("search error", error.message);
    // You may dispatch an error action here if needed
  }
};

// Action creator for updating user data
export const updateUser = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/users/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(data.data),
    });
    if (!res.ok) {
      throw new Error(`Failed to update user with status: ${res.status}`);
    }
    const resData = await res.json();

    console.log("update user success", resData);
    dispatch({ type: UPDATE_USER, payload: resData });
  } catch (error) {
    console.error("update user error", error.message);
    // You may dispatch an error action here if needed
  }
};

// Action creator for user logout
export const logoutAction = () => async (dispatch) => {
  try {
    // Remove the JWT token from local storage
    localStorage.removeItem("token");

    // Dispatch actions to indicate logout
    dispatch({ type: LOGOUT, payload: null });
    dispatch({ type: REQ_USER, payload: null });
  } catch (error) {
    console.error("logout error", error.message);
    // You may dispatch an error action here if needed
  }
};
