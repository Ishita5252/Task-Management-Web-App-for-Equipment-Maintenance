import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

// import CalibrationMachineService from '../services/CalibrationMachineService';

const HomePage = () => {
  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <br/><br/><br/><br/><br/><br/>
                
                <h2 className="text-center">Welcome to CDIL Maintenance Home Page</h2>
                <br/>
                <h4 className="text-center">Please select where you would like to go:</h4>        
                <br/><br/>
                
                <div className="d-flex flex-column align-items-center">
                    <Link to="/maintenanceMachines" className="center-link w-100">
                        <button className="btn btn-info w-100">Preventive Maintenance Dashboard</button>
                    </Link>
                    <Link to="/calibrationMachines" className="center-link w-100 mt-2">
                        {/* <button className="btn btn-info w-100" onClick={() => CalibrationMachineService.updateStatusOfAllMachines()}>Calibration Dashboard</button> */}
                        <button className="btn btn-info w-100" >Calibration Dashboard</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default HomePage;