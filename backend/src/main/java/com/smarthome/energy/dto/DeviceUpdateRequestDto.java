package com.smarthome.energy.dto;

import com.smarthome.energy.model.DeviceStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeviceUpdateRequestDto {
    @NotBlank(message = "Name is required")
    private String name;
    @NotNull(message = "Device Status is required")
    private DeviceStatus status;
}
