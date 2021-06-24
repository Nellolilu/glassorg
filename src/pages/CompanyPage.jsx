import axios from "axios";
import React from "react";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import BgImageUpload from "../components/ImageUpload/BgImageUpload";
import ProofUpl from "../components/ImageUpload/ProofUpl";
import Remember from "../components/Remember/Remember";
import RatingsListings from "../components/Trust-Rating/RatingsListings";
import Rating from "../components/Trust-Rating/Rating";
import RatingCalc from "../components/Trust-Rating/RatingCalc";
import LoadingComponent from "../components/Loading";
import Workswith from "../components/Remember/Workswith";
import DeleteCompany from "../components/Profile/DeleteCompany";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import "./CompanyPage.css";

export default function CompanyPage(props) {
  const { user, setUser, authenticate } = props;
  const [singleCompany, setSingleCompany] = React.useState({});
  console.log("company in companypage", singleCompany);
  const [listOfAnswers, setListOfAnswers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [isOwner, setIsOwner] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
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

  // OWNER CHECK // AS REACT USE STATE IT BREAKS TO PREVENT INFINITE LOOP // TO DEBUG
  let isOwner = false;
  if (user) {
    if (singleCompany.owner === user._id) {
      isOwner = true;
    }
  }
  console.log("AUTH", authenticate);

  return (
    <div>
      {!singleCompany.branch ? (
        <h3>...loading</h3>
      ) : (
        <div>
          <div
            style={{
              backgroundImage: `url(${singleCompany.bgImage})`,
              backgroundRepeat: "no-repeat",
              height: "65vh",
            }}
            className="bg-com-Image"
          >
            <img
              src={singleCompany.image}
              alt="Company-Logo"
              className="company-img"
            />

            {isOwner && (
              <ImageUpload
                company={singleCompany}
                setCompany={setSingleCompany}
              />
            )}

            {isOwner && (
              <BgImageUpload
                company={singleCompany}
                setCompany={setSingleCompany}
              />
            )}
          </div>
          <div className="chain-header">
            <Remember
              companyId={singleCompany._id}
              user={user}
              setUser={setUser}
            />
            <Workswith company={singleCompany} user={user} setUser={setUser} />
          </div>

          <div className="company-header">
            <div className="c-infos">
              <p>{singleCompany.adress}</p>
              <p>{singleCompany.url}</p>
              <p>Company Size: {singleCompany.size}</p>
            </div>

            <div className="c-head">
              <p>Branch: {singleCompany.branch.branch}</p>
              <h1>{singleCompany.name}</h1>
              <h4>{singleCompany.description}</h4>
            </div>
          </div>

          <h1>answered</h1>

          <div className="answers-box">
            {listOfAnswers.map((oneQA) => {
              return (
                <div key={oneQA._id}>
                  <div className="questions">
                    {" "}
                    <p>{oneQA.question.question}</p>
                  </div>
                  <div className="answers">
                    <p>{oneQA.answer}</p>
                  </div>

                  {oneQA.proof && (
                    <img
                      src={oneQA.proof}
                      style={{ width: "300px" }}
                      alt="Dayman"
                    />
                  )}

                  {isOwner && (
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

      {user ? (
        <Rating
          user={user}
          company={singleCompany}
          setCompany={setSingleCompany}
        />
      ) : (
        <p>log in to leave a rating</p>
      )}
      <RatingsListings company={singleCompany} />
      {isOwner && <DeleteCompany company={singleCompany} />}
    </div>
  );
}
