import React from "react";
import axios from "axios";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";

export default function UpdateProfile(props) {
  // console.log("props", props);
  const { user, authenticate, displayUpdateProfile, setDisplayUpdateProfile } =
    props;
  const [form, setForm] = React.useState({
    username: user.username,
    email: user.email,
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    axios
      .put(
        `${CONSTS.SERVER_URL}${PATHS.PROFILEPAGE}${PATHS.UPDATEPAGE}`,
        form,
        {
          headers: { authorization: accessToken },
        }
      )
      .then((response) => {
        console.log("response:", response);
        authenticate(response.data.user);
        // TOGGLE SET BACK TO FALSE
        setDisplayUpdateProfile(!displayUpdateProfile);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update your profile</button>
    </form>
  );
}
