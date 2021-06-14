import React from "react";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";
import axios from "axios";

export default function GetResults(props) {
  const {} = props;
  const [listOfCompanies, setListOfCompanies] = React.useState([]);

  //SEARCHBAR
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
  }

  React.useEffect(() => {
    const results = listOfCompanies.filter((filteredCompanies) =>
      searchTerm.includes(filteredCompanies)
    );
    setSearchResults(results);
  }, [searchTerm]);

  console.log(searchTerm);
  console.log(searchResults);

  React.useEffect(() => {
    // const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    // if (!accessToken) {
    //   return;
    // }
    axios
      .get(`${CONSTS.SERVER_URL}${PATHS.RESULTS}`)
      .then((response) => {
        console.log(response);
        setListOfCompanies(response.data.allCompanies);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //GETTING ALL

  React.useEffect(() => {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      return;
    }
    axios
      .get(`${CONSTS.SERVER_URL}${PATHS.RESULTS}`)
      .then((response) => {
        console.log(response);
        setListOfCompanies(response.data.allCompanies);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="search"
        value={searchTerm}
        onChange={handleChange}
      ></input>

      <div>this are the found companies</div>

      {/* // HERE PASS A BRANCH VIA BUTTON AS PROPS? //HOW  OR FILTER VIA PASSED */}
      {listOfCompanies.map((oneCompany) => {
        return (
          <div key={oneCompany._id}>
            {" "}
            <Link to={`${PATHS.COMPANYROUTE}/${oneCompany._id}`}>
              <h4>{oneCompany.name}</h4>
            </Link>
            <p>{oneCompany.url}</p>
            <p>answered:{oneCompany.answers.length}</p>
            <p>
              proofed:{"tbcounted"}
              {/* {oneCompany.answers.reduce((counter, obj) => {
                if (obj.proof) {
                  if (obj.proof.length > 0) return (counter += 1);
                }
                return counter;
              }, 0)} */}
            </p>
          </div>
        );
      })}
    </div>
  );
}
