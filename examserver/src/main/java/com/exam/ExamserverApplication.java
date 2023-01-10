package com.exam;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;
	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Starting code ...");

//		// creating user object
//		User newUser = new User();
//		newUser.setFirstName("Deepank");
//		newUser.setLastName("Kartikey");
//		newUser.setUsername("dkart060");
//		newUser.setPassword("123456");
//		newUser.setEmail("dkart060@uottawa.ca");
//		newUser.setProfile("dkart.png");
//
//		// creating role object
//		Role role1 = new Role();
//		role1.setRoleId(14L);
//		role1.setRoleName("ADMIN");
//
//		// creating userrole object using user and role
//		Set<UserRole> userRoleSet = new HashSet<>();
//		UserRole userRole = new UserRole();
//		userRole.setRole(role1);
//		userRole.setUser(newUser);
//
//		userRoleSet.add(userRole);
//
//		// create user using the service
//		User user1 = this.userService.createUser(newUser, userRoleSet);
//
//		System.out.println(user1.getUsername());

	}
}
