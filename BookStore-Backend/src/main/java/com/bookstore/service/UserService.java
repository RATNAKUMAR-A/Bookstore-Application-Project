package com.bookstore.service;

import com.bookstore.exception.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.bookstore.dao.RoleDao;
import com.bookstore.dao.UserDao;
import com.bookstore.entity.Role;
import com.bookstore.entity.User;


@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void initRoleAndUser() {

        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role for newly created record");
        roleDao.save(userRole);

        User adminUser = new User();
        adminUser.setUserName("admin");
        adminUser.setUserPassword(getEncodedPassword("admin@123"));
        adminUser.setUserFirstName("admin");
        adminUser.setUserLastName("admin");
//        Set<Role> adminRoles = new HashSet<>();
//        adminRoles.add(adminRole);
//        adminUser.setRole(adminRoles);
        adminUser.setRole(adminRole);

        userDao.save(adminUser);

        User user = new User();
        user.setUserName("user");
        user.setUserPassword(getEncodedPassword("user@123"));
        user.setUserFirstName("User");
        user.setUserLastName("Details");
//        Set<Role> userRoles = new HashSet<>();
//        userRoles.add(userRole);
//        user.setRole(userRoles);
        user.setRole(userRole);
        userDao.save(user);
    }

    public User registerNewUser(User user) {
        User existingUser = userDao.findById(user.getUserName()).orElse(null);
        if (existingUser != null) {
            // User with the same username exists

            throw new UserAlreadyExistsException("Username is already taken");
        } else {
            // User does not exist, proceed with registration
            Role role = roleDao.findById("User").get();
            user.setRole(role);
            user.setUserPassword(getEncodedPassword(user.getUserPassword()));
            return userDao.save(user);
        }
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public User findUser(String userName) {
        return userDao.findById(userName).get();
    }

    public void deleteUser(String userName) {
        userDao.deleteById(userName);
    }

    public User updateUser(User user) {
        return userDao.save(user);
    }
}
