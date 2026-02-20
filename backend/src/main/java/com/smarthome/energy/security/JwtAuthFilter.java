package com.smarthome.energy.security;


import com.smarthome.energy.services.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Log4j2
public class JwtAuthFilter extends OncePerRequestFilter {
    private final CustomUserDetailsService customUserDetailsService;

    private final AuthUtil authUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        log.info("incoming jwt request: {}", request.getRequestURI());

        String token = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if("accessToken".equals(cookie.getName())){
                    token = cookie.getValue();
                    break;// as found just break
                }
            }
        }

        if(token == null){  //if no token skip jwtFilter.
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String username = authUtil.getUsernameFromJwtToken(token);

            if(username!= null && SecurityContextHolder.getContext().getAuthentication() == null ) {

                SecurityUser securityUser = (SecurityUser)customUserDetailsService.loadUserByUsername(username);

                if(authUtil.validateJwtToken(token,securityUser)) {

                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(securityUser,
                            null, securityUser.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                }


            }
        }catch (io.jsonwebtoken.ExpiredJwtException e) {

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token Expired");
            return; // to stop filter chain

        } catch (Exception e) {

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid Token");
            return;
        }
        filterChain.doFilter(request, response);
    }
}
