package com.yhh.springboot.controller;

import com.yhh.springboot.entity.User;
import com.yhh.springboot.mapper.UserMapper;
import com.yhh.springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

//controller层，处理页面跳转等操作
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserService userService;
    //查询所有数据
    @GetMapping("/")
    public List<User> index(){
        return userMapper.selectAll();
    }

    //新增和修改
    @PostMapping
    public Integer save(@RequestBody User user){
        return userService.save(user);
    }

    //删除
    @DeleteMapping("/{id}")
    public Integer deleteUser(@PathVariable("id") Integer id){
        return userMapper.deleteUserById(id);
    }

    //分页查询,通过sql语句来实现
    //接口路径：/user/page?pageNum=1&pageSize=10
    //使用RequestParam接受参数
    //(pageNum-1)*pageSize  pageSize
    @GetMapping("/page")
    public Map<String,Object> queryUserWithPage(@RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize){
        return userService.queryUserWithPage(pageNum,pageSize);
    }

}
