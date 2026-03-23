package com.smarthome.energy.controllers;

import com.smarthome.energy.entities.Complaint;
import com.smarthome.energy.services.ComplaintService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complaints")
@CrossOrigin
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PostMapping
    public Complaint raiseComplaint(@RequestBody Complaint complaint) {
        return complaintService.raiseComplaint(complaint);
    }

    @GetMapping("/pending")
    public List<Complaint> getPendingComplaints() {
        return complaintService.getPendingComplaints();
    }

    @PutMapping("/accept/{complaintId}/{technicianId}")
    public Complaint acceptComplaint(@PathVariable Long complaintId,
                                     @PathVariable Long technicianId) {
        return complaintService.acceptComplaint(complaintId, technicianId);
    }

    @PutMapping("/resolve/{complaintId}")
    public Complaint resolveComplaint(@PathVariable Long complaintId) {
        return complaintService.resolveComplaint(complaintId);
    }

    @PutMapping("/reject/{complaintId}")
    public Complaint rejectComplaint(@PathVariable Long complaintId) {
        return complaintService.rejectComplaint(complaintId);
    }

    @GetMapping("/homeowner/{id}")
    public List<Complaint> getHomeownerComplaints(@PathVariable Long id) {
        return complaintService.getHomeownerComplaints(id);
    }

    @GetMapping("/technician/{id}")
    public List<Complaint> getTechnicianComplaints(@PathVariable Long id) {
        return complaintService.getTechnicianComplaints(id);
    }

}