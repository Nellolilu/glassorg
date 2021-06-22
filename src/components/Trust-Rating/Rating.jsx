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

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    if (alreadyRated) {
      console.log("ALREADY RATED", alreadyRated);
      return <div>"you have to have a company to do that"</div>;
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

          <br />
        </div>

        <button type="submit">send rating</button>
      </form>
    </div>
  );
}
