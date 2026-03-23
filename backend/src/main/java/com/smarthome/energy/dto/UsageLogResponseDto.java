package com.smarthome.energy.dto;

import com.smarthome.energy.model.DeviceType;
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
    private String deviceName;
    private DeviceType deviceType;
    private boolean deviceDeleted;
    private LocalDateTime timestamp;
    private BigDecimal energyUsed;
    private BigDecimal cost;
}
