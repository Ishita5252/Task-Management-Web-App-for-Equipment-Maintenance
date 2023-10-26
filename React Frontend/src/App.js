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
                    <Route path="/" element={ <HomePageComponent /> } />

                    <Route path="/maintenanceMachines" element={ <ListMaintenanceMachineComponent /> } />
                    <Route path="/maintenanceMachine/add-maintenance-machine/:id" element={ <CreateMaintenanceMachineComponent /> } />
                    <Route path="/maintenanceMachine/view-record/:area" element={ <ViewMaintenanceRecordByArea /> } />

                    <Route path="/calibrationMachines" element={ <ListCalibrationMAcineComonent/> }/>
                    <Route path="/calibrationMachine/add-calibration-machine/:id" element={ <CreateCalibrationMachineComponent /> }/>
                    <Route path="/calibrationMachine/view-record/:area" element={ <ViewCalibrationRecordByArea /> } />
                </Routes>
            </div>
            {/* <FooterComponent /> */}
        </Router>
    </div>
  );
}

export default App;
