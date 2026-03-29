package com.smarthome.energy.controllers;

import com.smarthome.energy.dto.*;
import com.smarthome.energy.services.TechnicianService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/technician")
@PreAuthorize("hasRole('TECHNICIAN')")
@AllArgsConstructor
public class TechnicianController {
    private final TechnicianService technicianService;
    @PostMapping("/users/{userId}/devices")
    public ResponseEntity<DeviceResponseDto> installDevice(@PathVariable Long userId,
                                                           @RequestBody DeviceRequestDto deviceRequestDto){
       return ResponseEntity.ok(technicianService.installDevice(userId,deviceRequestDto));

    }

    @PutMapping("/devices/{deviceId}")
    public ResponseEntity<DeviceResponseDto> updateDevice(@PathVariable Long deviceId,
                                                          @RequestBody TechUpdateDeviceRequestDto dto){
        return ResponseEntity.ok(technicianService.updateDevice(deviceId,dto));
    }

    @DeleteMapping("/devices/{deviceId}")
    public ResponseEntity<DeviceActionResponseDto> markDeviceFaulty(@PathVariable Long deviceId){
    return ResponseEntity.ok(technicianService.markDeviceFaulty(deviceId));}

    @PutMapping("/devices/{deviceId}/restore")
    public ResponseEntity<DeviceActionResponseDto> restoreDevice(@PathVariable Long deviceId){
        return ResponseEntity.ok(technicianService.restoreDevice(deviceId));
    }
    @GetMapping("/assigned-users")
        public ResponseEntity<List<TechnicianUserResponseDto>> getAssignedUsers(){
            return ResponseEntity.ok(technicianService.getAssignedUsers());
        }

    @GetMapping("/assigned-devices")
    public ResponseEntity<List<DeviceResponseDto>> getAssignedDevicesForTechnician(){
        return ResponseEntity.ok(technicianService.getAssignedDevicesForTechnician());
    }
    @GetMapping("/assigned-devices/faulty")
    public ResponseEntity<List<DeviceResponseDto>> getAssignedFaultyDevicesForTechnician(){
        return ResponseEntity.ok(technicianService.getFaultyDevicesForTechnician());
    }


}
