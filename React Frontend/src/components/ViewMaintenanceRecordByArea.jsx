import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './styles.css'


import MaintenanceMachineService from '../services/MaintenanceMachineService';

function ViewMaintenanceRecordByArea(){
    const {area} = useParams();
    const[machines, setMachines] = useState([]);

    // useEffect(() => {
    //     fetchMachinesByArea();
    // }, []);

    useEffect(() => {
        if(area !== "ALL"){
            fetchMachinesByArea(area)
        } else {
            fetchAllMachines();
        }
    }, [area]);

    const fetchMachinesByArea = (area) => {
        MaintenanceMachineService.getMachinesByArea(area).then((res) => {
            setMachines(res.data);
        });
    };

    const fetchAllMachines = () => {
        MaintenanceMachineService.getMachines().then((res) => {
        setMachines(res.data);
        });
    };

    const date = new Date();
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const currMonth = monthNames[date.getMonth()];
    const currYear = date.getFullYear().toString().substring(2,4);    

    return (
        <div>
            <h5 className="text-center">Monthly Preventive Maintenance Schedule ({area})</h5>
            
            <div className="row text-end">
                <h7>Months: {currMonth}'{currYear}</h7>
                <h7>Format No. M/EM/FMT/PM/35</h7>
            </div>

            <div className="row">
                <table className="table table-bordered">
                    <thead>
                        {/* <tr>
                            <th style={{ textAlign: 'center', fontSize: '0.8rem', width: '4%', }} colSpan="1" rowSpan="2"> S.No.</th>
                            <th style={{ textAlign: 'center', fontSize: '0.8rem', }} colSpan="1" rowSpan="2"> Name</th>
                            <th style={{ textAlign: 'center', fontSize: '0.8rem', }} colSpan="1" rowSpan="2"> Machine Code</th>
                            <th style={{ textAlign: 'center', fontSize: '0.8rem', }} colSpan="1" rowSpan="2"> Model/Sr.No.</th>
                            <th style={{ textAlign: 'center', fontSize: '0.8rem', }} colSpan="1" rowSpan="2"> Make </th>
                            <th style={{ textAlign: 'center', fontSize: '0.8rem', }} colspan="2"> PM date </th>
                        </tr>
                        <tr>
                            <th style={{ textAlign: 'center', fontSize: '0.8rem', width: '15%', }}> Due </th>
                            <th style={{ textAlign: 'center', fontSize: '0.8rem', }}> Done On </th>
                        </tr> */}
                        <tr>
                            <th style={{ textAlign: 'center', fontSize: '0.8rem', width: '3%' }}>S.No.</th>
                            <th style={{ textAlign: 'center', fontSize: '0.8rem', width: '20%' }}>Equipment</th>
                            <th style={{ textAlign: 'center', fontSize: '0.8rem', width: '12%' }}>Machine Code</th>
                            <th style={{ textAlign: 'center', fontSize: '0.8rem', width: '12%' }}>Model/Sr.No.</th>
                            <th style={{ textAlign: 'center', fontSize: '0.8rem', width: '20%' }}>Make </th>
                            <th style={{ textAlign: 'center', fontSize: '0.8rem' }}>Due </th>
                            <th style={{ textAlign: 'center', fontSize: '0.8rem', width: '10%' }}>Done On </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            machines.map((machine, index) => {
                                console.log("ID:", machine.id);
                                return(
                                    <tr key={machine.id}>
                                        <td style={{ textAlign: 'center', fontSize: '0.8rem' }}> {index + 1} </td>
                                        <td style={{ textAlign: 'center', fontSize: '0.8rem' }}> {machine.machineName} </td>
                                        <td style={{ textAlign: 'center', fontSize: '0.8rem' }}> {machine.machineCode}</td>
                                        <td style={{ textAlign: 'center', fontSize: '0.8rem' }}> {machine.modelNo}</td>
                                        <td style={{ textAlign: 'center', fontSize: '0.8rem' }}> {machine.make}</td>
                                        <td style={{ textAlign: 'center', fontSize: '0.8rem' }}> {machine.dueFromDate} - {machine.dueTillDate}</td>
                                        <td style={{ textAlign: 'center', fontSize: '0.8rem' }}> {machine.doneOnDate}</td>                                    
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

export default ViewMaintenanceRecordByArea;