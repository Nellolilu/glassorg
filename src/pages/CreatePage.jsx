import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as CREATE_SERVICE from "../services/create";
import * as CONSTS from "../utils/consts";

export default function CreatePage(props) {
  const [form, setForm] = React.useState({
    name: "",
    url: "",
    email: "",
    adress: "",
    size: "",
    description: "",
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    CREATE_SERVICE.CREATE_COMPANY(form, accessToken)
      .then((res) => {
        console.log("response on handlesubmit", res);
        // WHAT IS THAT AGAIN??
        props.history.push(`${PATHS.HOMEPAGE}`);
      })
      .catch((err) => {
        console.error("err:", err.res);
      });
    //   API CALL TO CREATE MOVIE HERE+
  }

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
                />
                <br />
                <input
                  type="url"
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
                <br />{" "}
                <input
                  type="text"
                  name="size"
                  placeholder="pick a size"
                  onChange={handleChange}
                  value={form.size}
                />{" "}
                <br />{" "}
                <input
                  type="text"
                  name="description"
                  placeholder="describe what you do"
                  onChange={handleChange}
                  value={form.description}
                />
              </div>
              <button type="submit">Create this listing</button>
            </form>
          </section>
        </>
      )}
    </div>
  );
}

//   <input class="form-input" placeholder= "company name" name="name" value="{{name}}">
//   <input class="form-input" placeholder= "webpage" type="url" name="url" value="{{url}}">
//   <input class="form-input" placeholder= "email" type="email" name="email" value="{{email}}">
//   <input class="form-input" placeholder= "adress" name="adress" value="{{adress}}">
//     <select class="form-input" name="size" id="size" >
//     <option disabled selected>company size</option>
//     {{#each size}}
//     <option value="{{this}}">{{this}}</option>
//     {{/each}}
//   </select>
//     <select class="form-input" name="branch" id="branch" >
//       <option disabled selected>branch</option>
//     {{#each branch}}
//     <option value="{{this}}">{{this}}</option>
//     {{/each}}
//   </select>
//   <input class="form-input" placeholder= "describe your company" name="description" value="{{description}}">
//   {{!-- <input class="form-input" type="file" name="image"> --}}
// <br>
// <label for="file-upload" class="file-upload">
//     upload a logo
// </label>
// <input id="file-upload" type="file" name="image"/>

// <h4>and go transparent</h4>
// <h6 class="description">Fill out this questionaire and share your sustainablilty approaches.<br>To make your profile trustworthy, you can upload pictures that proof<br>your statements after you succesfully listed your company.</h6>
//   <p><strong>social question / </strong>do you have more male or more female positions in leading roles of your business?</p>
//   <input class="form-input" placeholder= "male / female / equal" name="social1" value="{{social1}}">
// <p><strong>economic question / </strong>do you pay taxes on your product/service where your costumer is based?</p>
//   <input class="form-input" placeholder= "yes / no / some %" name="ecological1" value="{{ecological1}}">
//   <p><strong>ecological question / </strong>is your company running completely on renewable energy?</p>
//   <input class="form-input" placeholder= "yes / no / some %" name="economic1" value="{{economic1}}">
//     <p><strong>ecological question / </strong>what percentage of the CO2 your business produces are you compensating?</p>
//   <input class="form-input" placeholder= "some %" name="ecological2" value="{{ecological2}}">
// <br>
// <a class="create-btn" href="javascript:;" onclick="parentNode.submit();">create listing</a>

// </form>

// <a class="home-btn" href="/">go home</a>
