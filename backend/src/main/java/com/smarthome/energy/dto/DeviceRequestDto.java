package com.smarthome.energy.dto;


import com.smarthome.energy.model.DeviceStatus;
import com.smarthome.energy.model.DeviceType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
public class DeviceRequestDto {
    @NotBlank(message = "Name is required")
    private String name;
    @NotNull(message = "Device Type is required")
    private DeviceType type;
    @NotNull(message = "Power Rating is required")
    @Positive(message = "Power Rating must be greater than 0")
    private BigDecimal powerRating;

    @NotNull(message = "Device Status is required")
    private DeviceStatus status;
}
