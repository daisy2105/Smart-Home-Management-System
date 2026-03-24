package com.smarthome.energy.repositories;

import com.smarthome.energy.dto.*;
import com.smarthome.energy.entities.UsageLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface UsageLogRepository extends JpaRepository<UsageLog, Long> {


    List<UsageLog> findByUserIdAndDeviceIdAndTimestampBetween(
            Long userId,
            Long deviceId,
            LocalDateTime start,
            LocalDateTime end
    );

    //Energy Consumption Queries

    @Query("""
SELECT MONTH(u.timestamp), COALESCE(SUM(u.energyUsed),0)
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
from UsageLog u
where u.userId= :userId
and year(u.timestamp) = YEAR(current_date)
and month(u.timestamp) = MONTH(current_date)
""")
    BigDecimal getCurrentMonthEnergyConsumption(Long userId);


    @Query("""
SELECT coalesce(sum(u.energyUsed),0)
from UsageLog  u
where u.userId = :userId
and date(u.timestamp) = current_date
""")
    BigDecimal getTodayEnergyConsumption(Long userId);

    //Cost Queries
    @Query("""
SELECT coalesce(sum(u.cost), 0)
FROM UsageLog u
WHERE u.userId = :userId
AND date(u.timestamp) = current_date
""")
    BigDecimal getTodayCost(Long userId);

    @Query("""
SELECT coalesce(sum(u.cost), 0)
FROM UsageLog u
WHERE u.userId = :userId
AND year(u.timestamp) = year(current_date)
AND month(u.timestamp) = month(current_date)
""")
    BigDecimal getCurrentMonthCost(Long userId);

    @Query("""
select new com.smarthome.energy.dto.HourlyCostDto(
    year(u.timestamp),
    month(u.timestamp),
    day(u.timestamp),
    hour(u.timestamp),
    coalesce(sum(u.cost),0)
)
from UsageLog u
where u.userId = :userId
AND YEAR(u.timestamp) = YEAR(:date)
AND MONTH(u.timestamp) = MONTH(:date)
AND DAY(u.timestamp) = DAY(:date)
GROUP BY YEAR(u.timestamp), MONTH(u.timestamp), DAY(u.timestamp), HOUR(u.timestamp)
ORDER BY HOUR(u.timestamp)""")
    List<HourlyCostDto> getHourlyCost(Long userId, LocalDate date);

    @Query("""
SELECT new com.smarthome.energy.dto.DailyCostDto(
    YEAR(u.timestamp),
    MONTH(u.timestamp),
    DAY(u.timestamp),
    COALESCE(SUM(u.cost), 0)
)
FROM UsageLog u
WHERE u.userId = :userId
AND YEAR(u.timestamp) = :year
AND MONTH(u.timestamp) = :month
GROUP BY YEAR(u.timestamp), MONTH(u.timestamp), DAY(u.timestamp)
ORDER BY DAY(u.timestamp)
""")
    List<DailyCostDto> getDailyCost(Long userId, int year, int month);

    @Query("""
select new com.smarthome.energy.dto.MonthlyCostDto(
year(u.timestamp),
month(u.timestamp),
coalesce(sum(u.cost),0)
)
from UsageLog  u
where u.userId= :userId
and YEAR(u.timestamp)= :year
group by year(u.timestamp),month(u.timestamp)
order by month(u.timestamp)""")
    List<MonthlyCostDto> getMonthlyCost(Long userId, int year);
}
// year(), month(), day(), hour(), minute(), second,DayOfWeek() are time extract fun form the timestamp.
