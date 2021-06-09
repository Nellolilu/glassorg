import axios from "axios";
import * as CONSTS from "../utils/consts";

const profileService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/profile`,
});

export function PROFILE(token) {
  return profileService.get("/", {
    headers: {
      authorization: token,
    },
  });
}
