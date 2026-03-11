package com.smarthome.energy.services;

import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@AllArgsConstructor
public class TokenBlacklistService {
    private final RedisTemplate<String, String> redisTemplate;

    public void blacklistToken(String token, Long expiryTime) {
        redisTemplate.opsForValue().set(
                token,"blacklisted",
                expiryTime, TimeUnit.MILLISECONDS  // these are TTL (time to live) and its value,  not the key,value.
        );
    }
    public boolean isBlacklisted(String token) {
        return redisTemplate.hasKey(token);
    }

}
