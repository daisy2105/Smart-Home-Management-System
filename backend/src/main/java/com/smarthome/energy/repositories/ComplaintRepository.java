package com.smarthome.energy.repositories;

import com.smarthome.energy.entities.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByStatus(Complaint.Status status);

    List<Complaint> findByTechnicianId(Long technicianId);

    List<Complaint> findByHomeownerId(Long homeownerId);


}