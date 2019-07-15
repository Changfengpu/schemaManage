package com.veeparch.controller;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageInterceptor;
import com.veeparch.bean.GraphSchema;
import com.veeparch.mysql.dao.GraphSchemaDao;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Controller
public class GraphSchemaController {
    @Resource
    private GraphSchemaDao graphSchemaDao;

    @ResponseBody
    @RequestMapping(value = "getAllGraphschema.do")
    public PageInfo<GraphSchema> getAllGraphschema(@RequestParam(value = "pageNum",defaultValue = "1")int pageNum){
        PageHelper.startPage(Integer.valueOf(pageNum),50);
        List<GraphSchema> graphSchemas= graphSchemaDao.findAllGraphSchema();
        PageInfo<GraphSchema> pageInfo=new PageInfo<>(graphSchemas);
        return pageInfo;
    }

}
