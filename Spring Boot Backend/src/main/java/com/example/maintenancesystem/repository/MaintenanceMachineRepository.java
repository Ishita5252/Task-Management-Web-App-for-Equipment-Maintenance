package com.example.maintenancesystem.repository;

import com.example.maintenancesystem.model.MaintenanceMachine;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintenanceMachineRepository extends JpaRepository<MaintenanceMachine, Long> {
}
