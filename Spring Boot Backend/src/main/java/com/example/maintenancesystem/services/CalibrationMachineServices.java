package com.example.maintenancesystem.services;

import com.example.maintenancesystem.model.CalibrationMachine;
import com.example.maintenancesystem.repository.CalibrationMachineRepository;
import com.example.maintenancesystem.model.MachineStatus;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;
import java.time.ZoneId;
//import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CalibrationMachineServices {

    @Autowired
    private CalibrationMachineRepository machineRepository;

    //getting all machines of an area
    public List<CalibrationMachine> getMachinesByArea(String area){
        List<CalibrationMachine> allMachines = machineRepository.findAll();
        List<CalibrationMachine> machinesByArea = new ArrayList<>();

        for (CalibrationMachine machine : allMachines) {
            if (machine.getMachineLocation().equals(area)) {
                machinesByArea.add(machine);
            }
        }
        return machinesByArea;
    }

    //status calculation
    public MachineStatus getCalculatedStatus(CalibrationMachine machine){
        LocalDate currentDate = LocalDate.now();

        if(machine.getNextDueDate() == null)
            return MachineStatus.NOT_DUE;

        LocalDate nextDue = machine.getNextDueDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        if (currentDate.isBefore(nextDue.minusDays(10))) {
            return MachineStatus.NOT_DUE;
        } else if (currentDate.isBefore(nextDue) || currentDate.isEqual(nextDue)) {
            return MachineStatus.PENDING;
        } else {
            return MachineStatus.OVERDUE;
        }
    }

    public void updateAllMachinesStatus() {
        List<CalibrationMachine> machines = machineRepository.findAll();
        for (CalibrationMachine machine : machines) {
            MachineStatus status = getCalculatedStatus(machine);
            machine.setStatus(status);
            machineRepository.save(machine);
        }
    }
}