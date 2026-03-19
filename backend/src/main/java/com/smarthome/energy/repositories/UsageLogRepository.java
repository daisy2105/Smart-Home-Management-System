package com.smarthome.energy.repositories;

import com.smarthome.energy.dto.DailyEnergyConsumptionDto;
import com.smarthome.energy.dto.HourlyConsumptionDto;
import com.smarthome.energy.entities.Device;
import com.smarthome.energy.entities.UsageLog;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface UsageLogRepository extends CrudRepository<UsageLog, Long> {

    
    List<UsageLog> findByDeviceAndTimestampBetween(
            Device device,
            LocalDateTime start,
            LocalDateTime end
    );
    @Query("""
SELECT MONTH(u.timestamp), COALESCE(SUM(u.energyUsed),0)
FROM UsageLog u
WHERE u.device.user.id = :userId
AND YEAR(u.timestamp) = :year
GROUP BY MONTH(u.timestamp)
ORDER BY MONTH(u.timestamp)
""")
    List<Object[]> getMonthlyEnergyConsumption(Long userId, int year);

    @Query("""
 select  new com.smarthome.energy.dto.DailyEnergyConsumptionDto(
 YEAR(u.timestamp),
 MONTH(u.timestamp),
 DAY(u.timestamp),
 coalesce(sum(u.energyUsed),0))
 from UsageLog u
 where u.device.user.id = :userId
 and YEAR (u.timestamp) = :year
 and MONTH (u.timestamp) = :month
 group by YEAR(u.timestamp), MONTH(u.timestamp), DAY(u.timestamp)
 order by day(u.timestamp)
""")
    List<DailyEnergyConsumptionDto> getDailyEnergyConsumption(Long userId, int year, int month);

    @Query("""
select new com.smarthome.energy.dto.HourlyConsumptionDto(
YEAR(u.timestamp),
MONTH(u.timestamp),
DAY(u.timestamp),
HOUR(u.timestamp),
coalesce(sum(u.energyUsed),0))
from UsageLog u
where u.device.user.id = :userId
and YEAR(u.timestamp) = YEAR(:date)
and MONTH(u.timestamp) = MONTH(:date)
and DAY(u.timestamp) = DAY(:date)
group by 
year (u.timestamp),
month(u.timestamp),
day(u.timestamp),
hour(u.timestamp)
order by HOUR(u.timestamp)
""")
    List<HourlyConsumptionDto> getHourlyConsumption(Long userId, LocalDate date);

}
// year(), month(), day(), hour(), minute(), second,DayOfWeek() are time extract fun form the timestamp.
