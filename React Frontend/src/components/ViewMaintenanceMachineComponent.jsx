import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import MaintenanceMachineService from "../services/MaintenanceMachineService";

const ViewMaintenanceMachineComponent = () => {
    const {id} = useParams();
    console.log("id:", id); //to log the value of id
    const navigate = useNavigate();
    const[machine, setMachine] = useState({});

    useEffect(() => {
        MaintenanceMachineService.getMachineById(id).then((res) => {
            setMachine(res.data);
        });
    }, [id]);

    const goBack = () => {
        navigate('/maintenanceMachines');
    }

    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> View MAchine Details</h3>
                <br></br>
                <div className="card-body">
                    <div className="row">
                        <label> Machine Name: </label>
                        <div> {machine.machineName}</div>
                    </div>
                    <br></br>
                    <div className="row">
                        <label> Machine Code: </label>
                        <div> {machine.machineCode}</div>
                    </div>
                    <br></br>
                    <div className="row">
                        <label> Machine Location: </label>
                        <div> {machine.machineLocation}</div>
                    </div>
                    <br></br>
                    <div className="row">
                        <label> Task Frequency: </label>
                        <div> {machine.taskFrequency} {machine.frequencyUnit}</div>
                    </div>
                    <br></br>
                    <div className="row">
                        <label> Due: </label>
                        <div> {machine.dueFromDate} to {machine.dueTillDate}</div>
                    </div>
                    <br></br>
                    <div className="row">
                        <label> Done On: </label>
                        <div> {machine.doneOnDate}</div>
                    </div>
                    <div className="row">
                        <label> Status: </label>
                        <div> {machine.status}</div>
                    </div>
                </div>
                <br></br>
            </div>
            <button className="btn btn-info" onClick={goBack}>Go Back</button>
        </div>
    )
    
};

export default ViewMaintenanceMachineComponent;