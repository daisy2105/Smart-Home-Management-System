package com.smarthome.energy.controllers;


import com.smarthome.energy.dto.UsageLogRequestDto;
import com.smarthome.energy.dto.UsageLogResponseDto;
import com.smarthome.energy.entities.UsageLog;
import com.smarthome.energy.services.UsageLogService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/devices")
public class UsageLogController {

    private final UsageLogService usageLogService;
    @PreAuthorize("hasRole('HOMEOWNER')")
    @PostMapping("{id}/usage")   // here id is Device id , not logId
    public ResponseEntity<UsageLogResponseDto> addEnergyUsageLog(@PathVariable Long id,
                                                      @Valid @RequestBody UsageLogRequestDto usageLogRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
                usageLogService.logEnergyUsage(id,usageLogRequestDto));

    }
    @PreAuthorize("hasRole('HOMEOWNER')")   // here also id is Device id.
    @GetMapping("{id}/usage")    //Get should not have request body (REST principle)
    public ResponseEntity<List<UsageLogResponseDto>> getEnergyUsageLog(@PathVariable Long id,
                                                                       @RequestParam() LocalDateTime start, @RequestParam() LocalDateTime end )
    {
        // start = 2026-02-22T00:00:00   means 0 time at 2026/2/22
        //  end   = 2026-02-22T15:30:00  means 2:30 time today

        return ResponseEntity.status(HttpStatus.OK).body(usageLogService.getEnergyUsageLog(id,start,end));
    }
}
