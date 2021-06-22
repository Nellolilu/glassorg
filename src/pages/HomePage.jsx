import "../App.css";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import GetResults from "../components/GetResults/GetResults";

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
      <section>
        <GetResults />
      </section>
    </div>
  );
}

export default HomePage;
