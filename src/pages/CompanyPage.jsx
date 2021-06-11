import axios from "axios";
import React from "react";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";

export default function CompanyPage(props) {
  const [singleCompany, setSingleCompany] = React.useState({});
  // const {singleCompany, setSingleCompany} = props
  // THIS DOESNT KEEP TRACK OVER APP:JS

  //NO USE
  //   function updateCompany(company) {
  //     setSingleCompany(company);
  //   }

  React.useEffect(() => {
    // LATE FOR FOLLOW & CHAIN?
    // const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    axios
      .get(
        `${CONSTS.SERVER_URL}${PATHS.COMPANYROUTE}/${props.match.params.companyId}`
      )
      .then((response) => {
        console.log("response: ", response);
        setSingleCompany(response.data.oneCompany);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>This is the single Company</h1>
      <p>{singleCompany.name}</p>
      <ImageUpload company={singleCompany} setCompany={setSingleCompany}>
        here is teh imageupload component
      </ImageUpload>

      <img src={singleCompany.image} style={{ width: "300px" }} alt="Dayman" />
    </div>
  );
}
