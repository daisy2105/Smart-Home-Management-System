package com.smarthome.energy.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CurrentPowerConsumptionDto {
    public BigDecimal currentPowerConsumption;
    public String unit;
}
