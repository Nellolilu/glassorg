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
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";

export default function CompanyPage(props) {
  const { user, setUser, authenticate } = props;
  const [singleCompany, setSingleCompany] = React.useState({});
  console.log("company in companypage", singleCompany);
  const [listOfAnswers, setListOfAnswers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [isOwner, setIsOwner] = React.useState(false);
  const [workchainDisplay, setWorkchainDisplay] = React.useState(false);

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

  function workToggle() {
    setWorkchainDisplay(!workchainDisplay);
  }

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
              {isOwner && <DeleteCompany company={singleCompany} />}
            </div>

            <div className="c-head">
              <p>Branch: {singleCompany.branch.branch}</p>
              <h1>{singleCompany.name}</h1>
              <h4>{singleCompany.description}</h4>
            </div>
          </div>
          <div className="answers-box">
            <div className="answers-left">
              <h1>answered {singleCompany.answers.length} Questions</h1>
              <h1>
                proved {singleCompany.answers.filter((el) => el.proof).length}{" "}
                Answers
              </h1>
            </div>
            <div className="answers-right">
              {listOfAnswers.map((oneQA) => {
                return (
                  <div key={oneQA._id} className="qa-box">
                    <div className="questions">
                      {" "}
                      <p>{oneQA.question.question}</p>
                    </div>
                    <div className="answers">
                      <h3>{oneQA.answer}</h3>
                    </div>

                    {oneQA.proof && (
                      <a href={oneQA.proof} target="_blank" rel="noreferrer">
                        show proof
                      </a>
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
        </div>
      )}

      <div className="dash"></div>

      <div className="chain-box">
        <button
          onClick={workToggle}
          className={!workchainDisplay ? "btn-chain" : "btn-chain-active"}
        >
          {workchainDisplay ? (
            <h4>works with this Companies</h4>
          ) : (
            <h4> &gt; works with {singleCompany.workswith.length} Companies</h4>
          )}
        </button>

        {/* WORKSWITH */}

        {workchainDisplay && (
          <div className="companies-container">
            {singleCompany.workswith.map((coworker) => {
              return (
                <div key={coworker._id} className="company-box">
                  {" "}
                  <img src={coworker.image} alt="company-logo" />
                  <p>{coworker.branch.branch}</p>
                  <Link to={`${PATHS.COMPANYROUTE}/${coworker._id}`}>
                    <h4>{coworker.name}</h4>
                  </Link>
                  <p>{coworker.adress}</p>
                  <div className="rating-box">
                    <p>{coworker.answers.length}answered</p>
                    <p>
                      {coworker.answers.filter((el) => el.proof).length}
                      proofed
                    </p>
                    <p>trust-rated</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="dash"></div>

      <div className="rating-container">
        <div className="rating-left">
          <h1>
            <span className="headline">{singleCompany.name}</span>
            <br />
            is trust-rated with
            <RatingCalc company={singleCompany} />
            out of 5
          </h1>
        </div>
        <div className="rating-right">
          <h4>do you believe, what {singleCompany.name} is sharing?</h4>

          {user ? (
            <Rating
              user={user}
              company={singleCompany}
              setCompany={setSingleCompany}
            />
          ) : (
            <p className="message">log in to leave a rating</p>
          )}
          <RatingsListings company={singleCompany} />
        </div>
      </div>
      <div className="dash"></div>

      <Footer />
    </div>
  );
}
