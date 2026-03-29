package com.smarthome.energy.controllers;

import com.smarthome.energy.dto.*;
import com.smarthome.energy.services.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@AllArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponseDto> getDashboard(){
        return ResponseEntity.ok(adminService.dashboard());
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDto>> getAllUsers(){
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/homeowners")
    public ResponseEntity<List<UserResponseDto>> getAllHomeOwners(){
        return ResponseEntity.ok(adminService.getAllHomeOwners());
    }

    @GetMapping("/technicians")
    public ResponseEntity<List<UserResponseDto>> getAllTechnicians(){
        return ResponseEntity.ok(adminService.getAllTechnicians());
    }

    @GetMapping("/devices")
    public ResponseEntity<List<DeviceResponseDto>> getAllDevices(){
        return ResponseEntity.ok(adminService.getAllDevices());

    }
    @GetMapping("/assignments")
    public ResponseEntity<List<AssignmentResponseDto>> getAllAssignments(){
        return ResponseEntity.ok(adminService.getAllAssignments());
    }

    @PostMapping("/assignments")
    public ResponseEntity<String> assign(@RequestBody AssignmentRequestDto dto) {
        adminService.assignTechnicianToUser(dto.getTechnicianId(), dto.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body("Technician assigned successfully");
    }

    @DeleteMapping("/assignments")
    public ResponseEntity<String> unassign(@RequestBody AssignmentRequestDto dto) {
        adminService.unassignTechnician(dto.getTechnicianId(), dto.getUserId());
        return ResponseEntity.noContent().build();
    }


}
