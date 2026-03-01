package com.smarthome.energy.services;

import com.smarthome.energy.dto.*;
import com.smarthome.energy.entities.Device;
import com.smarthome.energy.entities.User;
import com.smarthome.energy.repositories.DeviceRepository;
import com.smarthome.energy.repositories.JpaUserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import org.springframework.security.access.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class DeviceService {
    private final JpaUserRepository userRepository;
    private final DeviceRepository deviceRepository;

    public List<DeviceResponseDto> getMyDevices() {
        User currentUser = getCurrentUser();
        List<Device> devices = deviceRepository.findByUser(currentUser);
        List<DeviceResponseDto> devicesDto = new ArrayList<>();
        for (Device device : devices) {
            DeviceResponseDto deviceDto = DeviceResponseDto.builder()
                    .id(device.getId())
                    .status(device.getStatus())
                    .name(device.getName())
                    .powerRating(device.getPowerRating())
                    .type(device.getType())
                    .build();
            devicesDto.add(deviceDto);
        }
        return devicesDto;
    }

    @Transactional
    public DeviceResponseDto addDevice(@Valid DeviceRequestDto deviceRequestDto) {
         Device device= Device.builder()
                .name(deviceRequestDto.getName())
                .type(deviceRequestDto.getType())
                .powerRating(deviceRequestDto.getPowerRating())
                .status(deviceRequestDto.getStatus())
                .user(getCurrentUser())
                .build();
         Device savedDevice = deviceRepository.save(device);

         return new DeviceResponseDto(
                 savedDevice.getId(),
                 savedDevice.getName(),
                 savedDevice.getType(),
                 savedDevice.getPowerRating(),
                 savedDevice.getStatus()
         );

    }

/*    @Transactional
    public  DeviceResponseDto updateDevice(Long id, @Valid DeviceUpdateRequestDto deviceUpdateRequestDto) {
        Device device = deviceRepository.findDeviceById(id).orElseThrow(()->new RuntimeException("Device not found"));
        if(!device.getUser().getId().equals(getCurrentUser().getId())) {
            throw new AccessDeniedException("You do not have permission to update this device");
        }
        device.setName(deviceUpdateRequestDto.getName());;
        device.setStatus(deviceUpdateRequestDto.getStatus());
        Device updatedDevice = deviceRepository.save(device);
        return DeviceResponseDto.builder()
                .id(updatedDevice.getId())
                .name(updatedDevice.getName())
                .type(updatedDevice.getType())
                .powerRating(updatedDevice.getPowerRating())
                .status(updatedDevice.getStatus())
                .build();
    }

 */
    @Transactional
    public void deleteDevice(Long id) {
        Device device = deviceRepository.findDeviceById(id).orElseThrow(()->new RuntimeException("Device not found"));
        if(!device.getUser().getId().equals(getCurrentUser().getId())) {
            throw new AccessDeniedException("You do not have permission to delete this device");
        }
        deviceRepository.delete(device);

    }

    public  DeviceResponseDto getMyDeviceById(Long id) {
        User currentUser = getCurrentUser();
        Device device = deviceRepository.findDeviceById(id).orElseThrow(()->new RuntimeException("Device not found"));
        if (!device.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You do not have permission to view this device");
        }

        return DeviceResponseDto.builder()
                .id(device.getId())
                .name(device.getName())
                .type(device.getType())
                .powerRating(device.getPowerRating())
                .status(device.getStatus())
                .build();
    }

    @Transactional
    public DeviceResponseDto updateDeviceStatus(Long id, @Valid DeviceStatusUpdateRequestDto deviceStatusUpdateRequestDto) {
        Device device = deviceRepository.findDeviceById(id).orElseThrow(()->new RuntimeException("Device not found"));
        if(!device.getUser().getId().equals(getCurrentUser().getId())) {
            throw new AccessDeniedException("You do not have permission to update this device");
        }
        device.setStatus(deviceStatusUpdateRequestDto.getStatus());
        Device updatedDevice = deviceRepository.save(device);
        return DeviceResponseDto.builder()
                .id(updatedDevice.getId())
                .name(updatedDevice.getName())
                .type(updatedDevice.getType())
                .powerRating(updatedDevice.getPowerRating())
                .status(updatedDevice.getStatus())
                .build();

    }

    @Transactional
    public DeviceResponseDto updateDeviceName(Long id, DeviceNameUpdateRequestDto deviceNameUpdateRequestDto) {
        Device device = deviceRepository.findDeviceById(id).orElseThrow(()->new RuntimeException("Device not found"));
        if(!device.getUser().getId().equals(getCurrentUser().getId())) {
            throw new AccessDeniedException("You do not have permission to update this device");
        }
        device.setName(deviceNameUpdateRequestDto.getName());
        Device updatedDevice = deviceRepository.save(device);
        return DeviceResponseDto.builder()
                .id(updatedDevice.getId())
                .name(updatedDevice.getName())
                .type(updatedDevice.getType())
                .powerRating(updatedDevice.getPowerRating())
                .status(updatedDevice.getStatus())
                .build();

    }






     // we want loggedIn user so that only that user's Device can be CRUD
    private User getCurrentUser() {
    String email = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();                    // same as getPrincipal().toString();
    return userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("User Not Found"));
    }

}
