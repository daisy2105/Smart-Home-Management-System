package com.smarthome.energy.dto;


import com.smarthome.energy.model.DeviceStatus;
import com.smarthome.energy.model.DeviceType;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeviceResponseDto {

    private Long id;

    private String name;

    private DeviceType type;

    private BigDecimal powerRating;

    private DeviceStatus status;
}
