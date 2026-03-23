package com.smarthome.energy.services;

import com.smarthome.energy.entities.Complaint;
import com.smarthome.energy.repositories.ComplaintRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;

    public ComplaintService(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    public Complaint raiseComplaint(Complaint complaint) {
        complaint.setStatus(Complaint.Status.PENDING);
        return complaintRepository.save(complaint);
    }

    public List<Complaint> getPendingComplaints() {
        return complaintRepository.findByStatus(Complaint.Status.PENDING);
    }

    public Complaint acceptComplaint(Long complaintId, Long technicianId) {

        Complaint complaint = complaintRepository.findById(complaintId).orElseThrow();

        complaint.setTechnicianId(technicianId);
        complaint.setStatus(Complaint.Status.ACCEPTED);

        return complaintRepository.save(complaint);
    }

    public Complaint resolveComplaint(Long complaintId) {

        Complaint complaint = complaintRepository.findById(complaintId).orElseThrow();

        complaint.setStatus(Complaint.Status.RESOLVED);

        return complaintRepository.save(complaint);
    }

    // NEW METHOD
    public Complaint rejectComplaint(Long complaintId) {

        Complaint complaint = complaintRepository.findById(complaintId).orElseThrow();

        // Send complaint back to pending
        complaint.setTechnicianId(null);
        complaint.setStatus(Complaint.Status.PENDING);

        return complaintRepository.save(complaint);
    }

    public List<Complaint> getHomeownerComplaints(Long homeownerId) {
        return complaintRepository.findByHomeownerId(homeownerId);
    }

    public List<Complaint> getTechnicianComplaints(Long technicianId) {
        return complaintRepository.findByTechnicianId(technicianId);
    }

}