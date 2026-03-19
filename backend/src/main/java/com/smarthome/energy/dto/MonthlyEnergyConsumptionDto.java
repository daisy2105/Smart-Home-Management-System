package com.smarthome.energy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Month;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class MonthlyEnergyConsumptionDto {
    private Integer year;
    private Integer month;
    private BigDecimal energyConsumption;
}
