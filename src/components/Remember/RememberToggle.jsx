import React from 'react';
import Remember from "./Remember.jsx";
import CONSTS from ""

export default function RememberToggle() {
  //TOGGLE

  const [remember, setRemember] = React.useState(false)

  function rememberToggle() {
    setRemember(!remember)
  }


    return (
        <div>
        <button onClick={rememberToggle}>Remember</button>
        {remember ? <Remember/> : null}
       
        </div>
    )
}
