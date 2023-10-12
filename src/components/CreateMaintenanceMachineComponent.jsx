import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import MaintenanceMachineService from "../services/MaintenanceMachineService";

function CreateMaintenanceMachineComponent(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [machineName, setMachineName] = useState("");
    const [machineLocation, setMachineLocation] = useState("");
    const [machineCode, setMachineCode] = useState("");
    const [dueFromDate, setDueFromDate] = useState("");
    const [dueTillDate, setDueTillDate] = useState("");
    const [doneOnDate, setDoneOnDate] = useState("");

    useEffect(() => {
        if(id !== '_add'){
            MaintenanceMachineService.getMachineById(id).then((res) => {
                setMachineName(res.data.machineName);
                setMachineCode(res.data.machineCode);
                setMachineLocation(res.data.machineLocation);
                setDueFromDate(res.data.dueFromDate);
                setDueTillDate(res.data.dueTillDate);
                setDoneOnDate(res.data.dueOnDate);
            });
        }
    }, [id]);

    const saveOrUpdateMachine = (e) => {
        e.preventDefault();
        let machineData = {machineName, machineCode, machineLocation,
        dueFromDate, dueTillDate, doneOnDate};

        console.log('machineData => ' + JSON.stringify(machineData));

        if(id === '_add'){
            MaintenanceMachineService.createMachine(machineData).then(() => {
                navigate('/maintenanceMachines');
            });
        } else {
            MaintenanceMachineService.updateMachine(machineData, id).then(() => {
                navigate('/maintenanceMachines')
            });
        }
    }

    const changeMachineNameHandler = (event) => {
        setMachineName(event.target.value);
    }

    const changeMachineCodeHandler = (event) => {
        setMachineCode(event.target.value);
    }

    const changeMachineLocationHandler = (event) => {
        setMachineLocation(event.target.value);
    }

    const changeDueFromDateHandler = (event) => {
        setDueFromDate(event.target.value);
    }

    const changeDueTillDateHandler = (event) => {
        setDueTillDate(event.target.value);
    }

    const cancel = () => {
        navigate('/maintenanceMachines');
    }

    const changeDoneOnDateHandler = (event) => {
        setDoneOnDate(event.target.value);
    }

    const getTitle = () => {
        if(id === '_add') {
            return <h3 className="text-center">Add Machine</h3>
        } else {
            return <h3 className="text-center">Update Machine</h3>
        }
    }

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {getTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Machine Name: </label>
                                    <input placeholder="Machine Name" name="machineName" className="form-control"
                                        value={machineName} onChange={changeMachineNameHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Machine Code: </label>
                                    <input placeholder="Machine Code" name="machineCode" className="form-control"
                                        value={machineCode} onChange={changeMachineCodeHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Location: </label>
                                    <input placeholder="Machine Location" name="machineLocation" className="form-control"
                                        value={machineLocation} onChange={changeMachineLocationHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Due From: </label>
                                    <input type="date" placeholder="Due From Date" name="dueFromDate" className="form-control"
                                        value={dueFromDate} onChange={changeDueFromDateHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Due Till: </label>
                                    <input type="date" placeholder="Due Till Date" name="dueTillDate" className="form-control"
                                        value={dueTillDate} onChange={changeDueTillDateHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Done On: </label>
                                    <input type="date" placeholder="Done On Date" name="doneOnDate" className="form-control"
                                        value={doneOnDate} onChange={changeDoneOnDateHandler} />
                                </div>

                                <button className="btn btn-success" onClick={saveOrUpdateMachine}>Save</button>
                                <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateMaintenanceMachineComponent;