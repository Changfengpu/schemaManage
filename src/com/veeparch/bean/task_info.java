package com.veeparch.bean;

public class task_info {
    private int id;
    private String miaoshu;
    private int user_id;
    private int a_pass;
    private int b_pass;
    private int c_pass;
    private String start_time;

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    private String status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMiaoshu() {
        return miaoshu;
    }

    public void setMiaoshu(String miaoshu) {
        this.miaoshu = miaoshu;
    }

    public int getA_pass() {
        return a_pass;
    }

    public void setA_pass(int a_pass) {
        this.a_pass = a_pass;
    }

    public int getB_pass() {
        return b_pass;
    }

    public void setB_pass(int b_pass) {
        this.b_pass = b_pass;
    }

    public int getC_pass() {
        return c_pass;
    }

    public void setC_pass(int c_pass) {
        this.c_pass = c_pass;
    }

    public String getStart_time() {
        return start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }
    
}
