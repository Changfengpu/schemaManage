package com.veeparch.bean;

public class curd_info {
    private int id;
    private String type;
    private int user_id;
    private String target_table;
    private String insert_info;
    private int update_id;
    private String preValue;
    private String curValue;
    private String option_time;
    private String status;

    public String getCurValue() {
        return curValue;
    }

    public void setCurValue(String curValue) {
        this.curValue = curValue;
    }

    public String getOption_time() {
        return option_time;
    }

    public void setOption_time(String option_time) {
        this.option_time = option_time;
    }

    public String getPreValue() {
        return preValue;
    }

    public void setPreValue(String preValue) {
        this.preValue = preValue;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getTarget_table() {
        return target_table;
    }

    public void setTarget_table(String target_table) {
        this.target_table = target_table;
    }

    public String getInsert_info() {
        return insert_info;
    }

    public void setInsert_info(String insert_info) {
        this.insert_info = insert_info;
    }

    public int getUpdate_id() {
        return update_id;
    }

    public void setUpdate_id(int update_id) {
        this.update_id = update_id;
    }
}


