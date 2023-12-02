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
                    <Route path="/ground-floor" element={ <HomePageComponent /> } />

                    <Route path="/ground-floor/maintenanceMachines" element={ <ListMaintenanceMachineComponent /> } />
                    <Route path="/ground-floor/maintenanceMachine/add-maintenance-machine/:id" element={ <CreateMaintenanceMachineComponent /> } />
                    <Route path="/ground-floor/maintenanceMachine/view-record/:area" element={ <ViewMaintenanceRecordByArea /> } />

                    <Route path="/ground-floor/calibrationMachines" element={ <ListCalibrationMAcineComonent/> }/>
                    <Route path="/ground-floor/calibrationMachine/add-calibration-machine/:id" element={ <CreateCalibrationMachineComponent /> }/>
                    <Route path="/ground-floor/calibrationMachine/view-record/:area" element={ <ViewCalibrationRecordByArea /> } />
                </Routes>
            </div>
            {/* <FooterComponent /> */}
        </Router>
    </div>
  );
}

export default App;
