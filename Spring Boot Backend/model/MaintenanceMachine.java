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

    @Column(name = "frequency")
    private Integer taskFrequency;

    @Column(name = "frequency2")
    private Integer taskFrequency2;

    @Column(name = "frequency_unit")
    private String frequencyUnit;

    @Column(name = "model_no")
    private String modelNo;

    @Column(name = "make")
    private String make;

    @Enumerated(EnumType.STRING)
    private MachineStatus status;

    @Column(name = "remarks")
    private String remarks;

    public enum MachineStatus{
        NOT_DUE, PENDING, OVERDUE
    }

    //constructors
    public MaintenanceMachine(){
        //default constructor
        this.taskFrequency = 0;
    }
    public MaintenanceMachine(String machineName, String machineCode, String machineLocation,
                              Date dueFromDate, Date dueTillDate, Date doneOnDate, int taskFrequency,
                              Integer taskFrequency2, String frequencyUnit, String modelNo,
                              MachineStatus status, String remarks, String make){
        this.machineName = machineName;
        this.machineCode = machineCode;
        this.machineLocation = machineLocation;
        this.dueFromDate = dueFromDate;
        this.dueTillDate = dueTillDate;
        this.doneOnDate = doneOnDate;
        this.taskFrequency = taskFrequency;
        this.taskFrequency2 = taskFrequency2;
        this.frequencyUnit = frequencyUnit;
        this.modelNo = modelNo;
        this.status = status;
        this.remarks = remarks;
        this.make = make;
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

    public Integer getTaskFrequency(){return taskFrequency;}
    public void setTaskFrequency(int taskFrequency) {
        this.taskFrequency = taskFrequency;
    }

    public Integer getTaskFrequency2(){return taskFrequency2;}
    public void setTaskFrequency2(int taskFrequency2) {
        this.taskFrequency2 = taskFrequency2;
    }

    public String getFrequencyUnit(){return frequencyUnit;}
    public void setFrequencyUnit(String frequencyUnit){
        this.frequencyUnit = frequencyUnit;
    }

    public MachineStatus getStatus() {
        return status;
    }
    public void setStatus(MachineStatus status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }
    public void setRemarks(String remarks){
        this.remarks = remarks;
    }

    public String getModelNo(){
        return modelNo;
    }
    public void setModelNo(String modelNo){
        this.modelNo = modelNo;
    }

    public String getMake(){
        return make;
    }
    public void setMake(String make){
        this.make = make;
    }
}
