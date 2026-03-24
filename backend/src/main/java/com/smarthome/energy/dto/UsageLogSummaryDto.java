package com.smarthome.energy.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsageLogSummaryDto {
    private List<UsageLogResponseDto> logs;
    private BigDecimal totalEnergy;
    private BigDecimal totalCost;
}