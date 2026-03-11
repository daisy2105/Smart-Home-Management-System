package com.smarthome.energy.controllers;

import com.smarthome.energy.dto.CurrentPowerConsumptionDto;
import com.smarthome.energy.dto.DailyEnergyConsumptionDto;
import com.smarthome.energy.dto.HourlyConsumptionDto;
import com.smarthome.energy.dto.MonthlyEnergyConsumptionDto;
import com.smarthome.energy.services.UsageLogService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/energy")
public class EnergyConsumptionController {
    private final UsageLogService usageLogService;


    @PreAuthorize("hasRole('HOMEOWNER')")
    @GetMapping("/current-load")
    public ResponseEntity<CurrentPowerConsumptionDto> getCurrentLoad() {
        return ResponseEntity.ok(usageLogService.getCurrentPowerConsumption());

    }

    @PreAuthorize("hasRole('HOMEOWNER')")
    @GetMapping("/hourly/{date}")
    public ResponseEntity<List<HourlyConsumptionDto>> getHourlyConsumption(@PathVariable
                                                                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                                               LocalDate date) {
        return ResponseEntity.ok(usageLogService.getHourlyConsumption(date));
    }

    @PreAuthorize("hasRole('HOMEOWNER')")
    @GetMapping("/daily/{year}/{month}")
    public ResponseEntity<List<DailyEnergyConsumptionDto>> getDailyConsumption(@PathVariable int year, @PathVariable int month) {
        return ResponseEntity.ok(usageLogService.getDailyEnergyConsumption(year, month));

    }

    @PreAuthorize("hasRole('HOMEOWNER')")
    @GetMapping("/monthly/{year}")
    public ResponseEntity<List<MonthlyEnergyConsumptionDto>> getMonthlyConsumption(@PathVariable int year) {
        return ResponseEntity.ok(usageLogService.getMonthlyEnergyConsumption(year));
    }


}
