import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

export default function DeleteCompany(props) {
  const { company } = props;
  console.log("P", props);

  function deleteListing() {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      return;
    }

    axios
      .post(
        `${CONSTS.SERVER_URL}${PATHS.COMPANYROUTE}/${company._id}${PATHS.DELETE}`,
        { company },
        {
          headers: { authorization: accessToken },
        }
      )
      .then((response) => {})
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <button onClick={deleteListing} className="btn-gray delete">
        {" "}
        Delete
      </button>
    </div>
  );
}
