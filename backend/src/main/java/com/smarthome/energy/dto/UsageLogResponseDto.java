package com.smarthome.energy.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsageLogResponseDto {
    private Long id;
    private LocalDateTime timestamp;
    private BigDecimal energyUsed;
    private BigDecimal cost;
}
