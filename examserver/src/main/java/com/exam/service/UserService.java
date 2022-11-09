package com.exam.service;

import com.exam.model.User;
import com.exam.model.UserRole;

import java.util.Optional;
import java.util.Set;

public interface UserService {

    // creating User
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    // get user by username
    public User getUser(String username);

    // get user by id
    public User getUser(Long userId);

    // delete user by id
    public void deleteUser(Long userId);

    // update user by id
    public User updateUser(User userToUpdate, Long userId) throws Exception;
}
