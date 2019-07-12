package com.veeparch.mysql.dao;


import com.veeparch.annotation.TRepository;
import com.veeparch.bean.User;

@TRepository
public interface UserDao {
    User findUserByUserName(String userName);
}
