import axios from "axios";
import React from "react";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";

export default function Rating(props) {
  const { user, company, setCompany } = props;

  const [form, setForm] = React.useState({
    rating: 3,
    comment: "",
    name: `${user.username}`,
    date: `${new Date().toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}`,

    user: user._id,
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    // console.log(CONSTS.ACCESS_TOKEN);
    axios
      .put(
        `${CONSTS.SERVER_URL}${PATHS.COMPANYROUTE}/${company._id}${PATHS.RATE}`,
        form,
        {
          headers: {
            authorization: accessToken,
          },
        }
      )
      .then((response) => {
        console.log("res on sending rating", response);
        setCompany(response.data.company);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // HANDLE OPTIONS

  const [selectedOption, setOptionState] = React.useState(null);
  // console.log("currently selected", selectedOption);

  function handleRadioChange(event) {
    setOptionState(event.target.value);
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // console.log("form", form);
  // console.log("company.ratings", company.ratings);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating</label>
          <input
            type="number"
            value={form.rating}
            onChange={handleChange}
            name="rating"
            min="1"
            max="5"
          />
          <label>Comment</label>
          <input
            type="text"
            value={form.comment}
            onChange={handleChange}
            name="comment"
          />

          <section>
            {user.username}
            <input
              value={user.username}
              checked={selectedOption === `${user.username}`}
              // defaultChecked
              type="radio"
              name="name"
              onChange={handleRadioChange}
            />
            anonymus{" "}
            <input
              value="anonymus"
              checked={selectedOption === "anonymus"}
              type="radio"
              name="name"
              // onChange={(e) => {
              //   setOptionState(e.target.value);
              // }}
              onChange={handleRadioChange}
            />
          </section>
          {/* 
          {new Date().toLocaleString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })} */}

          <br />
        </div>

        <button type="submit">send rating</button>
      </form>

      {!company.ratings ? (
        <p> is loading</p>
      ) : (
        company.ratings.map((rating, index) => {
          return (
            <div key={rating._id}>
              <h6> {rating.comment}</h6>
            </div>
          );
        })
      )}
    </div>
  );
}
