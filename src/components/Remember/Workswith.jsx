import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import LoadingComponent from "../Loading";

export default function Workswith(props) {
  const { company, user } = props;
  // const { company, user, setUser} = props;
  const [usersCompanies, setUsersCompanies] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  // GETTING USERS COMPANY

  React.useEffect(() => {
    setIsLoading(true);
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      setIsLoading(false);

      return;
    }
    axios
      .get(
        `${CONSTS.SERVER_URL}${PATHS.COMPANYROUTE}/${company._id}${PATHS.WORKCHAIN}`,
        {
          headers: { authorization: accessToken },
        }
      )
      .then((response) => {
        setUsersCompanies(response.data.myCompanys);
      })
      .catch((err) => {
        console.error("err:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  // INSTEAD OF AN USESTATE // NEEDS TO BE WORKED ON TO VALIDATE WHICH COMPANY
  let workChained;
  if (user) {
    // RETURNS AN ARRAY OF TRUES OR FALSES, CAUSE ALL COMPANYS AT A TIME
    const workswithIds = usersCompanies.map((comp) =>
      comp.workswith.map((el) => el._id).includes(company._id)
    );
    // console.log("works with?", workswithIds[0]);
    workChained = workswithIds[0];

    if (!workChained) {
      // console.log("you dont work with anyone yet");
      // console.log("you have to have a company to do that");
      // TO DO ERRORMESSAGE IF SO
      // return <div>"you have to have a company to do that"</div>;
    }
  }

  function doWorkWith() {
    if (!accessToken) {
      return;
      // TODO HERE SEND ERRORMESSAGE : YOU NEED TO BE LOGGED IN
    }

    // CHECKING IF NOT Working with
    if (!workChained) {
      axios
        .post(
          `${CONSTS.SERVER_URL}${PATHS.COMPANYROUTE}/${company._id}${PATHS.WORKCHAIN}${PATHS.PUT}`,
          { usersCompanies },
          {
            headers: { authorization: accessToken },
          }
        )
        .then((response) => {
          console.log("res", response.data);
          setUsersCompanies(response.data.myCompanys);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("you reached else");
      axios
        .post(
          `${CONSTS.SERVER_URL}${PATHS.COMPANYROUTE}/${company._id}${PATHS.WORKCHAIN}${PATHS.DELETE}`,
          { usersCompanies },
          {
            headers: { authorization: accessToken },
          }
        )
        .then((response) => {
          console.log("res on del", response.data);
          setUsersCompanies(response.data.myCompanys);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div>
      {/* THE TEST BREAKS THE CODE WHEN NOT LOGGED IN */}
      {/* {usersCompanies.map((comp) => comp.workswith.map((el) => el.name))} */}
      {workChained ? (
        <div>
          {" "}
          <button onClick={doWorkWith} className="btn-submit">
            coworkers
          </button>
          {!workChained && <div>"you have to have a company to do thot"</div>}
        </div>
      ) : (
        <div>
          {" "}
          <button onClick={doWorkWith} className="btn-submit">
            coworker?
          </button>
        </div>
      )}
    </div>
  );
}
