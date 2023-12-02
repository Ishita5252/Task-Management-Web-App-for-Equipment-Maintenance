package com.example.maintenancesystem.repository;

import com.example.maintenancesystem.model.CalibrationMachine;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalibrationMachineRepository extends JpaRepository<CalibrationMachine, Long> {
}
