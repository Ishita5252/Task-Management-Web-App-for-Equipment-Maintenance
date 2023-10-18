import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MaintenanceMachineService from '../services/MaintenanceMachineService';

function ListMaintenanceMachineComponent(){
    const navigate = useNavigate();
    const[machines, setMachines] = useState([]);
    const[selectedArea, setSelectedArea] = useState('ALL');

    useEffect(() => {
        fetchMachines();
    }, []);

    const fetchMachines = () => {
        MaintenanceMachineService.getMachines().then((res) => {
        setMachines(res.data);
        });
    };

    const deleteMachine = (id) => {
    if (window.confirm("Are you sure you want to delete this machine?")) {
        MaintenanceMachineService.deleteMachine(id).then(() => {
            setMachines(machines.filter(machine => machine.id !== id));
        });
    }
}

    // const viewMachine = (id) => {
    //     navigate(`/maintenanceMachine/view-maintenance-machine/${id}`);
    // }

    const editMachine = (id) => {
        navigate(`/maintenanceMachine/add-maintenance-machine/${id}`);
    }

    const addMachine = () => {
        navigate(`/maintenanceMachine/add-maintenance-machine/_add`);
    }

    const viewRecordByArea = (area) => {
        navigate(`/maintenanceMachine/view-record/${area}`)
    }

    const home = () => {
        navigate(`/`);
    }

    const handleAreaChange = (event) => {
        const area = event.target.value;
        setSelectedArea(area);
        if (area !== 'ALL') {
            MaintenanceMachineService.getMachinesByArea(area).then((res) => {
            setMachines(res.data);
            });
        } else {
            fetchMachines();
        }
    }

    return (
        <div>
            <h2 className="text-center">Equipment List</h2>

            <div className="row">
                <div className="col d-flex align-items-center">
                    <button className="btn btn-primary mr-2" onClick={home}>Home</button>
                </div>
                <div className="col d-flex justify-content-end align-items-center">
                    <div className="form-group">
                        {/* <label htmlFor="areaDropdown">Select Area:</label> */}
                        <select
                            id="areaDropdown"
                            className="form-control"
                            value={selectedArea}
                            onChange={handleAreaChange}
                        >
                            <option value="ALL">All Areas</option>
                            <option value="Reliability Lab">Reliability Lab</option>
                            <option value="Ceramic Assembly Line">Ceramic Assembly Line</option>
                            <option value="Testing Area">Testing Area</option>
                            <option value="SMx Line">SMx Line</option>
                            {/* Add more options for different areas */}
                        </select>
                    </div>
                    <button className="btn btn-primary mr-2" onClick={addMachine} style={{ marginLeft: "10px" }}>Add Machine</button>
                    <button className="btn btn-primary mr-2" onClick={() => viewRecordByArea(selectedArea)} style={{ marginLeft: "10px" }}>View Record</button>
                </div>
            </div>
            <br></br>


            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th style={{width:'15%'}}> Name</th>
                            <th style={{width:'12%'}}> Code</th>
                            <th style={{width:'7%'}}> Location </th>
                            <th style={{width:'10%'}}> Frequency</th>
                            <th> Due </th>
                            <th style={{width:'10%'}}> Done On </th>
                            <th> Status </th>
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
                                    <td> {machine.taskFrequency}-{machine.taskFrequency2} {machine.frequencyUnit}</td>
                                    <td> {machine.dueFromDate} - {machine.dueTillDate}</td>
                                    <td> {machine.doneOnDate}</td>
                                    <td style={{ color: machine.status === 'PENDING' ? 'orange' : machine.status === 'OVERDUE' 
                                        ? 'red' : 'grey', fontSize: '12px', fontWeight: 'bold' }}> {machine.status} </td>
                                    <td>
                                        <button onClick={() => editMachine(machine.id)} className="btn btn-info">Update / View </button>                                        
                                        {/* <button style={{ marginLeft: "10px" }} onClick={() => viewMachine(machine.id)} className="btn btn-info">View </button> */}
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