import React from "react";
import axios from "axios";

import "../App.css";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as CREATE_SERVICE from "../services/create";
import * as CONSTS from "../utils/consts";

export default function CreatePage(props) {
  // SET FORM
  const [form, setForm] = React.useState({
    name: "",
    url: "",
    email: "",
    adress: "",
    description: "",
    size: "1-2",
    branch: "Production",
    logo: "",
    // WHY CANT THIS BE EMPTY; HOW TO GET THIS OPTIONAL
  });

  // // GET THE BRANCHES & THE QUESTIONS & ANSWERS
  const [listOfQuestions, setListOfQuestions] = React.useState([]);
  const [listOfBranches, setListOfBranches] = React.useState([]);
  const [listOfSizes, setListOfSizes] = React.useState([]);
  const [answers, setAnswers] = React.useState({});

  React.useEffect(() => {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      return;
    }

    axios
      .get(`${CONSTS.SERVER_URL}/create-company`, {
        headers: { authorization: accessToken },
      })
      .then((response) => {
        console.log("response:", response);
        setListOfBranches(response.data.allBranches);
        setListOfQuestions(response.data.allQuestions);
        setListOfSizes(response.data.size);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // FILTER THE QUESTIONS PER SELECTED BRANCH
  const branchFilter = listOfBranches.find((el) => el.branch === form.branch);
  const allFilteredQuestions = listOfQuestions.filter(
    (el) => el.branch === branchFilter._id
  );

  // HANDLE SUBMIT
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    // HANDELING FORM DATA = PICTURES
    if (logoUpload) {
      console.log("no logo has been uploaded");
      return;
    }

    const formBody = new window.FormData();
    // append need to be named as in parser backend
    formBody.append("logo", logoUpload);

    // MAKING THE AXIOS CALL

    CREATE_SERVICE.CREATE_COMPANY(
      {
        ...form,
        questionsAndAnswers: answers,
        branch: branchFilter._id,
        logo: logoUpload,
      },
      accessToken
    )
      .then((res) => {
        console.log("response on handlesubmit", res);
        props.history.push(`${PATHS.HOMEPAGE}`);
      })
      .catch((err) => {
        console.error("err:", err.response);
      });
  }

  // SETUP FOR LOGOUPLOAD
  const [logoUpload, setLogoUpload] = React.useState(null);
  function handleInputChange(event) {
    console.log(event.target.files[0]);
    const logo = event.target.files[0];
    setLogoUpload(logo);
  }

  // RETURNING FORM

  return (
    <div>
      {!props.user ? (
        <Link to={PATHS.LOGINPAGE}>please login first</Link>
      ) : (
        <>
          {props.user.username}, here you can create your company
          <section className="questionaire">
            <h4>listing of your company</h4>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="company name"
                  onChange={handleChange}
                  value={form.name}
                />{" "}
                <br />
                <input type="file" onChange={handleInputChange} />
                <br />
                <button type="submit"> Upload a picture</button>
                <br />
                <input
                  type="text"
                  name="url"
                  placeholder="website"
                  onChange={handleChange}
                  value={form.url}
                />{" "}
                <br />
                <input
                  type="email"
                  name="email"
                  placeholder="email adress"
                  onChange={handleChange}
                  value={form.email}
                />{" "}
                <br />
                <input
                  type="text"
                  name="adress"
                  placeholder="A Street 43, 12573 City"
                  onChange={handleChange}
                  value={form.adress}
                />{" "}
                <br />
                <input
                  type="text"
                  name="description"
                  placeholder="describe what you do"
                  onChange={handleChange}
                  value={form.description}
                />
                <br />{" "}
                <label htmlFor="">
                  please select a company size
                  <select
                    name="size"
                    type="text"
                    onChange={handleChange}
                    value={form.size}
                  >
                    {/* OPTION ISNT ON TOP */}
                    {/* <option disabled selected>
                      pick one
                    </option> */}
                    {listOfSizes.map((oneSize, index) => {
                      return <option key={index}>{oneSize}</option>;
                    })}
                  </select>
                </label>{" "}
                <br />
                <label htmlFor="">
                  please select a branch
                  <select
                    name="branch"
                    onChange={handleChange}
                    value={form.branch}
                  >
                    {/* OPTION ISNT ON TOP */}
                    {/* <option disabled selected>
                      pick one
                    </option> */}
                    {listOfBranches.map((oneBranch) => {
                      return (
                        <option key={oneBranch._id}>{oneBranch.branch}</option>
                      );
                    })}
                  </select>
                </label>{" "}
                <br />
                <label htmlFor="">
                  HERE COMES THE QUESTIONS
                  <div>
                    {allFilteredQuestions.map((oneQuestion) => {
                      return (
                        <div key={oneQuestion._id}>
                          <p>{oneQuestion.question}</p>
                          <input
                            type="text"
                            name="answer"
                            placeholder={oneQuestion.placeholder}
                            maxLength={100}
                            onChange={(event) => {
                              // console.log(event.target.value);
                              // console.log(oneQuestion);
                              setAnswers({
                                ...answers,
                                [oneQuestion._id]: event.target.value,
                              });
                            }}
                            value={answers[oneQuestion._id] || ""}
                          />
                          <br />{" "}
                        </div>
                      );
                    })}
                  </div>
                </label>
              </div>
              <button type="submit">Create this listing</button>
            </form>
            {/* <a class="home-btn" href="/">go home</a> */}
          </section>
        </>
      )}
    </div>
  );
}
