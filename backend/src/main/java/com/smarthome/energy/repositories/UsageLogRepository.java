package com.smarthome.energy.repositories;

import com.smarthome.energy.dto.DailyEnergyConsumptionDto;
import com.smarthome.energy.dto.HourlyConsumptionDto;
import com.smarthome.energy.entities.Device;
import com.smarthome.energy.entities.UsageLog;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface UsageLogRepository extends CrudRepository<UsageLog, Long> {


    List<UsageLog> findByUserIdAndDeviceIdAndTimestampBetween(
            Long userId,
            Long deviceId,
            LocalDateTime start,
            LocalDateTime end
    );


    @Query("""
SELECT MONTH(u.timestamp), COALESCE(SUM(u.energyUsed), 0)
FROM UsageLog u
WHERE u.userId = :userId
AND YEAR(u.timestamp) = :year
GROUP BY MONTH(u.timestamp)
ORDER BY MONTH(u.timestamp)
""")
    List<Object[]> getMonthlyEnergyConsumption(Long userId, int year);

    @Query("""
SELECT new com.smarthome.energy.dto.DailyEnergyConsumptionDto(
    YEAR(u.timestamp),
    MONTH(u.timestamp),
    DAY(u.timestamp),
    COALESCE(SUM(u.energyUsed), 0)
)
FROM UsageLog u
WHERE u.userId = :userId
AND YEAR(u.timestamp) = :year
AND MONTH(u.timestamp) = :month
GROUP BY YEAR(u.timestamp), MONTH(u.timestamp), DAY(u.timestamp)
ORDER BY DAY(u.timestamp)
""")
    List<DailyEnergyConsumptionDto> getDailyEnergyConsumption(Long userId, int year, int month);

    @Query("""
SELECT new com.smarthome.energy.dto.HourlyConsumptionDto(
    YEAR(u.timestamp),
    MONTH(u.timestamp),
    DAY(u.timestamp),
    HOUR(u.timestamp),
    COALESCE(SUM(u.energyUsed), 0)
)
FROM UsageLog u
WHERE u.userId = :userId
AND YEAR(u.timestamp) = YEAR(:date)
AND MONTH(u.timestamp) = MONTH(:date)
AND DAY(u.timestamp) = DAY(:date)
GROUP BY YEAR(u.timestamp), MONTH(u.timestamp), DAY(u.timestamp), HOUR(u.timestamp)
ORDER BY HOUR(u.timestamp)
""")
    List<HourlyConsumptionDto> getHourlyConsumption(Long userId, LocalDate date);


    @Query("""
SELECT coalesce(sum(u.energyUsed),0)
from UsageLog  u
where u.userId = :userId
and date(u.timestamp) = current_date
""")
    BigDecimal getTodayEnergyConsumption(Long userId);


    @Query("""
SELECT coalesce(sum(u.energyUsed),0)
from UsageLog u
where u.userId= :userId
and year(u.timestamp) = YEAR(current_date )
and month(u.timestamp) = MONTH(current_date )
""")
    BigDecimal getCurrentMonthEnergyConsumption(Long userId);

}




// year(), month(), day(), hour(), minute(), second,DayOfWeek() are time extract fun form the timestamp.
