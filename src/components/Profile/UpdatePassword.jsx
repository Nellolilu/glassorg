// import axios from "axios";
// import React from "react";
// import * as CONSTS from "../../utils/consts";
// import * as PATHS from "../../utils/paths";

// export default function UpdatePassword(props) {
//   const { authenticate, displayUpdatePassword, setDisplayUpdatePassword } =
//     props;
//   console.log("props", props);

//   const [form, setForm] = React.useState({
//     currentPassword: "",
//     password: "",
//     confirmPassword: "",
//   });

//   function handleChange(event) {
//     setForm({ ...form, [event.target.name]: event.target.value });
//   }

//   console.log("currentPassword", form.currentPassword);
//   console.log("password", form.password);
//   console.log("confirmPassword", form.confirmPassword);

//   function handleSubmit(e) {
//     e.preventDefault();
//     const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
//     axios
//       .put(
//         `${CONSTS.SERVER_URL}${PATHS.PROFILEPAGE}${PATHS.CHANGEPWPAGE}`,
//         form,
//         { headers: { authorization: accessToken } }
//       )
//       .then((response) => {
//         console.log("response", response);
//         authenticate(response.data.user);
//         setDisplayUpdatePassword(!displayUpdatePassword);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Current Password</label>
//         <input
//           name="currentPassword"
//           placeholder="Current Password"
//           value={form.currentPassword}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>New Password</label>
//         <input
//           name="password"
//           placeholder="New Password"
//           value={form.password}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Confirm New Password</label>
//         <input
//           name="confirmPassword"
//           placeholder="Confirm New Password"
//           value={form.confirmPassword}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit">Update the password</button>
//     </form>
//   );
// }
