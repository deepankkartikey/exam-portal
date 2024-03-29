package com.exam.controller;

import com.exam.helper.UserFoundException;
import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;

    // creating user
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {

        user.setProfile("default.png");

        // encoding password with BCryptPasswordEncoder
//        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
        user.setPassword(user.getPassword());

        Set<UserRole> roles = new HashSet<>();

        Role role = new Role();
        role.setRoleId(15L);
        role.setRoleName("NORMAL");

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        roles.add(userRole);

        return this.userService.createUser(user, roles);
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username) {
        return this.userService.getUser(username);
    }

    @DeleteMapping("{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        this.userService.deleteUser(userId);
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable("userId") Long userId, @RequestBody User user) throws Exception {
        User userToUpdate = this.userService.getUser(userId);
        User updatedUser = userToUpdate;
        updatedUser.setId(user.getId());
        updatedUser.setUsername(user.getUsername());
        updatedUser.setPassword(user.getPassword());
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setEmail(user.getEmail());
        updatedUser.setProfile(user.getProfile());
        updatedUser.setPhone(user.getPhone());

        this.userService.updateUser(updatedUser, userId);
        return updatedUser;
    }

    @ExceptionHandler(UserFoundException.class)
    public ResponseEntity<?> exceptionHandler(UserFoundException ex) {
        return ResponseEntity.ok(ex.getMessage());
    }
}
