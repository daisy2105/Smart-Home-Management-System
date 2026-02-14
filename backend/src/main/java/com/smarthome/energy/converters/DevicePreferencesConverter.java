package com.smarthome.energy.converters;

import com.smarthome.energy.model.DevicePreferences;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import tools.jackson.databind.ObjectMapper;

@Converter(autoApply = false)  // auto apply to any entity having attribute DevicePreferences
public class DevicePreferencesConverter implements AttributeConverter<DevicePreferences, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();


    @Override
    public String convertToDatabaseColumn(DevicePreferences devicePreferences) {
        return  objectMapper.writeValueAsString(devicePreferences);
    }


    @Override
    public DevicePreferences convertToEntityAttribute(String s) {
        return objectMapper.readValue(s, DevicePreferences.class);
    }


}
