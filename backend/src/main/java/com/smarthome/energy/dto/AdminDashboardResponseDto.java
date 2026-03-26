package com.smarthome.energy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class AdminDashboardResponseDto {

    private long totalUsers;
    private long totalHomeowners;
    private long totalTechnicians;
    private long totalDevices;
    private BigDecimal totalEnergyUsage;
    private BigDecimal totalCost;

}