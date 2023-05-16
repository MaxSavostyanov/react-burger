import {
  setNewUser,
} from '../../untils/api/api';
import {
  setCookie,
  getCookie,
  deleteCookie,
} from '../../untils/cookie/cookie';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

export function registerNewUser(user, navigate) {
  return function (dispatch) {
    dispatch({ type: REGISTRATION_REQUEST });
    setNewUser(user)
      .then((res) => {
        if (res.success) {
          console.log(res);
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