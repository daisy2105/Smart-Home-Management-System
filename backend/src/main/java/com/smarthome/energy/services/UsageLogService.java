package com.smarthome.energy.services;

import com.smarthome.energy.dto.*;
import com.smarthome.energy.entities.Device;
import com.smarthome.energy.entities.User;
import com.smarthome.energy.repositories.DeviceRepository;
import com.smarthome.energy.repositories.UsageLogRepository;
import com.smarthome.energy.repositories.JpaUserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import org.springframework.security.access.AccessDeniedException;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
        return userRepository.findByEmail(email).orElseThrow(()-> new EntityNotFoundException("User Not Found"));
    }


    // user (homeowner should not log the energy usage, it should be iot or simulation generated.
    /*@Transactional
    public UsageLogResponseDto logEnergyUsage(Long id, @Valid UsageLogRequestDto usageLogRequestDto)  {
        Device device = deviceRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Device Not Found"));
        if(!device.getUser().getId().equals(getCurrentUser().getId())) {
            throw new AccessDeniedException("You do not have permission to log this device");
        }
        LocalDateTime deletedAt = deviceRepository.findDeletedAtById(id);

        boolean deviceDeleted = deletedAt != null;
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
                .deviceName(usageLog.getDeviceName())
                .deviceType(usageLog.getDeviceType())
                .deviceDeleted(deviceDeleted)
                .timestamp(usageLogSaved.getTimestamp())
                .energyUsed(usageLogSaved.getEnergyUsed())
                .cost(usageLogSaved.getCost()).
                build();

    }*/

    public UsageLogSummaryDto getTotalEnergyCostForDevice(Long id,
                                                          LocalDateTime start,
                                                          LocalDateTime end) {

        if (start.isAfter(end)) {
            throw new IllegalArgumentException("Start must be before end");
        }

        Long userId = getCurrentUser().getId();

        LocalDateTime deletedAt = deviceRepository.findDeletedAtById(id);

        if (deletedAt == null) {
            Device device = deviceRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Device not found"));

            if (!device.getUser().getId().equals(userId)) {
                throw new AccessDeniedException("Not your device");
            }
        }

        boolean deviceDeleted = deletedAt != null;

        UsageLogSummaryDto result =
                usageLogRepository.getTotalEnergyCostForDevice(
                        userId, id, start, end
                );

        // set deleted flag
        result.setDeviceDeleted(deviceDeleted);

        return result;
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
    public BigDecimal getTodayEnergyConsumption(){
        Long userId = getCurrentUser().getId();
        return usageLogRepository.getTodayEnergyConsumption(userId);
    }

    public BigDecimal getCurrentMonthEnergyConsumption(){
        Long userId = getCurrentUser().getId();
        return usageLogRepository.getCurrentMonthEnergyConsumption(userId);
    }

    //Cost Methods
    public List<DailyCostDto> getDailyCost(int year,int month){
        Long userId = getCurrentUser().getId();
        return usageLogRepository.getDailyCost(userId,year,month);
    }

    public List<HourlyCostDto> getHourlyCost(LocalDate date){
        Long userId = getCurrentUser().getId();
        return usageLogRepository.getHourlyCost(userId,date);

    }

    public List<MonthlyCostDto> getMonthlyCost(int year){
        Long userId = getCurrentUser().getId();
        return usageLogRepository.getMonthlyCost(userId, year);
    }

    public BigDecimal getTodayCost(){
        Long userId = getCurrentUser().getId();
        return usageLogRepository.getTodayCost(userId);
    }

    public BigDecimal getCurrentMonthCost(){
        Long userId = getCurrentUser().getId();
        return usageLogRepository.getCurrentMonthCost(userId);

    }
    //Aggregate Method
    public EnergyCostSummaryDto getTotalEnergyAndCost(LocalDateTime start,
                                                      LocalDateTime end) {

        if (start.isAfter(end)) {
            throw new IllegalArgumentException("Start must be before end");
        }

        Long userId = getCurrentUser().getId();

        EnergyCostSummaryDto result =
                usageLogRepository.getTotalEnergyAndCost(userId, start, end);

        // handle nulls safely
        if (result.getTotalEnergy() == null) {
            result.setTotalEnergy(BigDecimal.ZERO);
        }
        if (result.getTotalCost() == null) {
            result.setTotalCost(BigDecimal.ZERO);
        }

        return result;
    }

}
