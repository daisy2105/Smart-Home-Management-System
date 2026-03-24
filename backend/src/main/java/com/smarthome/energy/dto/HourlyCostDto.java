package com.smarthome.energy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Getter
@Setter
@AllArgsConstructor
@Builder
public class HourlyCostDto {
    private Integer year;
    private Integer month;
    private Integer day;
    private Integer hour;
    private BigDecimal cost;
}
