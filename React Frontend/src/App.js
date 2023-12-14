import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomePageComponent from './components/HomePageComponent';

import ListMaintenanceMachineComponent from './components/ListMaintenanceMachineComponent';
import CreateMaintenanceMachineComponent from './components/CreateMaintenanceMachineComponent';
import ViewMaintenanceRecordByArea from './components/ViewMaintenanceRecordByArea';

import ListCalibrationMAcineComonent from './components/ListCalibrationMachineComponent';
import CreateCalibrationMachineComponent from './components/CreateCalibrationMachineComponent';
import ViewCalibrationRecordByArea from './components/ViewCalibrationRecordByArea';

function App() {
  return (
    <div>
        <Router>
            {/* <HeaderComponent /> */}
            <div className="container">
                <Routes>
                    <Route path="/root" element={ <HomePageComponent /> } />

                    <Route path="/root/maintenanceMachines/:floor" element={ <ListMaintenanceMachineComponent /> } />
                    <Route path="/root/maintenanceMachine/add-maintenance-machine/:id/:floor" element={ <CreateMaintenanceMachineComponent /> } />
                    <Route path="/root/maintenanceMachine/view-record/:area/" element={ <ViewMaintenanceRecordByArea /> } />

                    <Route path="/root/calibrationMachines/:floor" element={ <ListCalibrationMAcineComonent/> }/>
                    <Route path="/root/calibrationMachine/add-calibration-machine/:id/:floor" element={ <CreateCalibrationMachineComponent /> }/>
                    <Route path="/root/calibrationMachine/view-record/:area/" element={ <ViewCalibrationRecordByArea /> } />
                </Routes>
            </div>
            {/* <FooterComponent /> */}
        </Router>
    </div>
  );
}

export default App;
