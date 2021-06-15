import React from "react";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";
import axios from "axios";

export default function GetResults(props) {
  const [listOfCompanies, setListOfCompanies] = React.useState([]);


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
    const results = listOfCompanies.filter(filteredCompanies =>
      filteredCompanies.name === searchTerm);
      // THIS ONLY WORKS WITH FULL NAME
    
    setSearchResults(results);
  }, [searchTerm]);

  console.log(searchTerm);
  console.log("results ", searchResults);



  // FILTER BY BRANCH

function filter(branch) {
  const results = listOfCompanies.filter(filteredCompanies =>
      filteredCompanies.branch.branch === branch);
      console.log("result from branchfilter", results)
}




  return (

// SEARCHBAR HAS NO RESULTS SHOWING YET
    <div>
      <input
        type="text"
        placeholder="search"
        value={searchTerm}
        onChange={handleChange}
      ></input>

<button onClick={filter("Service")}>Service
</button>
<button onClick={filter("Other")}>Other
</button>
<button onClick={filter("Production")}>Production
</button>
<button onClick={filter("Sales")}>Sales
</button>
<button onClick={filter("Food")}>Food
</button>


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
                            proofed:{oneCompany.answers.filter(el => el.proof).length}

            </p>
          </div>
        );
      })}
    </div>
  );
}
