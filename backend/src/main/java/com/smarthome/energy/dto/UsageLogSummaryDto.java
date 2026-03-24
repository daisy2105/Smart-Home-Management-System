package com.smarthome.energy.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UsageLogSummaryDto {
    // constructor used by JPQL // since we can only get two fields not the deviceDeleted
    // from query so can't use Builder and AllArgsCtor.
    public UsageLogSummaryDto(BigDecimal totalEnergy, BigDecimal totalCost) {
        this.totalEnergy = totalEnergy != null ? totalEnergy : BigDecimal.ZERO;
        this.totalCost = totalCost != null ? totalCost : BigDecimal.ZERO;
    }

    private BigDecimal totalEnergy;
    private BigDecimal totalCost;
    private boolean deviceDeleted;
}