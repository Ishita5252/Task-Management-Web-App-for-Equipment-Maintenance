package com.example.maintenancesystem.model;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "calibration_machines")
public class CalibrationMachine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "machine_name")
    private String machineName;

    @Column(name = "machine_code")
    private String machineCode;

    @Column(name = "area")
    private String machineLocation;

    @Column(name = "last_done_date")
    @Temporal(TemporalType.DATE)
    private Date lastDoneDate;

    @Column(name = "next_due_date")
    @Temporal(TemporalType.DATE)
    private Date nextDueDate;

    @Column(name = "done_on_date")
    @Temporal(TemporalType.DATE)
    private Date doneOnDate;

    @Column(name = "frequency")
    private Integer taskFrequency;

    @Column(name = "frequency_unit")
    private String frequencyUnit;

    @Column(name = "ref_std")
    private String refStd;

    @Column(name = "internal_mc")
    private String internalMc;

    @Enumerated(EnumType.STRING)
    private MachineStatus status;

    @Column(name = "remarks")
    private String remarks;

    public CalibrationMachine(){

    }

    public CalibrationMachine(String machineName, String machineCode, String machineLocation,
                              Date lastDoneDate, Date nextDueDate, Date doneOnDate, int taskFrequency,
                              String frequencyUnit, String refStd, String internalMc,
                              MachineStatus status, String remarks){
        this.machineName = machineName;
        this.machineCode = machineCode;
        this.machineLocation = machineLocation;
        this.lastDoneDate = lastDoneDate;
        this.nextDueDate = nextDueDate;
        this.doneOnDate = doneOnDate;
        this.taskFrequency = taskFrequency;
        this.frequencyUnit = frequencyUnit;
        this.refStd = refStd;
        this.internalMc = internalMc;
        this.status = status;
        this.remarks = remarks;
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

    public Date getLastDoneDate() {
        return lastDoneDate;
    }
    public void setLastDoneDate(Date lastDoneDate) {
        this.lastDoneDate = lastDoneDate;
    }

    public Date getNextDueDate() {
        return nextDueDate;
    }
    public void setNextDueDate(Date nextDueDate) {
        this.nextDueDate = nextDueDate;
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

    public String getRefStd(){return refStd;}
    public void setRefStd(String refStd){
        this.refStd = refStd;
    }

    public String getInternalMc(){
        return internalMc;
    }
    public void setInternalMc(String internalMc){
        this.internalMc = internalMc;
    }
}
