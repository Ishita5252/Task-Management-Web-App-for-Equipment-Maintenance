import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomePageComponent from './components/HomePageComponent';
import ListMaintenanceMachineComponent from './components/ListMaintenanceMachineComponent';
import CreateMaintenanceMachineComponent from './components/CreateMaintenanceMachineComponent';
import ViewMaintenanceMachineComponent from './components/ViewMaintenanceMachineComponent';
import ViewMaintenanceRecordByArea from './components/ViewMaintenanceRecordByArea';
// import ViewMaintenanceRecordComponent from './components/ViewMaintenanceRecordComponent';
// import FooterComponent from './components/FooterComponent';
// import HeaderComponent from './components/HeaderComponent';

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
                    <Route path="/maintenanceMachine/view-maintenance-machine/:id" element={ <ViewMaintenanceMachineComponent /> } />
                    {/* <Route path="/maintenanceMachine/view-record" element={ <ViewMaintenanceRecordComponent /> } /> */}
                    <Route path="/maintenanceMachine/view-record/:area" element={ <ViewMaintenanceRecordByArea /> } />
                </Routes>
            </div>
            {/* <FooterComponent /> */}
        </Router>
    </div>
  );
}

export default App;
