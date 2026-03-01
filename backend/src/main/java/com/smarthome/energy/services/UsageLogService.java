package com.smarthome.energy.services;

import com.smarthome.energy.dto.UsageLogRequestDto;
import com.smarthome.energy.dto.UsageLogResponseDto;
import com.smarthome.energy.entities.Device;
import com.smarthome.energy.entities.UsageLog;
import com.smarthome.energy.entities.User;
import com.smarthome.energy.repositories.DeviceRepository;
import com.smarthome.energy.repositories.UsageLogRepository;
import com.smarthome.energy.repositories.JpaUserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import org.springframework.security.access.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UsageLogService {
    private final JpaUserRepository userRepository;
    private final DeviceRepository deviceRepository;
    private final UsageLogRepository usageLogRepository;
    private final BigDecimal rate = new BigDecimal("6.0");
    private User getCurrentUser() {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();                    // same as getPrincipal().toString();
        return userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("User Not Found"));
    }
    @Transactional
    public UsageLogResponseDto logEnergyUsage(Long id, @Valid UsageLogRequestDto usageLogRequestDto)  {
        Device device = deviceRepository.findById(id).orElseThrow(()-> new RuntimeException("Device Not Found"));
        if(!device.getUser().getId().equals(getCurrentUser().getId())) {
            throw new AccessDeniedException("You do not have permission to log this device");
        }
        BigDecimal energyUsed = usageLogRequestDto.getDurationInHours().multiply(device.getPowerRating());

        BigDecimal cost = energyUsed.multiply(rate);
        UsageLog usageLog = UsageLog.builder()
                .device(device)
                .cost(cost)
                .energyUsed(energyUsed)
                .timestamp(usageLogRequestDto.getTimestamp())
                .build();

        UsageLog usageLogSaved = usageLogRepository.save(usageLog);
        return UsageLogResponseDto.builder()
                .id(usageLogSaved.getId())
                .timestamp(usageLogSaved.getTimestamp())
                .energyUsed(usageLogSaved.getEnergyUsed())
                .cost(usageLogSaved.getCost()).
                build();

    }

    public List<UsageLogResponseDto> getEnergyUsageLog(Long id, LocalDateTime start, LocalDateTime end) {
        Device device = deviceRepository.findById(id).orElseThrow(()-> new RuntimeException("Device Not Found"));
        if(!device.getUser().getId().equals(getCurrentUser().getId())) {
            throw new AccessDeniedException("You do not have permission to log this device");
        }
        List<UsageLog> usageLogs = usageLogRepository.findByDeviceAndTimestampBetween(device, start, end);
        List<UsageLogResponseDto> usageLogResponseDtos = new ArrayList<>();
        for(UsageLog usageLog : usageLogs) {
            var a = UsageLogResponseDto.builder()
                    .id(usageLog.getId())
                    .timestamp(usageLog.getTimestamp())
                    .energyUsed(usageLog.getEnergyUsed())
                    .cost(usageLog.getCost())
                    .build();
            usageLogResponseDtos.add(a);
        }

        return usageLogResponseDtos;
    }
}
