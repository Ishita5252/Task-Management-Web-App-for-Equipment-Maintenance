import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MaintenanceMachineService from "../services/MaintenanceMachineService";

const ViewMaintenanceMachineComponent = () => {
    const {id} = useParams();
    console.log("id:", id); //to log the value of id
    const[machine, setMachine] = useState({});

    useEffect(() => {
        MaintenanceMachineService.getMachineById(id).then((res) => {
            setMachine(res.data);
        });
    }, [id]);

    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> View MAchine Details</h3>
                <div className="card-body">
                    <div className="row">
                        <label> Machine Name: </label>
                        <div> {machine.machineName}</div>
                    </div>
                    <div className="row">
                        <label> Machine Code: </label>
                        <div> {machine.machineCode}</div>
                    </div>
                    <div className="row">
                        <label> Machine Location: </label>
                        <div> {machine.machineLocation}</div>
                    </div>
                    <div className="row">
                        <label> Due: </label>
                        <div> {machine.dueFromDate} to {machine.dueTillDate}</div>
                    </div>
                    <div className="row">
                        <label> Done On: </label>
                        <div> {machine.doneOnDate}</div>
                    </div>
                    <div className="row">
                        <label> Status: </label>
                        <div> {machine.status}</div>
                    </div>
                </div>
            </div>
        </div>
    )
    
};

export default ViewMaintenanceMachineComponent;