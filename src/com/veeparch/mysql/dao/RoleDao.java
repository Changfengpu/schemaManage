package com.veeparch.mysql.dao;

import com.veeparch.annotation.TRepository;

import javax.management.relation.Role;

@TRepository
public interface RoleDao {
    Role findRoleById(int id);
}
