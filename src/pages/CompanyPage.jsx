import axios from "axios";
import React from "react";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import ProofUpl from "../components/ImageUpload/ProofUpl";
import Remember from "../components/Remember/Remember";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";

export default function CompanyPage(props) {
  const { user, setUser } = props;
  console.log("props from company page", props)
  const [singleCompany, setSingleCompany] = React.useState({});
  const [listOfAnswers, setListOfAnswers] = React.useState([]);

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
        // console.log("response: ", response);
        // console.log("branch: ", response.data.oneCompany.branch.branch);
        setSingleCompany(response.data.oneCompany);
        setListOfAnswers(response.data.oneCompany.answers);
      })
      .catch((err) => {
        console.error("err:", err);
      });
  }, [props.match.params.companyId]);

  // console.log("single comp", singleCompany);
  // console.log("listOfAnsers", listOfAnswers);

  return (
    <div>
      {!singleCompany.branch ? (
        <h3>...loading</h3>
      ) : (
        <div>
          <h1>{singleCompany.name}</h1>

          {user && (
            <ImageUpload
              company={singleCompany}
              setCompany={setSingleCompany}
            />
          )}

          <img
            src={singleCompany.image}
            style={{ width: "300px" }}
            alt="Dayman"
          />
          <Remember companyId={singleCompany._id} user={user} setUser={setUser}/>

          <div>
            <h1>This is the Company Data</h1>
            <p>{singleCompany.adress}</p>
            <p>{singleCompany.url}</p>
            <p>Company Size: {singleCompany.size}</p>
            <p>What they do {singleCompany.description}</p>
            <p>Branch: {singleCompany.branch.branch}</p>
          </div>

          <div>
            <h1>This is the Companies Answers</h1>
            {listOfAnswers.map((oneQA, index) => {
              // console.log("oneQA)", oneQA);
              return (
                <div key={oneQA._id}>
                  <p>{oneQA.question.question}</p>
                  <p>{oneQA.answer}</p>

                  {oneQA.proof && (
                    <img
                      src={oneQA.proof}
                      style={{ width: "300px" }}
                      alt="Dayman"
                    />
                  )}

                  {user && (
                    <ProofUpl
                      oneQAId={oneQA._id}
                      company={singleCompany}
                      setCompany={setSingleCompany}
                      listOfAnswers={listOfAnswers}
                      setListOfAnswers={setListOfAnswers}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
