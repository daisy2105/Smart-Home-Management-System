package com.smarthome.energy.controllers;

import com.smarthome.energy.dto.*;
import com.smarthome.energy.services.DeviceService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/devices")
public class DeviceController {
    private DeviceService deviceService;

    @PreAuthorize("hasRole('HOMEOWNER')")
    @GetMapping   // getting (read) device
    public ResponseEntity<List<DeviceResponseDto>> getMyDevices() {
        return ResponseEntity.ok(deviceService.getMyDevices());
    }
    @PreAuthorize("hasRole('HOMEOWNER')")
    @PostMapping       // adding (create) device
    public ResponseEntity<DeviceResponseDto> createDevice(@Valid @RequestBody DeviceRequestDto deviceRequestDto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(deviceService.addDevice(deviceRequestDto));
    }
/*    @PreAuthorize("hasRole('HOMEOWNER')")
    @PutMapping("/{id}")    //update device.
    public ResponseEntity<DeviceResponseDto> updateDevice(@PathVariable Long id,
                                                  @Valid @RequestBody DeviceUpdateRequestDto deviceUpdateRequestDto){
        return ResponseEntity.ok(deviceService.updateDevice(id,deviceUpdateRequestDto));
    }

 */
    @PreAuthorize("hasRole('HOMEOWNER')")
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteDevice (@PathVariable Long id) {
        deviceService.deleteDevice(id);
        return ResponseEntity.noContent().build();  // follow the REST principles in all returns.
    }
    @PreAuthorize("hasRole('HOMEOWNER')")
    @GetMapping("{id}")
    public ResponseEntity<DeviceResponseDto> getMyDevice(@PathVariable Long id)  {
        return ResponseEntity.ok(deviceService.getMyDeviceById(id));
    }

    @PreAuthorize("hasRole('HOMEOWNER')")
    @PutMapping("{id}/status")      // to update only  status
    public ResponseEntity<DeviceResponseDto> updateDeviceStatus(@PathVariable Long id,
                                    @Valid @RequestBody DeviceStatusUpdateRequestDto deviceStatusUpdateRequestDto) {
        return ResponseEntity.ok(deviceService.updateDeviceStatus(id, deviceStatusUpdateRequestDto));
    }

    @PreAuthorize("hasRole('HOMEOWNER')")
    @PutMapping("{id}/name")    // to update only name
    public ResponseEntity<DeviceResponseDto>  updateDeviceName(@PathVariable Long id,
                                   @Valid @RequestBody DeviceNameUpdateRequestDto deviceNameUpdateRequestDto) {
        return ResponseEntity.ok(deviceService.updateDeviceName(id, deviceNameUpdateRequestDto));


    }
}
