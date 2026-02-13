package com.smarthome.energy.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;


@Getter
@Setter
@NoArgsConstructor
public class DevicePreferences {

    // Budget & Cost Control
    private Double monthlyBudget;

    // Alert Settings
    private Double overloadThreshold;
    private Boolean emailAlertsEnabled;
    private Boolean inAppAlertsEnabled;

    // Energy Optimization
    private Boolean energySavingMode;

    // Behavioral Pattern
    private LocalTime preferredStartTime;
    private LocalTime preferredEndTime;

    // Automation
    private Boolean autoSchedulingEnabled;

}
