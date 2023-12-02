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
    date.setMonth(date.getMonth() + 1); // This will automatically handle the December case
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const nextMonth = monthNames[date.getMonth()];
    const nextYear = date.getFullYear().toString().substring(2,4);

    return (
        <div>
            <br/>
            <h6 className="text-center">Monthly Preventive Maintenance Schedule ({area})</h6>
            
            <div className="text-end">
                <h6>Month: {nextMonth}'{nextYear}</h6>
                <h6>Format No. M/EM/FMT/PM/35</h6>
            </div>

            <div> 
                <table>
                    <thead>
                        <tr>
                            <th rowSpan="2" className="table-data" style={{ fontSize: '0.7rem', width: '2.5%' }}>S.No.</th>
                            <th rowSpan="2" className="table-data" style={{ fontSize: '0.7rem', width: '23%' }}>Equipment</th>
                            <th rowSpan="2" className="table-data" style={{ fontSize: '0.7rem', width: '15%' }}>Machine Code</th>
                            <th rowSpan="2" className="table-data" style={{ fontSize: '0.7rem', width: '15%' }}>Model/Sr.No.</th>
                            <th rowSpan="2" className="table-data" style={{ fontSize: '0.7rem', width: '15%' }}>Make </th>
                            <th colspan="2" className="table-data" style={{ fontSize: '0.7rem', width: '15%' }}>P.M. date</th>
                        </tr>
                        <tr>
                            <th className="table-data" style={{ fontSize: '0.7rem', width: '15%' }}>Due </th>
                            <th className="table-data" style={{ fontSize: '0.7rem'}}>Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            machines.map((machine, index) => {
                                // console.log("ID:", machine.id);

                                let formattedDueFromDate = '';
                                if(machine.dueFromDate){
                                    let dueFromDate = new Date(machine.dueFromDate);
                                    formattedDueFromDate = ('0' + dueFromDate.getUTCDate()).slice(-2) + '/' + ('0' + (dueFromDate.getUTCMonth()+1)).slice(-2)
                                    + '/' + dueFromDate.getUTCFullYear().toString().substring(2);
                                }

                                let formattedDueTillDate = '';
                                if(machine.dueTillDate){
                                    let dueTillDate = new Date(machine.dueTillDate);
                                    formattedDueTillDate = ('0' + dueTillDate.getUTCDate()).slice(-2) + '/' + ('0' + (dueTillDate.getUTCMonth()+1)).slice(-2)
                                    + '/' + dueTillDate.getUTCFullYear().toString().substring(2);
                                }

                                let pmSchedule = '';
                                if(machine.dueTillDate && machine.dueFromDate){
                                    pmSchedule = formattedDueFromDate + ' - ' + formattedDueTillDate;
                                }

                                // let doneOnDate = new Date(machine.doneOnDate);
                                // let currentMonth = new Date().getMonth();

                                // let formattedDoneOnDate = '';
                                // if (machine.doneOnDate && doneOnDate.getMonth() === currentMonth) {
                                //     formattedDoneOnDate = ('0' + doneOnDate.getUTCDate()).slice(-2) + '-' + ('0' + (doneOnDate.getUTCMonth()+1)).slice(-2)
                                //     + '-' + doneOnDate.getUTCFullYear().toString().substring(2);
                                // }

                                return(
                                    <tr key={machine.id} class='default-height'>
                                        <td className="table-data" style={{ fontSize: '0.6rem' }}> {index + 1} </td>
                                        <td className="table-data" style={{ fontSize: '0.6rem' }}>
                                            {machine.machineName.split('\n').map((line, index) => (<span key={index}>{line}<br/></span>))}</td>                                        
                                        <td className="table-data" style={{ fontSize: '0.6rem' }}> 
                                            {machine.machineCode.split('\n').map((line, index) => (<span key={index}>{line}<br/></span>))}</td>
                                        <td className="table-data" style={{ fontSize: '0.6rem' }}> 
                                            {machine.modelNo.split('\n').map((line, index) => (<span key={index}>{line}<br/></span>))}</td>
                                        <td className="table-data" style={{ fontSize: '0.6rem' }}> 
                                            {machine.make.split('\n').map((line, index) => (<span key={index}>{line}<br/></span>))}</td>

                                        <td className="table-data" style={{ fontSize: '0.6rem' }}>{pmSchedule}</td>
                                        <td className="table-data" style={{ fontSize: '0.6rem' }}></td>                                    
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