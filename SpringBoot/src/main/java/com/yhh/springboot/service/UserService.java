package com.yhh.springboot.service;

import com.yhh.springboot.entity.User;
import com.yhh.springboot.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

//service层，表示具体业务的实现层，一般要编写接口
@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    //表示User用户的新增和更新
    public int save(User user){
        //如果用户id不存在，则新增用户
        //反之，则更新用户信息
        if(user.getId() == null){
            return userMapper.insertUser(user);
        }else {
            return userMapper.updateUser(user);
        }
    }

    //实现分页查询,并返回总数和查询到的数据
    public Map<String,Object> queryUserWithPage(Integer pageNum, Integer pageSize) {
        pageNum = (pageNum - 1)*pageSize;
        Integer total = userMapper.selectAllCount();
        List<User> data = userMapper.selectUserByPage(pageNum,pageSize);
        Map<String,Object> dataMap = new HashMap<>();
        dataMap.put("data",data);
        dataMap.put("total",total);
        return dataMap;
    }
}
