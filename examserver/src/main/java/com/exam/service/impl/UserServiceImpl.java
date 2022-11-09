package com.exam.service.impl;

import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User local = this.userRepository.findByUsername(user.getUsername());
        if(local != null){
            System.out.println("User is already there.");
            throw new Exception("User already present!");
        }
        else {
            // create user
            // put all roles in userroles
            // assign roles to user and save user
            for(UserRole ur: userRoles){
                roleRepository.save((ur.getRole()));
            }

            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);
        }
        return local;
    }

    // getting user by username
    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public User getUser(Long userId) {
        return this.userRepository.findById(userId).get();
    }

    // delete user by userId
    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    // update user by userId
    @Override
    public User updateUser(User updatedUser, Long userId) throws Exception {

        Optional<User> user = this.userRepository.findById(userId);

        if(user != null){
            // update user details
            this.userRepository.deleteById(userId);
            this.userRepository.save(updatedUser);
        }
        else {
            System.out.println("User with given ID not found in DB !!!");
            throw new Exception("User not found with given ID !!!");
        }
        return user.get();
    }
}
