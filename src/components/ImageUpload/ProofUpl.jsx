import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

export default function ProofUpl(props) {
  const { company, oneQAId } = props;

  console.log("oneQuestionId", oneQAId);

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
    formBody.append("proof", imageUpload);
    formBody.append("oneQAId", oneQAId);
    // append need to be named as in parser backend

    axios
      .post(
        `${CONSTS.SERVER_URL}${PATHS.COMPANYROUTE}/${company._id}${PATHS.PROOFUPLOAD}`,
        formBody,
        {
          headers: { authorization: accessToken },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("resp.data", response.data);

        // NEED TO SET INDE THE ONE Q&A
        // THIS IS BREAKING!!
        // setListOfAnswers(response.data.newImage);
      })
      .then((res) => {
        console.log("response on handlesubmit", res);
        props.history.push(
          `${CONSTS.SERVER_URL}${PATHS.COMPANYROUTE}/${company._id}`
        );
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  }

  return (
    <div>
      <p>upload new pic</p>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit">send changes</button>
      </form>
    </div>
  );
}
