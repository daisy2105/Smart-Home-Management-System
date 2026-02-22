package com.smarthome.energy.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class UsageLogRequestDto {
    private LocalDateTime timestamp;

    private BigDecimal durationInHours;
}
