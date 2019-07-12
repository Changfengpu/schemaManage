package com.veeparch.controller;
import com.veeparch.bean.User;
import com.veeparch.mysql.dao.UserDao;
import net.sf.json.util.JSONUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ByteSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;


@Controller
public class UserController {
    @Resource
    private UserDao userDao;

    /**
     * 验证用户名和密码
     * @param :String username,String password
     * @return
     */
    @RequestMapping(value="/login.do",method=RequestMethod.POST)
    @ResponseBody
    public String checkLogin(HttpServletRequest request,String userName,String passWord) {
        String noUserData="zhewaod%$@312";//干绕数据，用于加密防止破解
        String ALGORITH_NAME = "md5";//加密类型md5
        int HASH_ITERATIONS = 2;//哈希次数
        try{
            String new_passWord=new SimpleHash(ALGORITH_NAME,passWord,ByteSource.Util.bytes(noUserData),HASH_ITERATIONS).toString();
            UsernamePasswordToken token = new UsernamePasswordToken(userName,new_passWord);
            Subject subject = SecurityUtils.getSubject();
                //使用shiro来验证
            token.setRememberMe(true);
            subject.login(token);//验证角色和权限

        }catch(Exception e) {
            return "Error";
        }
        return "Success";
    }


    /**
     * 退出登录
     */
    @RequestMapping(value="logout.do",method=RequestMethod.POST)
    @ResponseBody
    public String logout() {
        Subject currentUser = SecurityUtils.getSubject();
        currentUser.logout();
        return "Success";
    }


}
