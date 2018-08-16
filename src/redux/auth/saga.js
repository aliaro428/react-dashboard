import { all, takeEvery, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { getToken, clearToken } from '../../helpers/utility';
import actions from './actions';

async function loginApiRequest(payload){
  try {
    let { username, password } = payload.payload;
    let response = await fetch(
      'http://localhost:4000/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admin:true,
          username,
          password
        })
      }
    );
    let responseJson = await response.json();
    console.log(responseJson)
    return responseJson;
  } catch (error) {

    console.error('loginError',error);
  }
}

async function signUpApiRequest(payload) {
  try {
    let { first_name, email, password } = payload.payload;
    let response = await fetch(
      'http://localhost:4000/register',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name,
          last_name: first_name,
          email,
          password
        })
      }
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*(payload) {
    let apiResponse = yield loginApiRequest(payload);
    if (apiResponse.meta.code===200) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: apiResponse.data.token,
      });
    } else {
      yield put({ type: actions.LOGIN_ERROR, message: apiResponse.message });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    yield localStorage.setItem('id_token', payload.token);
    yield put(push('/dashboard'))
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    clearToken();
    yield put(push('/'));
  });
}

export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const token = getToken().get('idToken');
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
      });
    }
  });
}

export function* signUpRequest() {
  yield takeEvery('SIGNUP_REQUEST', function*(payload) {
    let apiResponse = yield signUpApiRequest(payload);
    if (apiResponse.meta.code===200) {
      yield put({
        type: actions.SIGNUP_SUCCESS,
      });
    } else {
      yield put({ type: actions.SIGNUP_ERROR });
    }
  });
}

export function* signUpSuccess() {
  yield takeEvery(actions.SIGNUP_SUCCESS, function*() {
    yield put(push('/signin'));
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
    fork(signUpRequest),
    fork(signUpSuccess)
  ]);
}
