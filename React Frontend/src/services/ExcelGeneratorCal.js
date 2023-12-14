import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import CalibrationMachineService from './CalibrationMachineService';

class ExcelGeneratorCal {

  getMachineData(machines) {
    if (!Array.isArray(machines)) {
      console.error('Invalid machines data:', machines);
      return [];
    }

    const data = [
      ["S.No.", "Instrument Name", "Internal M/C No.", "Instrument Code", "Ref. Std.", "Frequency", 
        "Last Done", "Next Due", "Done On", "Remarks"],
      ...machines.map((machine, index) => {
        const { machineName, internalMc, machineCode, refStd, taskFrequency, frequencyUnit, 
            lastDoneDate, nextDueDate, remarks } = machine;

        // const formatDateString = (date) => (date ? new Date(date).toLocaleDateString() : '');
        const formatDateString = (date) => {
          if (date) {
            let d = new Date(date);
            return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear().toString().substr(-2)}`;
          } else {
            return '';
          }
        };

        return [
          index + 1,
          machineName,
          internalMc,
          machineCode,
          refStd,
          `${taskFrequency} ${frequencyUnit}`,
          `${formatDateString(lastDoneDate)}`,
          `${formatDateString(nextDueDate)}`,
          '',
          remarks
        ];
      }),
    ];
    return data;
  }

  generateExcelMaintenance = async (floor) => {
    // Create a new workbook
    const wb = new ExcelJS.Workbook();

    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const nextMonth = monthNames[date.getMonth()];
    const nextYear = date.getFullYear().toString().substring(2,4);

    let areas;
    if(floor === "top_floor"){
      areas = ["Reliability Lab", "Ceramic Assembly Line", "SMx Line", "Testing Top Floor"];
    } else if(floor === "ground_floor"){
      areas = ["DTA", "EHTP", "Testing Ground Floor"];
    } else{
      console.error('Invalid floor: ', floor);
      return;
    }

    for(let area of areas){
      const response = await CalibrationMachineService.getMachinesByArea(area);
      const machines = response.data;
      if (!machines || machines.length === 0) {
        console.error(`No machines data to generate Excel for ${area}.`);
        continue;
      }

      const data = this.getMachineData(machines);
      const ws = wb.addWorksheet(`${area}`);

      // Add data to worksheet
      ws.addRows(data);
      
      //-----------------------------------------HEADING AND DESCRIPTION------------------------------------------------------------------
      // Add Description
      ws.spliceRows(1, 0, []);
      ws.spliceRows(2, 0, []);

      ws.mergeCells('G1:J1'); ws.getCell('G1').value = `Ref. Doc. No. : M/EM/QSP/01`;
      ws.mergeCells('G2:J2'); ws.getCell('G2').value = 'Format. No. : M/EM/FMT/CL/02';

      // Style the Description
      const desc_style = {
        font: {bold: true, size:12},
        alignment: {vertical: 'middle', horizontal: 'right'}
      };
      ws.getCell('G1').style = desc_style;
      ws.getCell('G2').style = desc_style;

      // Add the heading
      ws.spliceRows(3, 0, [`Master List Of Monitoring & Measuring Device With Calibration Schedule            ${nextMonth}' ${nextYear}`]);
      ws.mergeCells('A3:J3');
      ws.getRow(3).height = 30;
      ws.getCell('A3').font = {bold: true, size: 16};
      ws.getCell('A3').alignment = { vertical: 'middle', horizontal: 'center' };

      ws.spliceRows(4, 0, [`(${area})`]);
      ws.mergeCells('A4:J4');
      ws.getCell('A4').font = {bold: true, size: 14};
      ws.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' };
      ws.spliceRows(5, 0, []);

      //------------------------------------------TABLE STYLES--------------------------------------------------------------------
      //header: 
      ws.getRow(6).font = {bold: true, size: 12}; ws.getRow(6).font = {bold: true, size: 12};

      //table body:
      ws.eachRow({ includeEmpty: true }, function(row, rowNumber) {
        if (rowNumber >= 6) {
          // row.height = 30; // Set the height as per your requirement
          row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
            if (colNumber <= 10) {
              cell.border = {
                top: {style:'thin'},
                left: {style:'thin'},
                bottom: {style:'thin'},
                right: {style:'thin'}
              };
              cell.alignment = { 
                vertical: 'middle', 
                horizontal: 'center', 
                wrapText: true 
              };
            }
            
          });
        }
      });

      ws.getColumn(1).width = 7;
      ws.getColumn(2).width = 30;
      ws.getColumn(3).width = 25;
      ws.getColumn(4).width = 30;
      ws.getColumn(5).width = 20;
      ws.getColumn(6).width = 20;
      ws.getColumn(7).width = 15;
      ws.getColumn(8).width = 15;
      ws.getColumn(9).width = 15;
      ws.getColumn(10).width = 15;
    
      //--------------------------------------------------------------------------------------------------------------------------
    }

    // Save the workbook to a blob
    const blob = await wb.xlsx.writeBuffer();

    // Use FileSaver to save the blob as a file
    FileSaver.saveAs(new Blob([blob]), `Calibration_Schedule_${nextMonth}.xlsx`);
  };
}

const ExcelGeneratorCalInstance = new ExcelGeneratorCal();
export default ExcelGeneratorCalInstance;
