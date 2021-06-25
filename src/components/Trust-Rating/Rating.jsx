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

  // CHECK IF USER HAS ALREADY RATED
  const alreadyRated = company.ratings
    .map((el) => el.name)
    .includes(user.username);

  // CHECK IF USER IS OWNER
  const isOwner = company.owner === user._id;
  console.log("isOwner?", isOwner);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    if (alreadyRated || isOwner) {
      console.log("ALREADY RATED,", alreadyRated);
      console.log("OWNER CANT RATE,", alreadyRated);
      // TODO ERRORMESSAGE ON THIS
      return <div>"you have to have a company to do thit"</div>;
    }

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
  function handleRadioChange(event) {
    setOptionState(event.target.value);
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="rate-form">
          <div>
            <label>rate with</label>
            <br></br>
            <input
              type="number"
              value={form.rating}
              onChange={handleChange}
              name="rating"
              min="1"
              max="5"
            />
          </div>
          <div>
            <label>Comment</label>
            <input
              type="text"
              value={form.comment}
              onChange={handleChange}
              name="comment"
            />
          </div>
        </div>
        <section>
          {user.username}
          <input
            value={user.username}
            checked={selectedOption === `${user.username}`}
            // TODO defaultChecked would be nice is displayed
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
            onChange={handleRadioChange}
          />
        </section>
        <div className="margin"></div>
        <button type="submit" className="btn-submit">
          send rating
        </button>
      </form>
    </div>
  );
}
