package com.smarthome.energy.dto;

import com.smarthome.energy.model.DeviceAction;
import lombok.*;
import org.aspectj.apache.bcel.generic.LineNumberGen;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class DeviceActionResponseDto {
    private Long deviceId;
    private String deviceName;
    private String message;
    private DeviceAction action;
}
