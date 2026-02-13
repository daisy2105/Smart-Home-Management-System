package com.smarthome.energy.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class AuthUtil {
    @Value("${jwt.secret-key}")
    private String jwtSecretKey;

    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }
    private Claims extractAllClaims(String jwtToken) {
        return Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(jwtToken)
                .getPayload();
    }

    public String generateJwtToken(SecurityUser securityUser) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role",securityUser.getAuthorities());
        return Jwts.builder().expiration(new Date(System.currentTimeMillis() + 10000 * 60 * 30))
                .claims(claims)
                .subject(securityUser.getUsername())
                .issuedAt(new Date())
                .signWith(getSecretKey())
                .compact();
    }
    public String getUsernameFromJwtToken(String jwtToken) {
        return extractAllClaims(jwtToken).getSubject();
    }
    public boolean isTokenExpired(String jwtToken) {
        return extractAllClaims(jwtToken).getExpiration().before(new Date());
    }

    public boolean validateJwtToken(String jwtToken, SecurityUser securityUser) {
        String username = getUsernameFromJwtToken(jwtToken);
        return securityUser.getUsername().equals(username) &&!isTokenExpired(jwtToken) ;
    }

}
