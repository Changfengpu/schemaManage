package com.veeparch.shiroConfig;
import java.util.HashSet;
import java.util.Set;

import com.veeparch.bean.User;
import com.veeparch.mysql.dao.RoleDao;
import com.veeparch.mysql.dao.UserDao;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import javax.management.relation.Role;


public class MyShiroRealm extends AuthorizingRealm {
    @Autowired
    UserDao userDao;

    @Autowired
    RoleDao roleDao;
    /*
     * 授权
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        String userName= (String) principals.getPrimaryPrincipal();
        User user=userDao.findUserByUserName(userName);
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        Role role=roleDao.findRoleById(user.getAuthority());
        info.addRole(role.getRoleName());
        return info;
    }

    /*
     * 登录验证
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        String userName= (String) token.getPrincipal();
        User user =userDao.findUserByUserName(token.getUsername());
        if(user==null){
            return  null;
        }
        String passWord=user.getPassWord();
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(userName,user.getPassWord(),this.getName());
        return  info;
    }

}