package com.veeparch.bean;

import com.fasterxml.jackson.annotation.JsonView;

public class User {
    private  int id;
    private String userName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public int getAuthority() {
        return authority;
    }

    public void setAuthority(int authority) {
        this.authority = authority;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isForbidden() {
        return isForbidden;
    }

    public void setForbidden(boolean forbidden) {
        isForbidden = forbidden;
    }

    private String passWord;
    private String nickName;
    private int authority;
    private String phoneNumber;
    private boolean isForbidden;





}
