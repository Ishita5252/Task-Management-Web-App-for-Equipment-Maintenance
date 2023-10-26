package com.example.maintenancesystem.controller;

import com.example.maintenancesystem.model.CalibrationMachine;
import com.example.maintenancesystem.repository.CalibrationMachineRepository;
import com.example.maintenancesystem.exception.ResourceNotFoundException;
import com.example.maintenancesystem.services.CalibrationMachineServices;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
//import java.util.Date;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CalibrationMachineController {
    @Autowired
    private CalibrationMachineRepository machineRepository;

    @Autowired
    private CalibrationMachineServices machineService;

    //get all machines rest api
    @GetMapping("/calibrationMachines")
    public List<CalibrationMachine> getAllMachines(){
        return machineRepository.findAll();
    }

    //create machine rest api
    @PostMapping("/calibrationMachines")
    public CalibrationMachine createMachine(@RequestBody CalibrationMachine machine){
        machine.setStatus(machineService.getCalculatedStatus(machine));
        return machineRepository.save(machine);
    }

    //get a machine by id rest api
    @GetMapping("/calibrationMachines/{id}")
    public ResponseEntity<CalibrationMachine> getMachineById(@PathVariable Long id){
        CalibrationMachine machine = machineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Machine not existing with id :" + id));
        return ResponseEntity.ok(machine);
    }

    @PutMapping("/calibrationMachines/{id}")
    public ResponseEntity<CalibrationMachine> updateMachine(@PathVariable Long id, @RequestBody CalibrationMachine machineDetails){
        CalibrationMachine machine = machineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Machine not existing with id :" + id));
        machine.setMachineName(machineDetails.getMachineName());
        machine.setMachineCode(machineDetails.getMachineCode());
        machine.setMachineLocation(machineDetails.getMachineLocation());
        machine.setLastDoneDate(machineDetails.getLastDoneDate());
        machine.setNextDueDate(machineDetails.getNextDueDate());
        machine.setDoneOnDate(machineDetails.getDoneOnDate());
        machine.setTaskFrequency(machineDetails.getTaskFrequency());
        machine.setFrequencyUnit(machineDetails.getFrequencyUnit());
        //machine.setStatus(machineDetails.getStatus());
        machine.setStatus(machineService.getCalculatedStatus(machineDetails));
        machine.setRemarks(machineDetails.getRemarks());
        machine.setInternalMc(machineDetails.getInternalMc());
        machine.setRefStd(machineDetails.getRefStd());

        CalibrationMachine updatedMachine = machineRepository.save(machine);
        return ResponseEntity.ok(updatedMachine);
    }

    //delete machine rest api
    @DeleteMapping("/calibrationMachines/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteMachine(@PathVariable Long id){
        CalibrationMachine machine = machineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Machine not existing with id :" + id));

        machineRepository.delete(machine);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    //---------other service methods--------------:
    //get machines by area
    @GetMapping("/calibrationMachines/byArea/{area}")
    public List<CalibrationMachine> getMachineByArea(@PathVariable String area){
        return machineService.getMachinesByArea(area);
    }

    //update status of all machines
    @PutMapping("/calibrationMachines/updateAllMachinesStatus")
    public ResponseEntity<String> updateAllMachinesStatus() {
        machineService.updateAllMachinesStatus();
        return ResponseEntity.ok("All machines status updated successfully");
    }
}


