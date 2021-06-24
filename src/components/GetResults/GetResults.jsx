import React from "react";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";
import axios from "axios";
import lenseBtn from "../../images/lense-btn.png";

export default function GetResults() {
  const [selected, setSelected] = React.useState("All");
  const [allOptions, setAllOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleInputChange({ target }) {
    setInputValue(target.value);
  }
  function exchangeBranches(value) {
    console.log("CHANGIN VLAUE", value);
    setInputValue("");
    setSelected(value);
  }

  const filteredOptions = allOptions.filter((e) => {
    if (selected === "All") {
      if (!inputValue) {
        return true;
      }
      return e.name.toLowerCase().includes(inputValue.toLowerCase());
    }

    if (!inputValue) {
      return e.branch.branch === selected;
    }
    if (e.name.toLowerCase().includes(inputValue.toLowerCase())) {
      return true;
    }

    return e.branch.branch === selected;
  });

  //GETTING ALL

  React.useEffect(() => {
    axios
      .get(`${CONSTS.SERVER_URL}${PATHS.RESULTS}`)
      .then((response) => {
        // console.log("response", response);
        setAllOptions(response.data.allCompanies);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search for places, companies, local stores, ..."
          value={inputValue}
          onChange={handleInputChange}
        ></input>
        <img src={lenseBtn} alt="search-icon" className="lense-btn" />
      </form>
      <div className="filter">
        <button
          onClick={() => exchangeBranches("All")}
          className={selected === "All" ? "btn-active" : "btn"}
        >
          Show all
        </button>
        <div className="filter-options">
          <span>filter by branch</span>
          <button
            onClick={() => exchangeBranches("Service")}
            className={selected === "Service" ? "btn-active" : "btn"}
          >
            Service
          </button>
          <button
            onClick={() => exchangeBranches("Production")}
            className={selected === "Production" ? "btn-active" : "btn"}
          >
            Production
          </button>
          <button
            onClick={() => exchangeBranches("Sales")}
            className={selected === "Sales" ? "btn-active" : "btn"}
          >
            Sales
          </button>
          <button
            onClick={() => exchangeBranches("Food")}
            className={selected === "Food" ? "btn-active" : "btn"}
          >
            Food
          </button>
          <button
            onClick={() => exchangeBranches("Other")}
            className={selected === "Other" ? "btn-active" : "btn"}
          >
            everything else
          </button>{" "}
        </div>
      </div>

      <div className="companies-container">
        {filteredOptions.map((oneCompany) => {
          return (
            <div key={oneCompany._id} className="company-box">
              {" "}
              <img src={oneCompany.image} alt="company-logo" />
              <p>{oneCompany.branch.branch}</p>
              <Link to={`${PATHS.COMPANYROUTE}/${oneCompany._id}`}>
                <h4>{oneCompany.name}</h4>
              </Link>
              <p>{oneCompany.adress}</p>
              <div className="rating-box">
                <p>{oneCompany.answers.length}answered</p>
                <p>
                  {oneCompany.answers.filter((el) => el.proof).length}proofed
                </p>
                <p>trust-rated</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
