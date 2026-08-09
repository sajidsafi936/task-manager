import boy from "../assets/boy-user.png";
import "./HomeSection.css";
import { Link } from "react-router-dom";

function HomeSection() {
  return (
    <section className="home">
      <div className="card">
        <img
          className="boy-img"
          src={boy}
          alt="Task Management Illustration"
        />

        <div className="content">
          <h1>
            Task Management <br />
            & To-Do List
          </h1>

          <p>
            This productive tool is designed to help you better manage your
            task project-wise conveniently.
          </p>

          <Link to="/register">
          <button className="start-btn">
            Let's Start →
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;