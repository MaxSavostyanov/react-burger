import {
  setNewUser,
  loginRequest,
  logoutRequest,
} from '../../untils/api/api';
import {
  setCookie,
  getCookie,
  deleteCookie,
} from '../../untils/cookie/cookie';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export function registerNewUser(user, navigate) {
  return function (dispatch) {
    dispatch({ type: REGISTRATION_REQUEST });
    setNewUser(user)
      .then((res) => {
        if (res.success) {
          dispatch({ type: REGISTRATION_SUCCESS, user: res });
          navigate('/login');
        }
        localStorage.setItem('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
      })
      .catch((e) => {
        console.log(`Упс, ошибка! ${e}`);
        dispatch({
          type: REGISTRATION_FAILED,
        });
      });
  };
}

export function logIn (user, navigate, previousRoute) {
  return function (dispatch) {
    dispatch({ type: LOGIN_REQUEST });
    loginRequest(user)
      .then((res) => {
        if (res.success) {
          dispatch({ type: LOGIN_SUCCESS, user: res });
          localStorage.setItem('refreshToken', res.refreshToken);
          setCookie('accessToken', res.accessToken);
          navigate('/');
        }
      })
      .catch((e) => {
        console.log(`Упс, ошибка! ${e}`);
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

export function logOut() {
  return function (dispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    logoutRequest(localStorage.getItem('refreshToken'))
      .then((res) => {
        if (res.success) {
          dispatch({ type: LOGOUT_SUCCESS });
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
        }
      })
      .catch((e) => {
        console.log(`Упс, ошибка! ${e}`);
        dispatch({
          type: LOGOUT_FAILED,
        });
      });
  };
}