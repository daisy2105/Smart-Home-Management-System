package com.smarthome.energy.dto;

import com.smarthome.energy.model.DeviceStatus;
import com.smarthome.energy.model.DeviceType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TechUpdateDeviceRequestDto {

    private String name;

    private BigDecimal powerRating;


    private DeviceStatus status;
}
