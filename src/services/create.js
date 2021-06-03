import axios from "axios";
import * as CONSTS from "../utils/consts";

const createService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/create-company`,
});

export function CREATE_COMPANY(body, token) {
  return createService.post("/", body, {
    headers: {
      authorization: token,
    },
  });
}
