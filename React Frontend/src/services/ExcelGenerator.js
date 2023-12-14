import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import MaintenanceMachineService from './MaintenanceMachineService';

class ExcelGenerator {

  getMachineData(machines) {
    if (!Array.isArray(machines)) {
      console.error('Invalid machines data:', machines);
      return [];
    }

    const data = [
      ["S.No.", "Equipment", "Machine Code", "Model/Sr.No.", "Make", "Due", "Done"],
      ...machines.map((machine, index) => {
        const { machineName, machineCode, modelNo, make, dueFromDate, dueTillDate } = machine;

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
          machineCode,
          modelNo,
          make,
          `${formatDateString(dueFromDate)} - ${formatDateString(dueTillDate)}`,
          '',
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
      const response = await MaintenanceMachineService.getMachinesByArea(area);
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
      
      // Add a new row at the top for the heading
      ws.spliceRows(1, 0, [`Monthly Preventive Maintenance Schedule (${area})`]);
      // Merge the cells for the heading
      ws.mergeCells('A1:G1');
      // Style the heading
      ws.getRow(1).height = 30;
      ws.getCell('A1').font = {bold: true, size: 18};
      ws.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

      // Add Description
      ws.spliceRows(2, 0, []);
      ws.spliceRows(2, 0, []);

      ws.mergeCells('F2:G2'); ws.getCell('F2').value = `Month: ${nextMonth}' ${nextYear}`;
      ws.mergeCells('F3:G3'); ws.getCell('F3').value = 'Format No: M/EM/FMT/PM/35';

      // Style the Description
      const desc_style = {
        font: {bold: true, size:14},
        alignment: {vertical: 'middle', horizontal: 'right'}
      };
      ws.getCell('F2').style = desc_style;
      ws.getCell('F3').style = desc_style
      ws.spliceRows(4, 0, []);

      //------------------------------------------TABLE STYLES--------------------------------------------------------------------
      //header: 
      ws.spliceRows(5,0,[]);
      ws.mergeCells('F5:G5'); ws.getCell('F5').value = 'P.M. Date'
      ws.mergeCells('A5:A6'); ws.mergeCells('B5:B6'); ws.mergeCells('C5:C6');
      ws.mergeCells('D5:D6'); ws.mergeCells('E5:E6');
      ws.getCell('A5').value = 'S.No.'; ws.getCell('B5').value = 'Equipment'; ws.getCell('C5').value = 'Machine Code';
      ws.getCell('D5').value = 'Model/Sr.No.'; ws.getCell('E5').value = 'Make';
      ws.getRow(5).font = {bold: true, size: 12}; ws.getRow(6).font = {bold: true, size: 12};

      //table body:
      ws.eachRow({ includeEmpty: true }, function(row, rowNumber) {
        if (rowNumber >= 5) {
          // if(rowNumber >= 7) row.height = 30; // Set the height as per your requirement
          row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
            if (colNumber <= 7) {
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
      ws.getColumn(4).width = 25;
      ws.getColumn(5).width = 25;
      ws.getColumn(6).width = 25;
      ws.getColumn(7).width = 25;
    
      //--------------------------------------------------------------------------------------------------------------------------
    }

    // Save the workbook to a blob
    const blob = await wb.xlsx.writeBuffer();

    // Use FileSaver to save the blob as a file
    FileSaver.saveAs(new Blob([blob]), `PM_Schedule_${nextMonth}.xlsx`);
  };
}

const ExcelGeneratorInstance = new ExcelGenerator();
export default ExcelGeneratorInstance;
