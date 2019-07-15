package com.veeparch.mysql.dao;

import com.veeparch.annotation.TRepository;
import com.veeparch.bean.GraphSchema;

import java.util.List;

@TRepository
public interface GraphSchemaDao {
     List<GraphSchema> findAllGraphSchema();
     int updateGraphSchema(String s);
}
