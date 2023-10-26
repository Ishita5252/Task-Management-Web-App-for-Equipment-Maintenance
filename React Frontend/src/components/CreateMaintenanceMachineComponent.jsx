import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css'

import MaintenanceMachineService from "../services/MaintenanceMachineService";

function CreateMaintenanceMachineComponent(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [machineName, setMachineName] = useState("");
    const [machineLocation, setMachineLocation] = useState("Reliability Lab");
    const [machineCode, setMachineCode] = useState("");
    const [taskFrequency, setTaskFrequency] = useState("");
    const [taskFrequency2, setTaskFrequency2] = useState("");
    const [frequencyUnit, setFrequencyUnit] = useState("");
    const [dueFromDate, setDueFromDate] = useState("");
    const [dueTillDate, setDueTillDate] = useState("");
    const [doneOnDate, setDoneOnDate] = useState("");
    const [remarks, setRemarks] = useState("");
    const [modelNo, setModelNo] = useState("");
    const [make, setMake] = useState("");

    useEffect(() => {
        if(id !== '_add'){
            MaintenanceMachineService.getMachineById(id).then((res) => {
                setMachineName(res.data.machineName);
                setMachineCode(res.data.machineCode);
                setMachineLocation(res.data.machineLocation);
                setTaskFrequency(res.data.taskFrequency);
                setTaskFrequency2(res.data.taskFrequency2);
                setFrequencyUnit(res.data.frequencyUnit);
                setDueFromDate(res.data.dueFromDate);
                setDueTillDate(res.data.dueTillDate);
                setDoneOnDate(res.data.doneOnDate);
                setRemarks(res.data.remarks);
                setModelNo(res.data.modelNo);
                setMake(res.data.make);
            });
        }
    }, [id]);

    const updateScheduleAsync = () => {
        return new Promise((resolve, reject) => {
            const freq1 = parseInt(taskFrequency);
            const freq2 = parseInt(taskFrequency2);
            const unit = frequencyUnit.toLowerCase();
            
            let date1 = new Date(dueFromDate);
            let date2 = new Date(dueFromDate);
            //-------------calculating dueTill from dueFrom
            if (unit === "weeks") {
                date2.setDate(date2.getDate() + (freq2 - freq1) * 7);
            } else if (unit === "days") {
                date2.setDate(date2.getDate() + (freq2 - freq1));
            } else if (unit === "months") {
                date2.setMonth(date2.getMonth() + (freq2 - freq1));
            }

            //-------------updating schedule if required
            if(doneOnDate && dueFromDate && dueTillDate && frequencyUnit && dueFromDate <= doneOnDate){
                console.log("need to update schedule");
                if (unit === "weeks") {
                    date1.setDate(date1.getDate() + freq1 * 7);
                    date2.setDate(date2.getDate() + freq1 * 7);
                } else if (unit === "days") {
                    date1.setDate(date1.getDate() + freq1);
                    date2.setDate(date2.getDate() + freq1);
                } else if (unit === "months") {
                    date1.setMonth(date1.getMonth() + freq1);
                    date2.setMonth(date2.getMonth() + freq1);
                }
                console.log("schedule updated");
            }           

            resolve({
                dueFromDate: date1.toISOString().split('T')[0],
                dueTillDate: date2.toISOString().split('T')[0]
            });
        });
    }

    const saveOrUpdateMachine = async (e) => {
        e.preventDefault();

        const dates = await updateScheduleAsync();
        setDueFromDate(dates.dueFromDate);
        setDueTillDate(dates.dueTillDate);

        let machineData = {machineName, machineCode, machineLocation, 
        taskFrequency, taskFrequency2, frequencyUnit,
        dueFromDate: dates.dueFromDate, dueTillDate: dates.dueTillDate, doneOnDate,
        remarks, modelNo, make};

        console.log('machineData => ' + JSON.stringify(machineData));

        if(id === '_add'){
            await MaintenanceMachineService.createMachine(machineData);
            window.confirm("Machine has been added successfully");
            navigate('/maintenanceMachines');
        } else {
            await MaintenanceMachineService.updateMachine(machineData, id);
            window.confirm("Machine has been updated successfully");
            // navigate('/maintenanceMachines');
        }        
    }    

    const changeMachineNameHandler = (event) => {
        setMachineName(event.target.value);
        console.log("set name to: " + event.target.value)
    }

    const changeMachineCodeHandler = (event) => {
        setMachineCode(event.target.value);
        console.log("set code to: " + event.target.value)
    }

    const changeMachineLocationHandler = (event) => {
        setMachineLocation(event.target.value);
        console.log("set location to: " + event.target.value)
    }

    const changeTaskFrequencyHandler = (event) => {
        setTaskFrequency(event.target.value);
        console.log("set freq to: " + event.target.value)
    }
    const changeTaskFrequency2Handler = (event) => {
        setTaskFrequency2(event.target.value);
        console.log("set freq2 to: " + event.target.value)
    }

    const changeFrequencyUnitHandler = (event) => {
        setFrequencyUnit(event.target.value);
        console.log("set unit to: " + event.target.value)
    }

    const changeDueFromDateHandler = (event) => {
        setDueFromDate(event.target.value);
        console.log("set dueFromDate to: " + event.target.value);        
    }

    // const changeDueTillDateHandler = (event) => {
    //     setDueTillDate(event.target.value);
    //     console.log("set dueTillDate to: " + event.target.value)
    // }

    const changeDoneOnDateHandler = (event) => {
        setDoneOnDate(event.target.value);
        console.log("set doneOnDate to: " + event.target.value)
    }

    const changeRemarksHandler = (event) => {
        setRemarks(event.target.value);
        console.log("set remarks to: " + event.target.value)
    }

    const changeModelNoHandler = (event) => {
        setModelNo(event.target.value);
        console.log("set model no. to: " + event.target.value)
    }

    const changeMakeHandler = (event) => {
        setMake(event.target.value);
        console.log("set make to: " + event.target.value)
    }

    const goBack = () => {
        navigate('/maintenanceMachines');
    }

    const getTitle = () => {
        if(id === '_add') {
            return <h3 className="text-center">Add Machine</h3>
        } else {
            return <h3 className="text-center">Update Machine</h3>
        }
    }

    return (
        <div className="container">
            <div className="row center-form">
                <div className="card col-md-8">
                    {getTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-row d-flex">

                                <div className="form-group col-md-8" style={{ marginRight: "20px" }}>
                                    <label> Machine Name: </label>
                                    <textarea placeholder="Machine Name" name="machineName" className="form-control"
                                        value={machineName} onChange={changeMachineNameHandler} />
                                    <br></br>                                    
                                    <label> Machine Code: </label>
                                    <textarea placeholder="Machine Code" name="machineCode" className="form-control"
                                        value={machineCode} onChange={changeMachineCodeHandler} />
                                    <br></br>
                                    <label htmlFor="areaDropdown">Select Area:</label>
                                    <select
                                        id="areaDropdown" className="form-control"
                                        value={machineLocation} onChange={changeMachineLocationHandler}
                                    >   <option value="Reliability Lab">Reliability Lab</option>
                                        <option value="Ceramic Assembly Line">Ceramic Assembly Line</option>
                                        <option value="Testing Area">Testing Area</option>
                                        <option value="SMx Line">SMx Line</option>                            
                                    </select>
                                    <br></br>  
                                    <label>Add Remarks: </label>
                                    <textarea placeholder="Remarks.." name="remarks" className="form-control"
                                        value={remarks} onChange={changeRemarksHandler} />
                                    <br></br>   
                                    <label>Model/Sr No.</label>       
                                    <textarea placeholder="model no." name="modelNO" className="form-control"
                                        value={modelNo} onChange={changeModelNoHandler} />    
                                    <br></br> 
                                    <label>Make</label>           
                                    <input placeholder="make" name="make" className="form-control"
                                        value={make} onChange={changeMakeHandler} />    
                                    <br></br>   
                                </div>

                                <div className="form-group col-md-4">
                                    <label> Task Frequency: </label>
                                    <div className="d-flex align-items-center">
                                        <input type="number" placeholder="Frequency" name="taskFrequency" className="form-control"
                                            value={taskFrequency} onChange={changeTaskFrequencyHandler}/>
                                        <label style={{ marginLeft: "10px"}}>To </label>
                                        <input type="number" placeholder="Frequency2" name="taskFrequency2" className="form-control"
                                            value={taskFrequency2} onChange={changeTaskFrequency2Handler}/>  
                                    </div>  
                                    <br></br>
                                    <select
                                        id="freqUnitDropdown" className="form-control"
                                        value={frequencyUnit} onChange={changeFrequencyUnitHandler}
                                    >   <option value="">Select Unit</option>
                                        <option value="months">Months</option>
                                        <option value="weeks">Weeks</option>
                                        <option value="days">Days</option>
                                    </select>   
                                     <br></br>                                  
                                    <label> Due From: </label>
                                    <input type="date" placeholder="Due From Date" name="dueFromDate" className="form-control"
                                        value={dueFromDate} onChange={changeDueFromDateHandler} />                                    
                                    <br></br>
                                    <label> Due Till: </label>
                                    <input type="date" placeholder="Due Till Date" name="dueTillDate" className="form-control"
                                        value={dueTillDate} disabled />
                                    <br></br>
                                    <label> Done On: </label>
                                    <input type="date" placeholder="Done On Date" name="doneOnDate" className="form-control"
                                        value={doneOnDate} onChange={changeDoneOnDateHandler} />  
                                    <br></br>  
                                    <div className="form-row">
                                        <button className="btn btn-info" onClick={goBack}> Go Back </button>
                                        <button className="btn btn-success" onClick={saveOrUpdateMachine} style={{ marginLeft: "10px" }}>Save</button>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="form-row">
                                <button className="btn btn-info" onClick={goBack}> Go Back </button>
                                <button className="btn btn-success" onClick={saveOrUpdateMachine} style={{ marginLeft: "10px" }}>Save</button>
                            </div> */}
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateMaintenanceMachineComponent;