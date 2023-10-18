import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

import MaintenanceMachineService from '../services/MaintenanceMachineService';

function ViewMaintenanceRecordComponent(){
    // const navigate = useNavigate();
    const[machines, setMachines] = useState([]);
    // const[area1Machines, setArea1Machines] = useState([]);

    useEffect(() => {
        fetchMachines();
    }, []);

    const fetchMachines = () => {
        MaintenanceMachineService.getMachines().then((res) => {
        setMachines(res.data);
        });
    };

    // const fetchArea1Machines = () => {
    //     MaintenanceMachineService.getMachinesByArea("AREA1").then((res) => {
    //         setArea1Machines(res.data);
    //     });
    // };

    const date = new Date();
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const currMonth = monthNames[date.getMonth()];
    const currYear = date.getFullYear().toString().substring(2,4);

    return (
        <div>
            <h4 className="text-center">Monthly Preventive Maintenance Schedule (DTA)</h4>
            
            <div className="row text-end">
                <h6>Months: {currMonth}'{currYear}</h6>
                <h6>Format No. M/EM/FMT/PM/35</h6>
            </div>

            <div className="row">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th> Name</th>
                            <th> Machine Code</th>
                            <th> Model/Sr.No.</th>
                            <th> Make </th>
                            <th> Due </th>
                            <th> Done On </th>
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
                                    <td> {machine.modelNo}</td>
                                    <td> {machine.make}</td>
                                    <td> {machine.dueFromDate} - {machine.dueTillDate}</td>
                                    <td> {machine.doneOnDate}</td>                                    
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

export default ViewMaintenanceRecordComponent;