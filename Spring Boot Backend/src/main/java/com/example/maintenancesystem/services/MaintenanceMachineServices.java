package com.example.maintenancesystem.services;

import com.example.maintenancesystem.model.MaintenanceMachine;
import com.example.maintenancesystem.repository.MaintenanceMachineRepository;

import java.util.ArrayList;
import java.util.List;
//import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MaintenanceMachineServices {
    @Autowired
    private MaintenanceMachineRepository machineRepository;

    //getting all machines of an area
    public List<MaintenanceMachine> getMachinesByArea(String area) {
        List<MaintenanceMachine> allMachines = machineRepository.findAll();
        List<MaintenanceMachine> machinesByArea = new ArrayList<>();

        for (MaintenanceMachine machine : allMachines) {
            if (machine.getMachineLocation().equals(area)) {
                machinesByArea.add(machine);
            }
        }

        return machinesByArea;
    }

    //status calculation
    public MaintenanceMachine.MachineStatus getCalculatedStatus(MaintenanceMachine machine){
        Date currentDate = new Date();
        Date dueFrom = machine.getDueFromDate();
        Date dueTill = machine.getDueTillDate();

        if(dueFrom == null || dueTill == null)
            return MaintenanceMachine.MachineStatus.NOT_DUE;
        else if (currentDate.compareTo(dueFrom) < 0) {
            return MaintenanceMachine.MachineStatus.NOT_DUE;
        } else if (currentDate.compareTo(dueTill) > 0) {
            return MaintenanceMachine.MachineStatus.OVERDUE;
        } else {
            return MaintenanceMachine.MachineStatus.PENDING;
        }
    }

//    //method to calculate next due dates---currently not using----
//    public List<Date> calculateNextDueDates(Date doneOnDate, Date dueFromDate, Date dueTillDate, int freq1, int freq2, String freqUnit) {
//        List<Date> dates = new ArrayList<>();
//
//        if (doneOnDate == null || dueFromDate == null || dueTillDate == null
//                || freqUnit == null || doneOnDate.compareTo(dueFromDate) < 0) {
//            dates.add(dueFromDate);
//            dates.add(dueTillDate);
//            return dates;
//        }
//
//        Calendar calendar1 = createCalendarFromDate(dueFromDate);
//        Calendar calendar2 = createCalendarFromDate(dueTillDate);
//
//        if (freqUnit.equalsIgnoreCase("days")) {
//            calendar1.add(Calendar.DAY_OF_MONTH, freq1);
//            calendar2.add(Calendar.DAY_OF_MONTH, freq2);
//        } else if (freqUnit.equalsIgnoreCase("weeks")) {
//            calendar1.add(Calendar.WEEK_OF_YEAR, freq1);
//            calendar2.add(Calendar.WEEK_OF_YEAR, freq2);
//        } else if (freqUnit.equalsIgnoreCase("months")) {
//            calendar1.add(Calendar.MONTH, freq1);
//            calendar2.add(Calendar.MONTH, freq2);
//        } else {
//            throw new IllegalArgumentException("Invalid frequency unit: " + freqUnit);
//        }
//
//        dates.add(calendar1.getTime());
//        dates.add(calendar2.getTime());
//
//        return dates;
//    }
//
//    //extracting date info
//    private Calendar createCalendarFromDate(Date date) {
//        Calendar calendar = Calendar.getInstance();
//        calendar.setTime(date);
//        return calendar;
//    }

}
