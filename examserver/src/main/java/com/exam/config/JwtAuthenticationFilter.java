package com.exam.config;

import com.exam.service.impl.UserDetailsServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        // extract authorization header
        System.out.println("request: "+ request);
        System.out.println("request header names: "+ request.toString());
        final String requestTokenHeader = request.getHeader("Authorization");
        System.out.println("requestTokenHeader: " + requestTokenHeader);

        String username = null;
        String jwtToken = null;

        if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer ")){
            try{
                // extract JWT token and username
                jwtToken = requestTokenHeader.substring(7);
                username = this.jwtUtils.extractUsername(jwtToken);
                System.out.println("jwtToken: "+ jwtToken + "username: "+ username);
            }
            catch(ExpiredJwtException e){
                e.printStackTrace();
                System.out.println("jwt token has expired !!");
            }
            catch(Exception e){
                e.printStackTrace();
                System.out.println("error !!");
            }
        }
        else{
            System.out.println("Invalid JWT token: Not starts with Bearer !");
        }

        // once the token is validated, load user service and load user data
        if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
            final UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (this.jwtUtils.validateToken(jwtToken, userDetails)) {
                // token is valid
                // set authentication in security context holder
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            } else {
                System.out.println("JWT token is not valid !!");
            }

            // forward request after authorizing and filtering requests
            filterChain.doFilter(request, response);
        }
    }
}
