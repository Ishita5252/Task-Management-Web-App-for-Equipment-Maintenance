package com.example.maintenancesystem.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "maintenance_machines")
public class MaintenanceMachine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "machine_name")
    private String machineName;

    @Column(name = "machine_code")
    private String machineCode;

    @Column(name = "area")
    private String machineLocation;

    @Column(name = "due_from_date")
    @Temporal(TemporalType.DATE)
    private Date dueFromDate;

    @Column(name = "due_till_date")
    @Temporal(TemporalType.DATE)
    private Date dueTillDate;

    @Column(name = "done_on_date")
    @Temporal(TemporalType.DATE)
    private Date doneOnDate;

    @Enumerated(EnumType.STRING)
    private MachineStatus status;

    public enum MachineStatus{
        NOT_DUE, PENDING, OVERDUE
    }

    //constructors
    public MaintenanceMachine(){
        //default constructor
    }
    public MaintenanceMachine(String machineName, String machineCode, String machineLocation,
                              Date dueFromDate, Date dueTillDate, Date doneOnDate, MachineStatus status){
        this.machineName = machineName;
        this.machineCode = machineCode;
        this.machineLocation = machineLocation;
        this.dueFromDate = dueFromDate;
        this.dueTillDate = dueTillDate;
        this.doneOnDate = doneOnDate;
        this.status = status;
    }

    //getters and setters
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public String getMachineName() {
        return machineName;
    }
    public void setMachineName(String machineName) {
        this.machineName = machineName;
    }

    public String getMachineCode() {
        return machineCode;
    }
    public void setMachineCode(String machineCode) {
        this.machineCode = machineCode;
    }

    public String getMachineLocation() {
        return machineLocation;
    }
    public void setMachineLocation(String machineLocation) {
        this.machineLocation = machineLocation;
    }

    public Date getDueFromDate() {
        return dueFromDate;
    }
    public void setDueFromDate(Date dueFromDate) {
        this.dueFromDate = dueFromDate;
    }

    public Date getDueTillDate() {
        return dueTillDate;
    }
    public void setDueTillDate(Date dueTillDate) {
        this.dueTillDate = dueTillDate;
    }

    public Date getDoneOnDate() {
        return doneOnDate;
    }
    public void setDoneOnDate(Date doneOnDate) {
        this.doneOnDate = doneOnDate;
    }

    public MachineStatus getStatus() {
        return status;
    }
    public void setStatus(MachineStatus status) {
        this.status = status;
    }
}
