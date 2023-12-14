import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';

import MaintenanceMachineService from '../services/MaintenanceMachineService';
import ExcelGeneratorInstance from '../services/ExcelGenerator';

function ListMaintenanceMachineComponent(){
    const navigate = useNavigate();
    const { floor } = useParams();
    const[machines, setMachines] = useState([]);    
    const[selectedArea, setSelectedArea] = useState(floor);    

    const fetchMachines = useCallback(() => {
        MaintenanceMachineService.getMachinesByFloor(floor).then((res) => {
            setMachines(res.data);
        });
    }, [floor]);

    useEffect(() => {
        fetchMachines();
    }, [fetchMachines]);

    const deleteMachine = (id) => {
        if (window.confirm("Are you sure you want to delete this machine?")) {
            MaintenanceMachineService.deleteMachine(id).then(() => {
                setMachines(machines.filter(machine => machine.id !== id));
            });
        }
    }


    const editMachine = (id) => {
        navigate(`/root/maintenanceMachine/add-maintenance-machine/${id}/${floor}`);
    }

    const addMachine = () => {
        navigate(`/root/maintenanceMachine/add-maintenance-machine/_add/${floor}`);
    }

    const generateScheduleExcel = (floor) => {
        ExcelGeneratorInstance.generateExcelMaintenance(floor);
    }

    const viewRecordByArea = (area) => {
        generateScheduleExcel(floor);
        navigate(`/root/maintenanceMachine/view-record/${area}`)
    }    

    const home = () => {
        navigate(`/root/`);
    }

    const handleAreaChange = (event) => {
        const area = event.target.value;
        setSelectedArea(area);
        if (area !== floor) {
            MaintenanceMachineService.getMachinesByArea(area).then((res) => {
            setMachines(res.data);
            });
        } else {
            fetchMachines();
        }
    }

    const displayed_floor = floor === "top_floor" ? "Top Floor" : "Ground Floor";

    return (
        <div>
            <br></br>
            <h2 className="text-center">Equipment List for Maintenance - {displayed_floor}</h2>
            <br></br>

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
                            {floor === "top_floor" ? (
                                <>
                                    <option value="top_floor">All</option>
                                    <option value="Reliability Lab">Reliability Lab</option>
                                    <option value="Ceramic Assembly Line">Ceramic Assembly Line</option>
                                    <option value="SMx Line">SMx Line</option>
                                    <option value="Testing Top Floor">Testing Top Floor</option>
                                </>
                            ) : (
                                <>
                                    <option value="ground_floor">All</option>
                                    <option value="DTA">DTA</option>
                                    <option value="EHTP">EHTP</option>
                                    <option value="Testing Ground Floor">Testing Ground Floor</option>
                                </>
                            )}                            
                        </select>
                    </div>
                    <button className="btn btn-primary mr-2" onClick={addMachine} style={{ marginLeft: "10px" }}>Add Machine</button>
                    <button className="btn btn-primary mr-2" onClick={() => viewRecordByArea(selectedArea)} style={{ marginLeft: "10px" }}>Generate Schedule</button>
                    {/*<button className="btn btn-primary mr-2" onClick={() => generateScheduleExcel(floor)} style={{ marginLeft: "10px" }}>Generate Schedule</button>*/}
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
                                    <td>{machine.machineName.split('\n').map((line, index) => (<span key={index}>{line}<br/></span>))}</td>
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