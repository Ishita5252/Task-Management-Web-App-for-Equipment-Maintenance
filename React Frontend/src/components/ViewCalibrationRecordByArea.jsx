import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'


import CalibrationMachineService from '../services/CalibrationMachineService';

function ViewCalibrationRecordByArea(){
    const {area} = useParams();
    const[machines, setMachines] = useState([]);

    useEffect(() => {
        fetchMachinesByArea(area)    
    }, [area]);

    const fetchMachinesByArea = (area) => {
        if(area === "top_floor" || area === "ground_floor"){
            CalibrationMachineService.getMachinesByFloor(area).then((res) => {
                setMachines(res.data);
            });
        }
        else{
            CalibrationMachineService.getMachinesByArea(area).then((res) => {
                setMachines(res.data);
            });
        }        
    };

    const date = new Date();
    date.setMonth(date.getMonth() + 1); // This will automatically handle the December case
    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", 
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const nextMonth = monthNames[date.getMonth()];
    const nextYear = date.getFullYear().toString().substring(2,4); 
    const displayed_area = (area) => {
        if(area === "top_floor") return "Top Floor";
        else if(area === "ground_floor") return "Ground Floor";
        else return area;
    }   

    return (
        <div>
            <br/>

            <p className="text-end" style={{fontSize:"0.7rem",lineHeight: '0.6'}}>Ref.Doc.No. : M/EM/QSP/01</p>
            <p className="text-end" style={{fontSize:"0.7rem",lineHeight: '0.6'}}>Format No. : M/EM/FMT/CL/02</p>

            <h6 className="text-center">Master List Of Monitoring & Measuring Device With Calibration Schedule</h6>
            <h6 className="text-center">({displayed_area(area)})</h6>
            <h6 className="text-end">{nextMonth}'{nextYear}</h6>
            

            <div>
                <table>
                    <thead>
                        <tr>
                            <th className='table-data' style={{ fontSize: '0.7rem', width: '2%' }}>S.No.</th>
                            <th className='table-data' style={{ fontSize: '0.7rem', width: '15%'  }}>Instrument Name</th>
                            <th className='table-data' style={{ fontSize: '0.7rem', width: '15%'  }}>Internal M/C No.</th>
                            <th className='table-data' style={{ fontSize: '0.7rem', width: '10%' }}>Instrument Code</th>
                            <th className='table-data' style={{ fontSize: '0.7rem', width: '10%' }}>Ref. Std.</th>
                            <th className='table-data' style={{ fontSize: '0.7rem', width: '7%' }}>Frequency</th>
                            <th className='table-data' style={{ fontSize: '0.7rem', width: '7%' }}>Last Done</th>
                            <th className='table-data' style={{ fontSize: '0.7rem', width: '7%' }}>Next Due</th>
                            <th className='table-data' style={{ fontSize: '0.7rem', width: '7%' }}>Done</th>
                            <th className='table-data' style={{ fontSize: '0.7rem', width: '10%' }}>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            machines.map((machine, index) => {
                                // console.log("ID:", machine.id);

                                let formattedLastDoneDate = '';
                                if(machine.lastDoneDate){
                                    let lastDoneDate = new Date(machine.lastDoneDate);
                                    formattedLastDoneDate = ('0' + lastDoneDate.getUTCDate()).slice(-2) + '-' + ('0' + (lastDoneDate.getUTCMonth()+1)).slice(-2)
                                    + '-' + lastDoneDate.getUTCFullYear().toString().substring(2);
                                }
                                
                                let formattedNextDueDate = '';
                                if(machine.nextDueDate){
                                    let nextDueDate = new Date(machine.nextDueDate);
                                    formattedNextDueDate = ('0' + nextDueDate.getUTCDate()).slice(-2) + '-' + ('0' + (nextDueDate.getUTCMonth()+1)).slice(-2)
                                    + '-' + nextDueDate.getUTCFullYear().toString().substring(2);
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
                                        <td className='table-data' style={{ fontSize: '0.6rem' }}> {index + 1} </td>
                                        <td className='table-data' style={{ fontSize: '0.6rem' }}> 
                                            {machine.machineName.split('\n').map((line, index) => (<span key={index}>{line}<br/></span>))} 
                                        </td>
                                        <td className='table-data' style={{ fontSize: '0.6rem' }}> 
                                            {machine.internalMc.split('\n').map((line, index) => (<span key={index}>{line}<br/></span>))}</td>
                                        <td className='table-data' style={{ fontSize: '0.6rem' }}> 
                                            {machine.machineCode.split('\n').map((line, index) => (<span key={index}>{line}<br/></span>))}</td>
                                        <td className='table-data' style={{ fontSize: '0.6rem' }}> 
                                            {machine.refStd.split('\n').map((line, index) => (<span key={index}>{line}<br/></span>))}</td>
                                        <td className='table-data' style={{ fontSize: '0.6rem' }}> {machine.taskFrequency} {machine.frequencyUnit}</td>
                                        <td className='table-data' style={{ fontSize: '0.6rem' }}> {formattedLastDoneDate}</td>
                                        <td className='table-data' style={{ fontSize: '0.6rem' }}> {formattedNextDueDate}</td>
                                        <td className='table-data' style={{ fontSize: '0.6rem' }}></td>
                                        <td className='table-data' style={{ fontSize: '0.6rem' }}> 
                                            {machine.remarks.split('\n').map((line, index) => (<span key={index}>{line}<br/></span>))}</td>                                   
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

export default ViewCalibrationRecordByArea;