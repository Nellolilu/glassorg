import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

export default function BgImageUpload(props) {
  const { company, setCompany } = props;

  // SETUP FOR LOGOUPLOAD
  const [imageUpload, setImageUpload] = React.useState(null);

  function handleChange(event) {
    console.log("handle change", event.target.files[0]);
    const image = event.target.files[0];
    setImageUpload(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    // HANDELING FORM DATA = PICTURES
    if (!imageUpload) {
      console.log("no image has been uploaded");
      return;
    }

    const formBody = new window.FormData();
    formBody.append("bgImage", imageUpload);
    // append need to be named as in parser backend

    // AXIOS POST
    axios
      .post(
        `${CONSTS.SERVER_URL}${PATHS.COMPANYROUTE}/${company._id}${PATHS.BG_IMAGEUPLOAD}`,
        formBody,
        {
          headers: { authorization: accessToken },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("resp.data", response.data);
        // "image" is coming from naming in parser (and? model)
        setCompany({ ...company, bgImage: response.data.newImage });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="image-changer">
      <p>upload background</p>
      <form onSubmit={handleSubmit} className="proof-upload">
        <input type="file" onChange={handleChange} />
        <button type="submit" className="small-submit">
          send
        </button>
      </form>
    </div>
  );
}
