import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css'

import CalibrationMachineService from "../services/CalibrationMachineService"

function CreateCalibrationMachineComponent(){
    const {id, floor} = useParams();
    const navigate = useNavigate();
    const [machineName, setMachineName] = useState("");
    const [machineLocation, setMachineLocation] = useState("Reliability Lab");
    const [machineCode, setMachineCode] = useState("");
    const [taskFrequency, setTaskFrequency] = useState("");
    const [frequencyUnit, setFrequencyUnit] = useState("");
    const [lastDoneDate, setLastDoneDate] = useState("");
    const [nextDueDate, setNextDueDate] = useState("");
    const [doneOnDate, setDoneOnDate] = useState("");
    const [remarks, setRemarks] = useState("");
    const [refStd, setRefStd] = useState("");
    const [internalMc, setInternalMc] = useState("");

    useEffect(() => {
        if(id !== '_add'){
            CalibrationMachineService.getMachineById(id).then((res) => {
                setMachineName(res.data.machineName);
                setMachineCode(res.data.machineCode);
                setMachineLocation(res.data.machineLocation);
                setTaskFrequency(res.data.taskFrequency);
                setFrequencyUnit(res.data.frequencyUnit);
                setLastDoneDate(res.data.lastDoneDate);
                setNextDueDate(res.data.nextDueDate);
                setDoneOnDate(res.data.doneOnDate);
                setRemarks(res.data.remarks);
                setRefStd(res.data.refStd);
                setInternalMc(res.data.internalMc);
            });
        }
    }, [id]);

    const updateScheduleAsync = () => {
        return new Promise((resolve, reject) => {
            if (!taskFrequency || !frequencyUnit || !lastDoneDate) {
                resolve({
                    lastDoneDate: null,
                    nextDueDate: null
                });
                return;
            }
            const freq1 = parseInt(taskFrequency);
            const unit = frequencyUnit.toLowerCase();
            
            let date1 = new Date(lastDoneDate);
            let date2 = new Date(lastDoneDate);

            //-------------calculating nextDue from lastDone
            if (unit === "weeks") {
                date2.setDate(date2.getDate() + (freq1) * 7);
            } else if (unit === "days") {
                date2.setDate(date2.getDate() + (freq1));
            } else if (unit === "months") {
                date2.setMonth(date2.getMonth() + (freq1));
            }

            let dateBeforeTenDays = new Date(date2);
            dateBeforeTenDays.setDate(dateBeforeTenDays.getDate() - 10); // subtract 10 days from nextDueDate

            //-------------updating schedule if required
            if(doneOnDate){
                let doneOn = new Date(doneOnDate);
                // if(doneOn >= dateBeforeTenDays){
                    console.log("need to update schedule");
                    date1 = new Date(doneOn);
                    date2 = new Date(doneOn);
                    if (unit === "weeks") {
                        date2.setDate(date2.getDate() + freq1 * 7);
                    } else if (unit === "days") {
                        date2.setDate(date2.getDate() + freq1);
                    } else if (unit === "months") {
                        date2.setMonth(date2.getMonth() + freq1);
                    }
                    console.log("schedule updated");
                //}                
            }           

            resolve({
                lastDoneDate: date1.toISOString().split('T')[0],
                nextDueDate: date2.toISOString().split('T')[0]
            });
        });
    }

    const saveOrUpdateMachine = async (e) => {
        e.preventDefault();

        const dates = await updateScheduleAsync();
        setLastDoneDate(dates.lastDoneDate);
        setNextDueDate(dates.nextDueDate);

        let machineData = {machineName, machineCode, machineLocation,
        taskFrequency, frequencyUnit, lastDoneDate: dates.lastDoneDate,
        nextDueDate: dates.nextDueDate, doneOnDate, remarks, refStd, internalMc};

        console.log('machineData => ' + JSON.stringify(machineData));

        if(id === '_add'){
            await CalibrationMachineService.createMachine(machineData);
            window.confirm("Machine has been added successfully");
            navigate(`/root/calibrationMachines/${floor}`);
        } else {
            await CalibrationMachineService.updateMachine(machineData, id);
            window.confirm("Machine has been updated successfully");
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

    const changeFrequencyUnitHandler = (event) => {
        setFrequencyUnit(event.target.value);
        console.log("set unit to: " + event.target.value)
    }

    const changeLastDoneDateHandler = (event) => {
        setLastDoneDate(event.target.value);
        console.log("set lastDoneDate to: " + event.target.value);
    }

    const changeDoneOnDateHandler = (event) => {
        setDoneOnDate(event.target.value);
        console.log("set doneOnDate to: " + event.target.value)
    }

    const changeRemarksHandler = (event) => {
        setRemarks(event.target.value);
        console.log("set remarks to: " + event.target.value)
    }

    const changeInternalMcHandler = (event) => {
        setInternalMc(event.target.value);
        console.log("set internal mc to: " + event.target.value)
    }

    const changeRefStdHandler = (event) => {
        setRefStd(event.target.value);
        console.log("set internal mc to: " + event.target.value)
    }

    const goBack = () => {
        navigate(`/root/calibrationMachines/${floor}`);
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
                                    >   
                                        <option value="Reliability Lab">Reliability Lab</option>
                                        <option value="Ceramic Assembly Line">Ceramic Assembly Line</option>
                                        <option value="SMx Line">SMx Line</option>
                                        <option value="Testing Top Floor">Testing Top Floor</option>
                                        <option value="DTA">DTA</option>
                                        <option value="EHTP">EHTP</option>
                                        <option value="Testing Ground Floor">Testing Ground Floor</option>
                                    </select>
                                    <br></br>  
                                    <label>Add Remarks: </label>
                                    <textarea placeholder="Remarks.." name="remarks" className="form-control"
                                        value={remarks} onChange={changeRemarksHandler} />
                                    <br></br>   
                                    <label>Internal Mc.</label>       
                                    <textarea placeholder="internal machine" name="internalMc" className="form-control"
                                        value={internalMc} onChange={changeInternalMcHandler} />    
                                    <br></br> 
                                    <label>Ref. Std.</label>           
                                    <textarea placeholder="ref. std." name="refStd" className="form-control"
                                        value={refStd} onChange={changeRefStdHandler} />    
                                    <br></br>   
                                </div>

                                <div className="form-group col-md-4">
                                    <label> Task Frequency: </label>
                                    <div className="d-flex align-items-center">
                                        <input type="number" placeholder="Frequency" name="taskFrequency" className="form-control"
                                            value={taskFrequency} onChange={changeTaskFrequencyHandler}/>
                                        {/* <label style={{ marginLeft: "10px"}}>To </label>
                                        <input type="number" placeholder="Frequency2" name="taskFrequency2" className="form-control"
                                            value={taskFrequency2} onChange={changeTaskFrequency2Handler}/>   */}
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
                                    <label> Last Done: </label>
                                    <input type="date" placeholder="Last Done Date" name="lastDoneDate" className="form-control"
                                        value={lastDoneDate} onChange={changeLastDoneDateHandler} />                                    
                                    <br></br>
                                    <label> Next Due: </label>
                                    <input type="date" placeholder="Next Due Date" name="nextDueDate" className="form-control"
                                        value={nextDueDate} disabled />
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCalibrationMachineComponent;