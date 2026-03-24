package com.smarthome.energy.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EnergyCostSummaryDto {
    private BigDecimal totalEnergy;
    private BigDecimal totalCost;
}