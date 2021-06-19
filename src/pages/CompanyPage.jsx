import axios from "axios";
import React from "react";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import ProofUpl from "../components/ImageUpload/ProofUpl";
import Remember from "../components/Remember/Remember";
import Rating from "../components/Trust-Rating/Rating";
import RatingCalc from "../components/Trust-Rating/RatingCalc";
import LoadingComponent from "../components/Loading";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";

export default function CompanyPage(props) {
  const { user, setUser } = props;
  const [singleCompany, setSingleCompany] = React.useState({});
  console.log("comoany in companypage", singleCompany);
  const [listOfAnswers, setListOfAnswers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    // LATE FOR FOLLOW & CHAIN?
    // const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    axios
      .get(
        `${CONSTS.SERVER_URL}${PATHS.COMPANYROUTE}/${props.match.params.companyId}`
      )
      .then((response) => {
        setSingleCompany(response.data.oneCompany);
        setListOfAnswers(response.data.oneCompany.answers);
      })
      .catch((err) => {
        console.error("err:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.match.params.companyId]);

  if (isLoading) {
    return <LoadingComponent />;
  }

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
          <Remember
            companyId={singleCompany._id}
            user={user}
            setUser={setUser}
          />

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
                      oneQA={oneQA}
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
      <RatingCalc company={singleCompany} />

      <Rating
        user={user}
        company={singleCompany}
        setCompany={setSingleCompany}
      />
    </div>
  );
}
