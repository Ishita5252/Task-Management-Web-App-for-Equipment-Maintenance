import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MaintenanceMachineService from '../services/MaintenanceMachineService';

function ListMaintenanceMachineComponent(){
    const navigate = useNavigate();
    const[machines, setMachines] = useState([]);

    useEffect(() => {
        MaintenanceMachineService.getMachines().then((res) => {
            setMachines(res.data);
        });
    }, []);

    const deleteMachine = (id) => {
        MaintenanceMachineService.deleteMachine(id).then(() => {
            setMachines(machines.filter(machine => machine.id !== id));
        });
    }

    const viewMachine = (id) => {
        navigate(`/maintenanceMachine/view-maintenance-machine/${id}`);
    }

    const editMachine = (id) => {
        navigate(`/maintenanceMachine/add-maintenance-machine/${id}`);
    }

    const addMachine = () => {
        navigate(`/maintenanceMachine/add-maintenance-machine/_add`);
    }

    return (
        <div>
            <h2 className="text-center">Tasks List</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={addMachine}> Add Machine</button>
            </div>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Name</th>
                            <th> Code</th>
                            <th> Location </th>
                            <th> Due </th>
                            <th> Done On </th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            machines.map(machine => {
                                console.log("ID:", machine.id);
                                return(
                                    <tr key={machine.id}>
                                    <td> {machine.machineName} </td>
                                    <td> {machine.machineCode}</td>
                                    <td> {machine.machineLocation}</td>
                                    <td> {machine.dueFromDate} - {machine.dueTillDate}</td>
                                    <td> {machine.doneOnDate}</td>
                                    <td>
                                        <button onClick={() => editMachine(machine.id)} className="btn btn-info">Update </button>                                        
                                        <button style={{ marginLeft: "10px" }} onClick={() => viewMachine(machine.id)} className="btn btn-info">View </button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => deleteMachine(machine.id)} className="btn btn-danger">Delete </button>
                                    </td>
                                </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )    
}

export default ListMaintenanceMachineComponent;