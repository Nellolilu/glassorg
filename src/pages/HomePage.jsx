import logo from "../logo.svg";
import "../App.css";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";

function HomePage() {
  return (
    <div className="Home">
      <header className="App-header">
        <h1>GO TRANSPARENT</h1>
        <p>
          Fill out the questionaire and share your sustainablilty approaches.
        </p>
        <button>
          <Link to={PATHS.CREATEPAGE}> Create your listing</Link>
        </button>
      </header>
    </div>
  );
}

export default HomePage;
