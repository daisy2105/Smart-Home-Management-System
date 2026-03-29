package com.smarthome.energy.services;

import com.smarthome.energy.dto.AdminDashboardResponseDto;
import com.smarthome.energy.dto.AssignmentResponseDto;
import com.smarthome.energy.dto.DeviceResponseDto;
import com.smarthome.energy.dto.UserResponseDto;
import com.smarthome.energy.entities.TechnicianAssignment;
import com.smarthome.energy.entities.User;
import com.smarthome.energy.model.Role;
import com.smarthome.energy.repositories.DeviceRepository;
import com.smarthome.energy.repositories.JpaUserRepository;
import com.smarthome.energy.repositories.TechnicianAssignmentRepository;
import com.smarthome.energy.repositories.UsageLogRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class AdminService {
    private final TechnicianAssignmentRepository technicianAssignmentRepository;
    private final JpaUserRepository userRepository;
    private final DeviceRepository deviceRepository;
    private final UsageLogRepository usageLogRepository;

    //Dashboard Statistics

    public long getTotalUsers() {
        return userRepository.count();
    }

    public long getTotalHomeowners() {
        return userRepository.countByRole(Role.HOMEOWNER);
    }

    public long getTotalTechnicians() {
        return userRepository.countByRole(Role.TECHNICIAN);
    }

    public long getTotalDevices() {
        return deviceRepository.count();
    }

    public BigDecimal getTotalEnergyUsage() {
        return usageLogRepository.sumEnergyUsed();
    }

    public BigDecimal getTotalCost(){return usageLogRepository.totalCost();}

    public AdminDashboardResponseDto dashboard(){
        return AdminDashboardResponseDto.builder()
                .totalUsers(getTotalUsers())
                .totalHomeowners(getTotalHomeowners())
                .totalTechnicians(getTotalTechnicians())
                .totalDevices(getTotalDevices())
                .totalEnergyUsage(getTotalEnergyUsage())
                .totalCost(getTotalCost()).build();
    }

    //User APIs

    public List<UserResponseDto> getAllUsers(){
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> UserResponseDto.builder()
                        .id(user.getId())
                        .role(user.getRole())
                        .email(user.getEmail())
                        .name(user.getName())
                        .build())
                .toList();
    }

    public List<UserResponseDto> getAllHomeOwners(){
        List<User> users =  userRepository.findByRole(Role.HOMEOWNER);
        return users.stream().map(user ->UserResponseDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .name(user.getName())
                .build()).toList();
    }

    public List<UserResponseDto> getAllTechnicians(){
        List<User> users =  userRepository.findByRole(Role.TECHNICIAN);
        return users.stream().map(user ->UserResponseDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .name(user.getName())
                .build()).toList();
    }

    public List<DeviceResponseDto> getAllDevices(){
        return deviceRepository.findAll().stream().map(device ->DeviceResponseDto.builder()
                .id(device.getId())
                .status(device.getStatus())
                .type(device.getType())
                .powerRating(device.getPowerRating())
                .name(device.getName())
                .build()).toList();
    }


    public List<AssignmentResponseDto> getAllAssignments(){
        return technicianAssignmentRepository.findAllAssignments();
    }


    //Admin tasks
    @Transactional
    public void assignTechnicianToUser(Long technicianId, Long userId){
        User technician = userRepository.findById(technicianId)
                .orElseThrow(() -> new EntityNotFoundException("Technician not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (technician.getRole() != Role.TECHNICIAN) {
            throw new IllegalStateException("User is not a technician");
        }
        if(user.getRole()!=Role.HOMEOWNER){
            throw new IllegalStateException("User is not a Homeowner");
        }
        boolean exists = technicianAssignmentRepository
                .existsByUserId(userId);

        if (exists) {
            throw new IllegalStateException("Technician already assigned to this user");
        }
        TechnicianAssignment assignment = TechnicianAssignment.builder()
                .technicianId(technicianId)
                .userId(userId)
                .assignedAt(LocalDateTime.now())
                .build();
        technicianAssignmentRepository.save(assignment);

    }

    public void unassignTechnician(Long technicianId, Long userId) {
        User technician = userRepository.findById(technicianId)
                .orElseThrow(() -> new EntityNotFoundException("Technician not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (technician.getRole() != Role.TECHNICIAN) {
            throw new IllegalStateException("User is not a technician");
        }

        TechnicianAssignment assignment = technicianAssignmentRepository
                .findByTechnicianIdAndUserId(technicianId, userId)
                .orElseThrow(() -> new EntityNotFoundException("Assignment not found"));
        technicianAssignmentRepository.delete(assignment);
    }
}
