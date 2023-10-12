package com.example.maintenancesystem.controller;

import com.example.maintenancesystem.model.MaintenanceMachine;
import com.example.maintenancesystem.repository.MaintenanceMachineRepository;
import com.example.maintenancesystem.exception.ResourceNotFoundException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
public class MaintenanceMachineController {

    @Autowired
    private MaintenanceMachineRepository machineRepository;

    //get all machines rest api
    @GetMapping("/maintenanceMachines")
    public List<MaintenanceMachine> getAllMachines(){
        return machineRepository.findAll();
    }

    //create machine rest api
    @PostMapping("/maintenanceMachines")
    public MaintenanceMachine createMachine(@RequestBody MaintenanceMachine machine){
        return machineRepository.save(machine);
    }

    //get a machine by id rest api
    @GetMapping("/maintenanceMachines/{id}")
    public ResponseEntity<MaintenanceMachine> getMachineById(@PathVariable Long id){
        MaintenanceMachine machine = machineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Machine not existing with id :" + id));
        return ResponseEntity.ok(machine);
    }

    //update machine rest api
    @PutMapping("/maintenanceMachines/{id}")
    public ResponseEntity<MaintenanceMachine> updateMachine(@PathVariable Long id, @RequestBody MaintenanceMachine machineDetails){
        MaintenanceMachine machine = machineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Machine not existing with id :" + id));
        machine.setMachineName(machineDetails.getMachineName());
        machine.setMachineCode(machineDetails.getMachineCode());
        machine.setMachineLocation(machineDetails.getMachineLocation());
        machine.setDueFromDate(machineDetails.getDueFromDate());
        machine.setDueTillDate(machineDetails.getDueTillDate());
        machine.setDoneOnDate(machineDetails.getDoneOnDate());
        //machine.setStatus(machineDetails.getStatus());

        MaintenanceMachine updatedMachine = machineRepository.save(machine);
        return ResponseEntity.ok(updatedMachine);
    }

    //delete machine rest api
    @DeleteMapping("/maintenanceMachines/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteMachine(@PathVariable Long id){
        MaintenanceMachine machine = machineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Machine not existing with id :" + id));

        machineRepository.delete(machine);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
