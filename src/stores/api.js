import axios from "axios";

export const host = "https://admin.upup-radio.site";
// export const host = "http://localhost:8090";

const send = async ({
  method = "",
  path = "",
  data = {},
  access_token = "",
} = {}) => {
  console.log('zz', host)
  const url =  host + path;

  const headers = {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    // Authorization: access_token ? `Bearer ${access_token}` : "",
  };

  const options = {
    method,
    url,
    headers,
    data,
    withCredentials: true,
  };

  try {
    const response = await axios(options);
    // console.log("res", response);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    if (error.status === 401) {
      console.log("401 error");
      router.goto("/login");
    } else if (error.status === 404) {
      console.log("404 error");
      router.goto("/notFound");
    } else if (error.status === 302) {
      console.log("302 error");
      router.goto("/login");
    } else {
      console.log(`${error.status} error`);
    }
  }
};

const getApi = ({ path = "", access_token = "" } = {}) => {
  return send({ method: "GET", path: path });
};

const putApi = ({ path = "", data = {}, access_token = "" } = {}) => {
  return send({
    method: "PUT",
    path: path,
    data: data,
    // access_token: access_token,
  });
};

const patchApi = ({ path = "", data = {}, access_token = "" } = {}) => {
  return send({
    method: "PATCH",
    path: path,
    data: data,
    // access_token: access_token,
  });
};

const postApi = ({ path = "", data = {}, headers = {}, access_token = "" } = {}) => {
  return send({
    method: "POST",
    path: path,
    data: data,
    headers: headers,
    // access_token: access_token,
  });
};

const delApi = ({ path = "", data = {}, access_token = "" } = {}) => {
  return send({
    method: "DELETE",
    path: path,
    data: data,
    // access_token: access_token,
  });
};

export { getApi, putApi, patchApi, postApi, delApi };
