package com.smarthome.energy.controllers;

import com.smarthome.energy.dto.*;
import com.smarthome.energy.services.UsageLogService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/cost")
public class EnergyCostController {
    private final UsageLogService usageLogService;

    @PreAuthorize("hasRole('HOMEOWNER')")
    @GetMapping("/hourly/{date}")
    public ResponseEntity<List<HourlyCostDto>> getHourlyCost(@PathVariable
                                                                           @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                                           LocalDate date) {
        return ResponseEntity.ok(usageLogService.getHourlyCost(date));
    }

    @PreAuthorize("hasRole('HOMEOWNER')")
    @GetMapping("/daily/{year}/{month}")
    public ResponseEntity<List<DailyCostDto>> getDailyCost(@PathVariable int year, @PathVariable int month) {
        if (month < 1 || month > 12) throw new IllegalArgumentException("Invalid Month");
        return ResponseEntity.ok(usageLogService.getDailyCost(year, month));

    }

    @PreAuthorize("hasRole('HOMEOWNER')")
    @GetMapping("/monthly/{year}")
    public ResponseEntity<List<MonthlyCostDto>> getMonthlyCost(@PathVariable int year) {
        return ResponseEntity.ok(usageLogService.getMonthlyCost(year));
    }

    @PreAuthorize("hasRole('HOMEOWNER')")
    @GetMapping("/today")
    public ResponseEntity<BigDecimal> getTodayCost(){
        return ResponseEntity.ok(usageLogService.getTodayCost());
    }

    @PreAuthorize("hasRole('HOMEOWNER')")
    @GetMapping("/this-month")
    public ResponseEntity<BigDecimal> getCurrentMonthCost(){
        return ResponseEntity.ok(usageLogService.getCurrentMonthCost());
    }

}
