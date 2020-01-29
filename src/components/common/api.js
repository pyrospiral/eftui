import { ENV } from "../appEnv";
import Cookies from "js-cookie";
import axios from "axios";

const getToken = async () => {
  const response = await axios.post(
    "https://ifs1-ifc1.insieme.local/api/aaaLogin.xml",
    { name: "admin", pwd: "ins3965!" }
  );
  return response;
};

const getBaseHeaders = () => {
  // Get ACI tokens from cookies
  const tokenKeyPrefix = "app_Cisco_" + ENV.appConfig.APP_ID;
  const token = Cookies.get(tokenKeyPrefix + "_token");
  const urlToken = Cookies.get(tokenKeyPrefix + "_urlToken");

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  // These cookies are not needed when App is not running directly on APIC
  if (ENV.production) {
    headers = Object.assign({}, headers, {
      DevCookie: token,
      "APIC-challenge": urlToken
    });
  }

  let baseHeaders = {
    headers: headers
  };

  return baseHeaders;
};

const api = {
  async get(url, apic) {
    let devToken = "";
    let tokenPromise = getToken();
    tokenPromise.then(res => {
      console.log(res.data);
      devToken = res.data;
    });

    let headers = getBaseHeaders();
    if (apic) {
      headers.devcookie = devToken;
    }
    const response = await axios.get(url, headers);
    return response;
  },
  async post(url, data) {
    let headers = getBaseHeaders();
    const response = await axios.post(url, data, headers);
    return response;
  }
};

export default api;
