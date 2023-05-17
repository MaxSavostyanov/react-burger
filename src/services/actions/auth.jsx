import {
  setNewUser,
  loginRequest,
  logoutRequest,
  resetPasswordRequest,
  changePasswordRequest,
  updateUserRequest,
  getUserRequest,
  updateTokenRequest,
} from '../../untils/api/api';
import {
  setCookie,
  getCookie,
  deleteCookie,
} from '../../untils/cookie/cookie';

export const AUTH_CHECKED = 'AUTH_CHECKED';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const SEND_EMAIL = 'SEND_EMAIL';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const IS_CHANGED = 'IS_CHANGED';
export const STOP_CHANGE = 'STOP_CHANGE';

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

export function logIn(user, navigate) {
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
          localStorage.clear();
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

export function forgotPassword(email, navigate) {
  return function (dispatch) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    resetPasswordRequest(email)
      .then((res) => {
        if (res.success) {
          dispatch({ type: FORGOT_PASSWORD_SUCCESS });
          navigate('/reset-password');
        }
      })
      .catch((e) => {
        console.log(`Упс, ошибка! ${e}`);
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      });
  };
}

export function setNewPassword(password, navigate) {
  return function (dispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    changePasswordRequest(password)
      .then((res) => {
        if (res.success) {
          dispatch({ type: RESET_PASSWORD_SUCCESS });
          navigate('/login');
        }
      })
      .catch((e) => {
        console.log(`Упс, ошибка! ${e}`);
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
}

export function updateToken() {
  return updateTokenRequest()
    .then((res) => {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
    })
    .catch((e) => {
      console.log(`Упс, ошибка! ${e}`);
    });
}

export function getUserData() {
  return function (dispatch) {
    dispatch({ type: GET_USER_REQUEST });
    return getUserRequest(getCookie('accessToken'))
      .then((res) => {
        dispatch({ type: GET_USER_SUCCESS, user: res.user });
      })
      .catch((e) => {
        console.log(`Пользователь не авторизован ${e}`);
        if (e) {
          updateToken().then(() => dispatch(getUserData()));
        } else {
          dispatch({
            type: GET_USER_FAILED,
          });
        }
      });
  };
}

export function setChangedUser(data) {
  return function (dispatch) {
    dispatch({ type: UPDATE_USER_REQUEST });
    updateUserRequest(data, getCookie('accessToken'))
      .then((res) => {
        dispatch({ type: UPDATE_USER_SUCCESS, user: res.user });
        console.log(`%c Данные пользоватетеля изменены!`, 'color: green');
      })
      .catch((e) => {
        console.log(`Упс, ошибка! ${e}`);
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      });
  };
}

export const checkAuth = () => (dispatch) => {
  if (getCookie('accessToken')) {
    dispatch(getUserData())
      .finally(() => {
        dispatch({ type: AUTH_CHECKED });
      })
  } else {
    dispatch({ type: AUTH_CHECKED });
  }
};