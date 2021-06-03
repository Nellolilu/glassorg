import React from "react";
import "../App.css";

export default function ProfilePage(props) {
  return (
    <div>
      hello {props.user.username}
      <div>this is your created company</div>
      <div>{props.user.companydata}</div>
    </div>
  );
}
