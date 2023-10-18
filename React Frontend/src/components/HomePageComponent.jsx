import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const HomePage = () => {
  return (
    <div className="center-content">
        {/* <button className="logout-button">Log Out</button> */}
        <div>
            <h2 className="text-center">Welcome to CDIL Maintenance Home Page</h2>
            <br></br>

            <h4 className="text-center">Select where you would like to go:</h4>        
            <br></br>

            <div>
                <Link to="/maintenanceMachines" className="center-link">
                <button className="btn btn-info">Preventive Maintenance Dashboard</button>
                </Link>
            </div>
            <br></br>
            <div>
                <Link to="/" className="center-link">
                <button className="btn btn-info">Calibration Dashboard</button>
                </Link>
            </div>
        </div>
        <br></br>

        {/* <div>
            <p className="text-center">In case of any issues with the website: <a href="mailto:ishita.verma@cdil.com">Press here</a></p>
        </div> */}
    </div>
  );
};

export default HomePage;