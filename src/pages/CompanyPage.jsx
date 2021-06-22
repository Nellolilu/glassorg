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
          <h1>{singleCompany.name}</h1>
          {isOwner && (
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
          {isOwner && (
            <BgImageUpload
              company={singleCompany}
              setCompany={setSingleCompany}
            />
          )}

          <img
            src={singleCompany.bgImage}
            style={{ width: "300px" }}
            alt="Dayman"
          />
          <Remember
            companyId={singleCompany._id}
            user={user}
            setUser={setUser}
          />
          <Workswith company={singleCompany} user={user} setUser={setUser} />

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
            {listOfAnswers.map((oneQA) => {
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
