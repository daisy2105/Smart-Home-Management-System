package com.smarthome.energy.services;

import com.smarthome.energy.dto.*;
import com.smarthome.energy.entities.Device;
import com.smarthome.energy.entities.TechnicianAssignment;
import com.smarthome.energy.entities.User;
import com.smarthome.energy.model.DeviceAction;
import com.smarthome.energy.model.Role;
import com.smarthome.energy.repositories.DeviceRepository;
import com.smarthome.energy.repositories.JpaUserRepository;
import com.smarthome.energy.repositories.TechnicianAssignmentRepository;
import com.smarthome.energy.security.SecurityUser;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class TechnicianService {
    private final TechnicianAssignmentRepository technicianAssignmentRepository;
    private final DeviceRepository deviceRepository;
    private final JpaUserRepository userRepository;
    public Long getTechnicianId(){
        SecurityUser securityUser = (SecurityUser) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return securityUser.getUser().getId();
    }
    @Transactional
    public DeviceResponseDto installDevice(Long userId, DeviceRequestDto deviceRequestDto) {
        Long technicianId = getTechnicianId();
        if(!technicianAssignmentRepository.existsByTechnicianIdAndUserId(technicianId,userId)){
            throw new AccessDeniedException("You are not assigned to this user.");
        }
        User user= userRepository.findById(userId).orElseThrow(()->new EntityNotFoundException("User Not Found"));
        if(user.getRole() != Role.HOMEOWNER){
            throw new IllegalStateException("Devices can only be installed for homeowners");
        }
        Device device= Device.builder()
                .name(deviceRequestDto.getName())
                .type(deviceRequestDto.getType())
                .powerRating(deviceRequestDto.getPowerRating())
                .status(deviceRequestDto.getStatus())
                .user(user)
                .build();
        Device savedDevice = deviceRepository.save(device);

        return DeviceResponseDto.builder()
                .id(savedDevice.getId())
                .name(savedDevice.getName())
                .status(savedDevice.getStatus())
                .powerRating(savedDevice.getPowerRating())
                .type(savedDevice.getType()).build();
    }

    @Transactional
    public DeviceResponseDto updateDevice(Long deviceId, TechUpdateDeviceRequestDto dto) {
        Device device = deviceRepository.findById(deviceId)
                .orElseThrow(() -> new EntityNotFoundException("Device not found"));
        Long technicianId = getTechnicianId();
        Long userId = device.getUser().getId();
        if(!technicianAssignmentRepository.existsByTechnicianIdAndUserId(technicianId, userId)){
            throw new AccessDeniedException("You are not assigned to this user.");
        }



        device.setName(dto.getName());
        device.setPowerRating(dto.getPowerRating());
        device.setStatus(dto.getStatus());
        deviceRepository.save(device);
        return DeviceResponseDto.builder()
                .id(deviceId)
                .type(device.getType())
                .name(device.getName())
                .powerRating(device.getPowerRating())
                .status(device.getStatus()).build();

    }
    @Transactional
    public DeviceActionResponseDto markDeviceFaulty(Long deviceId) {

        Device device = deviceRepository.findById(deviceId)
                .orElseThrow(() -> new EntityNotFoundException("Device not found"));
        Long technicianId = getTechnicianId();
        Long userId = device.getUser().getId();
        if(!technicianAssignmentRepository.existsByTechnicianIdAndUserId(technicianId, userId)){
            throw new AccessDeniedException("You are not assigned to this user.");
        }
        device.setDeletedAt(LocalDateTime.now());
        deviceRepository.save(device);
        return DeviceActionResponseDto.builder()
                .deviceName(device.getName())
                .deviceId(deviceId)
                .message("Device marked as faulty")
                .action(DeviceAction.DELETED).build();
    }
    @Transactional
    public DeviceActionResponseDto restoreDevice(Long deviceId) {
        Device device = deviceRepository.findByIdIncludingDeleted(deviceId)
                .orElseThrow(()->new EntityNotFoundException("Device Not Found"));
        Long technicianId = getTechnicianId();
        Long userId = device.getUser().getId();
        if(!technicianAssignmentRepository.existsByTechnicianIdAndUserId(technicianId,userId)){
            throw new AccessDeniedException("You are not assigned to this user.");
        }
        device.setDeletedAt(null);
        deviceRepository.save(device);
        return DeviceActionResponseDto.builder()
                .deviceId(deviceId)
                .deviceName(device.getName())
                .action(DeviceAction.RESTORED)
                .message("Device restored successfully.").build();
    }
    public List<TechnicianUserResponseDto> getAssignedUsers(){
        Long technicianId = getTechnicianId();
        List<TechnicianAssignment> assignments = technicianAssignmentRepository.
                findByTechnicianId(technicianId);
        List<Long> technicalUsersId = assignments.stream().map(TechnicianAssignment::getUserId).toList();
        if(technicalUsersId.isEmpty()) return List.of();
        List<User> technicalUsers = userRepository.findAllById(technicalUsersId);
        return technicalUsers.stream().map(u -> TechnicianUserResponseDto.builder()
                .email(u.getEmail())
                .userId(u.getId())
                .name(u.getName()).build()).toList();

    }
    public List<DeviceResponseDto> getAssignedDevicesForTechnician(){
        Long technicianId = getTechnicianId();
        List<TechnicianAssignment> technicianAssignments = technicianAssignmentRepository
                .findByTechnicianId(technicianId);
        List<Long> userIds = technicianAssignments.stream().map(TechnicianAssignment::getUserId).toList();
        if (userIds.isEmpty()) return List.of();
        List<Device> devices = deviceRepository
                .findByUserIdInAndDeletedAtIsNull(userIds);

        return devices.stream().map(device ->DeviceResponseDto.builder()
                .id(device.getId())
                .type(device.getType())
                .name(device.getName())
                .status(device.getStatus())
                .powerRating(device.getPowerRating())
                .build()).toList();

    }
    public List<DeviceResponseDto> getFaultyDevicesForTechnician(){
        Long technicianId = getTechnicianId();
        List<Long> userIds = technicianAssignmentRepository
                .findByTechnicianId(technicianId)
                .stream()
                .map(TechnicianAssignment::getUserId)
                .toList();

        if(userIds.isEmpty()) return List.of();

        List<Device> devices = deviceRepository.findDeletedDevicesByUserIds(userIds);

        return devices.stream().map(device -> DeviceResponseDto.builder()
                .id(device.getId())
                .name(device.getName())
                .type(device.getType())
                .status(device.getStatus())
                .powerRating(device.getPowerRating())
                .build()).toList();
    }

}
