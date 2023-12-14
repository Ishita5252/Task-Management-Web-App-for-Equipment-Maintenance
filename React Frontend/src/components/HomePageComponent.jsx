import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

// import CalibrationMachineService from '../services/CalibrationMachineService';

const HomePage = () => {
  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <br/><br/><br/><br/><br/>
                
                <h1 className="text-center">Equipment Maintenance & Calibration</h1>
                <br/>
                <h5 className="text-center">Please select where you would like to go:</h5>        
                <br/>
                
                <div className="row">
                    <div className="col-lg-6">
                        <h3 className="text-center">Top Floor</h3>
                        <br/>
                        <Link to={`/root/maintenanceMachines/top_floor`} className="w-100">
                            <button className="btn btn-info w-100">Preventive Maintenance</button>
                        </Link>
                        <br/><br/>
                        <Link to="/root/calibrationMachines/top_floor" className="w-100">
                            <button className="btn btn-info w-100" >Calibration</button>
                        </Link>
                    </div>
                    <div className="col-lg-6">
                        <h3 className="text-center">Ground Floor</h3>
                        <br/>
                        <Link to={`/root/maintenanceMachines/ground_floor`} className="w-100">
                            <button className="btn btn-info w-100">Preventive Maintenance</button>
                        </Link>
                        <br/><br/>
                        <Link to="/root/calibrationMachines/ground_floor" className="w-100">
                            <button className="btn btn-info w-100" >Calibration</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default HomePage;