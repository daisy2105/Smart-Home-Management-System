package com.smarthome.energy.services;

import com.smarthome.energy.entities.Device;
import com.smarthome.energy.entities.UsageLog;
import com.smarthome.energy.model.DeviceStatus;
import com.smarthome.energy.model.DeviceType;
import com.smarthome.energy.repositories.DeviceRepository;
import com.smarthome.energy.repositories.UsageLogRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;


@Service
@AllArgsConstructor
public class EnergySimulationService {
    private final DeviceRepository deviceRepository;
    private final UsageLogRepository usageLogRepository;

    //Constants
    private static final BigDecimal ONE_MINUTE_IN_HOURS = new BigDecimal("0.016666667");

    private static final BigDecimal BASE_RATE = new BigDecimal("7.0");    // 7rs per kwh energy

    // device behaviour with particular hours of day
    private BigDecimal getDeviceBehaviorFactor(DeviceType deviceType, int hour){

        switch(deviceType){
            case LIGHT:
                if(hour>=18 && hour<=23) return BigDecimal.valueOf(1.3 + Math.random()*0.1);
                if(hour>=6 && hour<18) return new BigDecimal(".3");
                return new BigDecimal(".6");

            case FAN:
                if(hour>=12 && hour<=20) return BigDecimal.valueOf(1.15 + Math.random()*0.1);
                return new BigDecimal(".8");

            case AC:
                if(hour>=12 && hour<=17) return new BigDecimal("1.4"); // hot afternoon
                if(hour>=18 && hour<=22) return new BigDecimal("1.15"); // evening
                if(hour>=23 || hour<=6)  return new BigDecimal("0.6"); // night
                return new BigDecimal("1.0");

            case FRIDGE:
                if(Math.random() < 0.6) {
                    return BigDecimal.valueOf(0.8);   //since fridge operates in  cycles (cooling , no load)
                }
                return BigDecimal.valueOf(0.1);

            case HEATER:
                if(hour>=5 && hour<=9) {
                    if(Math.random() < 0.4) return BigDecimal.ONE;  //heater only operates for short time.
                    //since  math.random [0,1]  so probability is 40 true
                    // so 40 % of 4 hour(240 min ) is 96 min , so good realism.
                    return BigDecimal.ZERO;
                }
                return BigDecimal.ZERO;

            case WASHING_MACHINE:
                if(hour>=10 && hour<=12) return new BigDecimal("1.5"); //considered daily used for 2 hour
                return BigDecimal.ZERO; // since washing machine will not be used;

            case SECURITY_CAMERA: return new BigDecimal("0.7");

            case SMART_SPEAKER: return new BigDecimal("0.3");

            default: return BigDecimal.ONE;
        }
    }

    // time of the day factor for every device
    private BigDecimal getTimeOfDayFactor(int hour){
        // morning
        if(hour>=7 && hour <=10) return new BigDecimal("1.05");


        //evening
        if(hour>=18 && hour<=22) return new BigDecimal("1.08");


        //late night (sleep time)
        if(hour>=0 && hour<=5) return new BigDecimal("0.95");

        return BigDecimal.ONE;
    }


    //season factor
    private BigDecimal getSeasonFactor(DeviceType deviceType, Month currentMonth) {

        //summer months
        if (currentMonth.getValue() >= 4 && currentMonth.getValue() <= 7) {
            if (DeviceType.AC.equals(deviceType)) {
                return new BigDecimal("1.4");
            }
            if (DeviceType.FRIDGE.equals(deviceType)) {
                return new BigDecimal("1.2");
            }
            if (DeviceType.FAN.equals(deviceType)) {
                return new BigDecimal("1.3");
            }
            if (DeviceType.HEATER.equals(deviceType)) {
                return new BigDecimal("0.8");
            }
        }

        //winter months

        if (currentMonth.getValue() >= 11 || currentMonth.getValue() <= 2) {
            if (DeviceType.HEATER.equals(deviceType)) {
                return new BigDecimal("1.4");
            }
            if (DeviceType.AC.equals(deviceType)) {
                return new BigDecimal(".8");
            }
            if (DeviceType.FAN.equals(deviceType)) {
                return new BigDecimal(".8");
            }
        }
        return BigDecimal.ONE;
    }

    // since we are simulating energy consumption one_minute_in_hours (1 min)
    @Scheduled(fixedRate = 60000)   //fixedRate in milliseconds, therefore 60 secs
    @Transactional
    public void simulateEnergyUsage(){
        List<Device> deviceList = deviceRepository.findAll();

        LocalDateTime now = LocalDateTime.now();
        int hour = now.getHour();
        Month currentMonth = now.getMonth();
        boolean isWeekend = now.getDayOfWeek() == DayOfWeek.SATURDAY || now.getDayOfWeek() == DayOfWeek.SUNDAY;

        for(Device device: deviceList){
            if(device.getStatus()!=DeviceStatus.ON)continue;

            BigDecimal baseEnergy = device.getPowerRating().multiply(ONE_MINUTE_IN_HOURS);

            BigDecimal deviceFactor = getDeviceBehaviorFactor(device.getType(), hour);

            BigDecimal timeOfDay = getTimeOfDayFactor(hour);
            BigDecimal seasonFactor = getSeasonFactor(device.getType(),currentMonth);
            BigDecimal weekendFactor = isWeekend ? new BigDecimal("1.03") : BigDecimal.ONE;

            BigDecimal humanRandomFactor = BigDecimal.valueOf(0.95 + Math.random() * 0.1);

            BigDecimal finalEnergy = baseEnergy.multiply(deviceFactor)
                    .multiply(timeOfDay)
                    .multiply(seasonFactor)
                    .multiply(weekendFactor)
                    .multiply(humanRandomFactor);
            if(finalEnergy.compareTo(BigDecimal.ZERO)<=0) continue;

            BigDecimal cost = finalEnergy
                    .multiply(BASE_RATE)
                    .setScale(2, RoundingMode.HALF_UP);  // to get value upto only 2 decimal place

            UsageLog usageLog = UsageLog.builder()
                    .device(device)
                    .timestamp(now)
                    .energyUsed(finalEnergy)
                    .cost(cost)
                    .build();

            usageLogRepository.save(usageLog);
        }

    }


}
