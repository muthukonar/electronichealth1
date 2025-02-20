
import { Link } from "react-router-dom";


const Homepage = () => {
  return (
    <div className="hp-loginlinks">
      <h1>Welcome to DocConnection</h1>
      <p>Please choose your login type:</p>

      {/* Doctor login */}
      <Link to="/Drlogin" className="btn btn-primary">
        Doctor Login
      </Link>

      {/* Patient login */}
      <Link to="/PatientLogin" className="btn btn-secondary">
        Patient Login
      </Link>
    </div>
  );
};
  
  export default Homepage;
