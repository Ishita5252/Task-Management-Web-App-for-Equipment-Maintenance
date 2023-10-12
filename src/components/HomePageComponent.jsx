import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
        <h3 className="text-center">Welcome User!</h3>
        <div className="row">
            <h4 className="text-center">Please select where you want to go:</h4>
        </div>
        <div>
            <Link to="/maintenanceMachines">
                <button>Manage Maintenance</button>
            </Link>
        </div>
        <div>
            {/* <Link to="/calibrationMachines"> */}
            <button>Manage Calibration</button>
            {/* </Link> */}
        </div>
    </div>
  );
};

export default HomePage;
