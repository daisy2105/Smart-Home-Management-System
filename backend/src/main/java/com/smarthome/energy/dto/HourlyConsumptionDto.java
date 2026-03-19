package com.smarthome.energy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class HourlyConsumptionDto {
    private Integer year;
    private Integer month;
    private Integer day;
    private Integer hour;
    private BigDecimal energyConsumption;
}
