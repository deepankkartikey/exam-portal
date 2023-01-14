package com.exam.controller;

import com.exam.config.JwtUtils;
import com.exam.model.JwtRequest;
import com.exam.model.JwtResponse;
import com.exam.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticateController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    // generate token
    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        System.out.println("jwtRequest: "+ jwtRequest);
        try{
            authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
        }
        catch(UsernameNotFoundException e){
            e.printStackTrace();
            throw new Exception("User Not Found !");
        }

        // authentication successful
        // load user from userdetail service
        UserDetails userDetails = this.userDetailsService.loadUserByUsername((jwtRequest.getUsername()));
        String token = this.jwtUtils.generateToken((userDetails));
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        }
        catch(DisabledException e){
            throw new Exception("USER DISABLED " + e.getMessage());
        }
        catch(BadCredentialsException e){
            throw new Exception("Invalid Credentials "+ e.getMessage());
        }
    }
}
