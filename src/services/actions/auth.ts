import { NavigateFunction } from 'react-router-dom';
import { AppDispatch } from '../types';
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
import { TUpdateUser, TUser, TUserResponce } from '../types/types';
import {
  AUTH_CHECKED,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,

  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  SEND_EMAIL,

  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,

  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  IS_CHANGED,
  STOP_CHANGE,
} from '../constants/auth';

interface IAuthCheked {
  readonly type: typeof AUTH_CHECKED;
}

interface IRegistationRequest {
  readonly type: typeof REGISTRATION_REQUEST;
}

interface IRegistationSuccess {
  readonly type: typeof REGISTRATION_SUCCESS;
  readonly user: TUserResponce;
}

interface IRegistationFailed {
  readonly type: typeof REGISTRATION_FAILED;
}

interface ILogInRequest {
  readonly type: typeof LOGIN_REQUEST;
}

interface ILogInSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: TUserResponce;
}

interface ILogInFailed {
  readonly type: typeof LOGIN_FAILED;
}

interface ILogOutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

interface ILogOutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}

interface ILogOutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

interface ISendEmail {
  readonly type: typeof SEND_EMAIL;
}

interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUserResponce;
}

interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}

interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}

interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUserResponce;
}

interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}

interface IStartChanged {
  readonly type: typeof IS_CHANGED;
}

interface IStopChanged {
  readonly type: typeof STOP_CHANGE;
}

export type TAuthActions = IAuthCheked
  | IRegistationRequest
  | IRegistationSuccess
  | IRegistationFailed
  | ILogInRequest
  | ILogInSuccess
  | ILogInFailed
  | ILogOutRequest
  | ILogOutSuccess
  | ILogOutFailed
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordFailed
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed
  | ISendEmail
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserFailed
  | IStartChanged
  | IStopChanged;


export function setToken(res: TUserResponce) {
  localStorage.setItem('refreshToken', res.refreshToken);
  setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
}

export function clearToken() {
  localStorage.clear();
  deleteCookie('accessToken');
}

export function registerNewUser(user: TUser, navigate: NavigateFunction) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: REGISTRATION_REQUEST });
    setNewUser(user)
      .then((res) => {
        if (res.success) {
          dispatch({ type: REGISTRATION_SUCCESS, user: res });
          navigate('/login');
        }
        setToken(res);
      })
      .catch((e) => {
        console.log(`Упс, ошибка! ${e}`);
        dispatch({
          type: REGISTRATION_FAILED,
        });
      });
  };
}

export function logIn(user: { email: string, password: string }) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: LOGIN_REQUEST });
    loginRequest(user)
      .then((res) => {
        if (res.success) {
          dispatch({ type: LOGIN_SUCCESS, user: res });
          setToken(res);
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

export function logOut(navigate: NavigateFunction) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    logoutRequest(localStorage.getItem('refreshToken'))
      .then((res) => {
        if (res.success) {
          dispatch({ type: LOGOUT_SUCCESS });
          clearToken();
          navigate('/login');
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

export function forgotPassword(email: { email: string }, navigate: NavigateFunction) {
  return function (dispatch: AppDispatch) {
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

export function setNewPassword(password: { password: string }, navigate: NavigateFunction) {
  return function (dispatch: AppDispatch) {
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

export function updateToken(type: typeof GET_USER_FAILED | typeof UPDATE_USER_FAILED, dispatch: AppDispatch) {
  console.log('Ошибка токена! \n Обновление токена!')
  return updateTokenRequest()
    .then((res) => {
      setToken(res);
      console.log(`%c Токен обновлён!`, 'color: green');
    })
    .catch((e) => {
      console.log(`Токен не обновлён! \n ${e} \n Пользователь не авторизован!`);
      clearToken();
      dispatch({
        type: type,
      });
    });
}

export function getUserData(dispatch: AppDispatch) {
  dispatch({ type: GET_USER_REQUEST });
  return getUserRequest(getCookie('accessToken'))
    .then((res) => {
      console.log(`%c Данные пользователя получены!`, 'color: green')
      dispatch({ type: GET_USER_SUCCESS, user: res });
    })
    .catch((e) => {
      if (e && localStorage.getItem('refreshToken')) {
        updateToken(UPDATE_USER_FAILED, dispatch)
          .then(() => getUserData(dispatch));
      } else {
        console.log(`Пользователь не авторизован ${e}`);
        dispatch({
          type: GET_USER_FAILED,
        });
      }
    });
};


export function setChangedUser(data: TUpdateUser, dispatch: AppDispatch) {
  dispatch({ type: UPDATE_USER_REQUEST });
  updateUserRequest(data, getCookie('accessToken'))
    .then((res) => {
      dispatch({ type: UPDATE_USER_SUCCESS, user: res });
      console.log(`%c Данные пользоватетеля изменены!`, 'color: green');
    })
    .catch((e) => {
      if (e && localStorage.getItem('refreshToken')) {
        updateToken(UPDATE_USER_FAILED, dispatch)
          .then(() => setChangedUser(data, dispatch));
      } else {
        console.log(`Упс, ошибка! ${e}`);
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      }
    });
};


export const checkAuth = () => (dispatch: AppDispatch) => {
  if (getCookie('accessToken')) {
    getUserData(dispatch)
      .finally(() => {
        dispatch({ type: AUTH_CHECKED });
      })
  } else {
    dispatch({ type: AUTH_CHECKED });
  }
};