package com.veeparch.bean;

public class curd_info {
    private int id;
    private String type;
    private int user_id;
    private String target_table;
    private String insert_info;
    private int update_id;
    private String update_set;
    private String update_value;

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

    public String getUpdate_set() {
        return update_set;
    }

    public void setUpdate_set(String update_set) {
        this.update_set = update_set;
    }

    public String getUpdate_value() {
        return update_value;
    }

    public void setUpdate_value(String update_value) {
        this.update_value = update_value;
    }
}
