import React from "react";
import axios from "axios";

import "../App.css";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as CREATE_SERVICE from "../services/create";
import * as CONSTS from "../utils/consts";
import "./CreatePage.css";
import Footer from "../components/Footer/Footer";

export default function CreatePage(props) {
  const [form, setForm] = React.useState({
    name: "",
    url: "",
    email: "",
    adress: "",
    description: "",
    size: "1-2",
    branch: "Production",
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

    // MAKING THE AXIOS CALL

    CREATE_SERVICE.CREATE_COMPANY(
      {
        ...form,
        questionsAndAnswers: answers,
        branch: branchFilter._id,
      },
      accessToken
    )
      .then((res) => {
        console.log("response on handlesubmit", res);
        props.history.push(`${PATHS.COMPANYROUTE}/${res.data.company._id}`);
      })
      .catch((err) => {
        console.error("err:", err.response);
      });
  }

  // RETURNING FORM

  return (
    <div>
      {!props.user ? (
        <Link to={PATHS.LOGINPAGE}></Link>
      ) : (
        <>
          <section className="questionaire">
            <div className="questionaire-header">
              <h1>We dont judge you by your answers - our users do.</h1>
              <p>
                So there is no rating on what you choose to tell, as an approach
                is not mesureble. Feel free to answer in sentences. BUT make
                sure to prove - its the basement for our rating, and others
                trust.
              </p>
            </div>
            <div className="dash purple"></div>

            <div className="questionaire-box">
              <div className="questionaire-left">
                <h4>Create a listing of your company</h4>
                {/* <h4>and go transparent</h4> */}
              </div>
              <div className="questionaire-right">
                <form onSubmit={handleSubmit} className="create-form">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="company name"
                      onChange={handleChange}
                      value={form.name}
                    />{" "}
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
                      placeholder="a Street 43, 12573 City"
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
                    <div className="select-box">
                      <label htmlFor="">
                        please select a company size
                        <div className="select-wrapper">
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
                        </div>
                      </label>{" "}
                      <br />
                      <label htmlFor="">
                        please select a branch
                        <div className="select-wrapper">
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
                                <option key={oneBranch._id}>
                                  {oneBranch.branch}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </label>{" "}
                    </div>
                    <br />
                    <label htmlFor="">
                      <h4>and go transparent:</h4>
                      <div>
                        {allFilteredQuestions.map((oneQuestion) => {
                          return (
                            <div
                              key={oneQuestion._id}
                              className="questions-box"
                            >
                              <p>{oneQuestion.question}</p>
                              <input
                                type="text"
                                name="answer"
                                placeholder={oneQuestion.placeholder}
                                maxLength={100}
                                onChange={(event) => {
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
                  <div className="submit-container">
                    <button type="submit" className="btn-submit">
                      Create this listing
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* <a class="home-btn" href="/">go home</a> */}
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
