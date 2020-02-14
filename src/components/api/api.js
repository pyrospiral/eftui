/*
Taken from Elam Assitant by Takuya
*/

import { ENV } from "../appEnv";
import Cookies from "js-cookie";
import { ERR_MSGS } from "../../constants";

const GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete";

function checkStatus(response) {
  const status = response.status;
  return response.json().then(
    json => {
      if (response.ok) {
        return json;
      }
      return Promise.reject(json);
    },
    reason => {
      if (status === 204) {
        return {};
      } else if (status === 500) {
        return Promise.reject(new Error(ERR_MSGS.htmlServerError));
      } else if (status === 504) {
        return Promise.reject(new Error(ERR_MSGS.htmlTimeout));
      } else if (status === 400) {
        return response;
      }
      return Promise.reject(reason);
    }
  );
}

const getBaseOptions = url => {
  // Get ACI tokens from cookies
  const tokenKeyPrefix = "app_Cisco_" + ENV.appConfig.APP_ID;
  const token = Cookies.get(tokenKeyPrefix + "_token");
  const urlToken = Cookies.get(tokenKeyPrefix + "_urlToken");
  const APIC_COOKIE_NAME = "APIC-Cookie";
  const apicCookie = Cookies.get(APIC_COOKIE_NAME);

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  if (ENV.production) {
    headers = Object.assign({}, headers, {
      DevCookie: token,
      "APIC-challenge": urlToken
    });
  } else {
    headers = Object.assign({}, headers, {
      DevCookie: apicCookie
    });
  }

  let baseOptions = {
    headers: headers
  };

  if (
    ENV.development &&
    url.indexOf(ENV.endpointConfig.BASE_NATIVE_URI) !== -1
  ) {
    baseOptions.credentials = "include"; // include web cookies in the request
  }

  return baseOptions;
};

const api = {
  async get(url) {
    const options = Object.assign({}, getBaseOptions(url), {
      method: GET
    });
    try {
      const response = await fetch(url, options);
      return checkStatus(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  },
  async post(url, payload) {
    const options = Object.assign({}, getBaseOptions(url), {
      method: POST,
      body: JSON.stringify(payload)
    });
    try {
      const response = await fetch(url, options);
      return checkStatus(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  },
  async put(url, payload, messageOptions = {}) {
    const options = Object.assign({}, getBaseOptions(url), {
      method: PUT,
      body: JSON.stringify(payload)
    });
    try {
      const response = await fetch(url, options);
      return checkStatus(response);
    } catch (error) {
      return await Promise.reject({ error, messageOptions });
    }
  },
  async remove(url) {
    const options = Object.assign({}, getBaseOptions(url), {
      method: DELETE
    });
    try {
      const response = await fetch(url, options);
      return checkStatus(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  }
};

export default api;
export { GET, POST, PUT, DELETE };
