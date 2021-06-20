import React from "react";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";
import axios from "axios";
//
// import LoadingComponent from "../Loading/index";

export default function GetResults() {
  const [selected, setSelected] = React.useState("All");
  const [allOptions, setAllOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  // const [isLoading, setIsLoading] = React.useState(true);

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
    // setIsLoading(true);

    axios
      .get(`${CONSTS.SERVER_URL}${PATHS.RESULTS}`)
      .then((response) => {
        console.log("response", response);
        setAllOptions(response.data.allCompanies);
      })
      .catch((err) => {
        console.error(err);
      });
    // .finally(() => {
    //   setIsLoading(false);
    // });
  }, []);

  // if (isLoading) {
  //   return <LoadingComponent />;
  // }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search"
          value={inputValue}
          onChange={handleInputChange}
        ></input>
        <button>search</button>
      </form>

      <button onClick={() => exchangeBranches("Service")}>Service</button>
      <button onClick={() => exchangeBranches("Other")}>Other</button>
      <button onClick={() => exchangeBranches("Production")}>Production</button>
      <button onClick={() => exchangeBranches("Sales")}>Sales</button>
      <button onClick={() => exchangeBranches("Food")}>Food</button>
      <button onClick={() => exchangeBranches("All")}>All</button>

      <div>this are the found companies</div>

      {filteredOptions.map((oneCompany) => {
        return (
          <div key={oneCompany._id}>
            {" "}
            <Link to={`${PATHS.COMPANYROUTE}/${oneCompany._id}`}>
              <h4>{oneCompany.name}</h4>
            </Link>
            <p>{oneCompany.url}</p>
            <p>answered:{oneCompany.answers.length}</p>
            <p>proofed:{oneCompany.answers.filter((el) => el.proof).length}</p>
          </div>
        );
      })}
    </div>
  );
}
