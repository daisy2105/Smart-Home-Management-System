package com.smarthome.energy.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeviceNameUpdateRequestDto {
    @NotBlank(message = "Name is required")
    private String name;

}
