import "../App.css";
import GetResults from "../components/GetResults/GetResults";
import "./HomePage.css";
import * as PATHS from "../utils/paths";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function HomePage() {
  return (
    <div>
      <div className="bg-Image">
        <header className="App-header">
          <h1> Eat good, feel good, work good. </h1>
          <p>
            Find companies that care. See, what they really do about it and who
            they are working with.{" "}
          </p>
        </header>
        <section>
          <GetResults />
        </section>
        <div className="add-box">
          <div className="add-left">
            <div>
              <h1>Go Transparent</h1>
              <p>It's time to share and profit - for everyone.</p>
            </div>

            <Link to={PATHS.CREATEPAGE}>
              <button className="btn-active place-btn">Create a listing</button>{" "}
            </Link>
          </div>

          <div className="add-right">
            <p>
              <span>
                Corporate transparency is not just a movement - in the digital
                age transparency is a strong weapon.&nbsp;
              </span>
              It leads to a more egalitarian and connected world and to more
              efficiency and trustworthy companies. Show your approach in beeing
              a substainable thinking company and give your competetors the
              chance to join you in doing the right thing - for a better social,
              ecological and economical future.
            </p>
          </div>
        </div>

        <div className="features">
          <p>
            You're missing features? map-box or a dark mode? questions too lame?
            <br />
            Mail me: glassorg@ennenn.studio <br />
            This page is currently worked on. So far desktop only.
          </p>
        </div>
        <Footer />
        {/* <div className="footer">
          <div className="header-logo">
            <Link to={PATHS.HOMEPAGE}>
              {" "}
              <img src={logo} className="logo-header" alt="logo" />
            </Link>
          </div>
          <div className="footer-links">
            <p>About</p>
            <p>Login </p>
            <p>Imprint</p>
            <p>Legal Notice</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default HomePage;
