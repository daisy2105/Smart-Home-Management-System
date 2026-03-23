package com.smarthome.energy.services;

import com.smarthome.energy.dto.*;
import com.smarthome.energy.entities.Device;
import com.smarthome.energy.entities.UsageLog;
import com.smarthome.energy.entities.User;
import com.smarthome.energy.model.DeviceStatus;
import com.smarthome.energy.repositories.DeviceRepository;
import com.smarthome.energy.repositories.UsageLogRepository;
import com.smarthome.energy.repositories.JpaUserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import org.springframework.security.access.AccessDeniedException;

import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
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
        return userRepository.findByEmail(email).orElseThrow(()-> new EntityNotFoundException("User not found"));
    }


    // user (homeowner should not log the energy usage, it should be iot or simulation generated.
    @Transactional
    public UsageLogResponseDto logEnergyUsage(Long id, @Valid UsageLogRequestDto usageLogRequestDto)  {
        Device device = deviceRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Device not found"));
        if(!device.getUser().getId().equals(getCurrentUser().getId())) {
            throw new AccessDeniedException("You do not have permission to log this device");
        }
        BigDecimal energyUsed = usageLogRequestDto.getDurationInHours()
                .multiply(device.getPowerRating())
                .divide(new BigDecimal("1000"), 6, RoundingMode.HALF_UP);//  since energy in W, not in kW
        BigDecimal cost = energyUsed.multiply(rate);
        UsageLog usageLog = UsageLog.builder()
                .device(device)
                .userId(device.getUser().getId())
                .deviceName(device.getName())
                .deviceType(device.getType())
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

        if (start.isAfter(end)) {
            throw new IllegalArgumentException("Start must be before end");
        }
        LocalDateTime deletedAt = deviceRepository.findDeletedAtById(id);

        if (deletedAt == null && !deviceRepository.existsById(id)) {
            throw new EntityNotFoundException("Device not found");
        }

        boolean deviceDeleted = deletedAt != null;


        List<UsageLog> usageLogs =
                usageLogRepository.findByUserIdAndDeviceIdAndTimestampBetween(
                        getCurrentUser().getId(),
                        id,
                        start,
                        end
                );
        //above ensures that each user can only see their device only
        if (usageLogs.isEmpty()) {
            throw new EntityNotFoundException("No logs found for this device or access denied");
        } // this checks if currentUser has that device or not or he is trying to access  another user's device


        List<UsageLogResponseDto> usageLogResponseDtos = new ArrayList<>();

        for (UsageLog usageLog : usageLogs) {

            UsageLogResponseDto response =
                    UsageLogResponseDto.builder()
                            .id(usageLog.getId())
                            .deviceName(usageLog.getDeviceName())
                            .deviceType(usageLog.getDeviceType())
                            .deviceDeleted(deviceDeleted)
                            .timestamp(usageLog.getTimestamp())
                            .energyUsed(usageLog.getEnergyUsed())
                            .cost(usageLog.getCost())
                            .build();

            usageLogResponseDtos.add(response);
        }

        return usageLogResponseDtos;
    }

    public CurrentPowerConsumptionDto getCurrentPowerConsumption() {
        Long userId = getCurrentUser().getId();
        BigDecimal currentPowerConsumption = deviceRepository.getCurrentPowerConsumption(userId);
        return CurrentPowerConsumptionDto.builder()
                .currentPowerConsumption(currentPowerConsumption)
                .unit("W")
                .build();
    }

    public List<MonthlyEnergyConsumptionDto> getMonthlyEnergyConsumption(int year){
        Long userId = getCurrentUser().getId();
        List<Object[] > monthlyConsumption = usageLogRepository.getMonthlyEnergyConsumption(userId, year);
        return monthlyConsumption.stream().map(
                r->MonthlyEnergyConsumptionDto.builder()
                        .year(year)
                        .month((Integer) r[0])
                        .energyConsumption((BigDecimal)r[1])
                        .build()).toList();


    }
    public List<DailyEnergyConsumptionDto> getDailyEnergyConsumption(int year, int month){
        Long userId = getCurrentUser().getId();
        return usageLogRepository.getDailyEnergyConsumption(userId, year, month);

    }
    public List<HourlyConsumptionDto> getHourlyConsumption(LocalDate date){
        Long userId = getCurrentUser().getId();
        return usageLogRepository.getHourlyConsumption(userId , date);
    }

}
