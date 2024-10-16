import { derived, writable } from "svelte/store";
import { getApi, postApi } from "./api.js";

function setAuth() {

  const initValues = {
    isLoggedIn: false
  };

  const { subscribe, set, update } = writable({ ...initValues });

  // 공통 로직을 처리하는 함수
  const handleAuthResponse = (authResponse) => {
      const token = authResponse.accessToken;
      const base64Payload = token.split('.')[1];
      const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(
          decodeURIComponent(
              window.atob(base64).split('')
                  .map(function (c) {
                      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                  })
                  .join('')
          )
      );
      update(data => ({
          ...data,
          username: payload.sub,
          accessToken: authResponse.accessToken
      }));
      isRefresh.set(true);
  };

  // 로그인 함수
  const login = async (data) => {
    const headers = {
      "content-type": "application/x-www-form-urlencoded",
      accept: "*/*"
    }
    const options = {
        path: '/login',
        data: {
            username: data.username,
            password: data.password,
        },
        headers: headers
    };

    const authResponse = await postApi(options);
    console.log('login res: ', authResponse);
    // handleAuthResponse(authResponse);
    router.goto('/');
  };

  const checkLoginStatus = async () => {
    try {
      const options = {
        path: '/api/v1/admin/health',
      };

      const response = await getApi(options)
      if (typeof response === 'undefined') {
        console.log('uuuuu')
        return false
      }
      const check = response.data
      if (check.startsWith('health')) {
        update(data => {
          data.isLoggedIn = true
          return data
        })
        return true
      }
      console.log('noo')
      return false
    }
    catch(error) {
      update(data => {
        data.isLoggedIn = false
        return data
      })
      console.log('errrrr', error)
      return false
    }
  }

  return {
    subscribe,
    login,
    checkLoginStatus,
  };
}

export const auth = setAuth();
