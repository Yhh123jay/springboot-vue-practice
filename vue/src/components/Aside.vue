<template>
<el-scrollbar>
    <el-menu 
        :default-openeds="['1', '3']"                
        style="overflow-x:hidden; overflow-y:hidden; height: 100vh;"
        background-color="#4F4F4F"
        text-color="#fff"
        active-text-color="#90EE90"
        :collapse-transition="false"
        :collapse="isCollapse"
        router
        >
        <div style="height: 60px; line-height: 60px; text-align: center">
            <img src="../assets/logo.png" style="width: 25px; position: relative; top: 5px; margin-right: 5px">
            <b style="color:#cccccc" v-show="logoTextShow">后台管理系统</b>
        </div>
        <el-menu-item index="/">
        <template #title>
            <el-icon><House /></el-icon>
            <span>主页</span>
        </template>
        <!-- <el-menu-item-group>
            <template #title>Group 1</template>
            <el-menu-item index="1-1">Option 1</el-menu-item>
            <el-menu-item index="1-2">Option 2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group 2">
            <el-menu-item index="1-3">Option 3</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
            <template #title>Option4</template>
            <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
        </el-sub-menu> -->
        </el-menu-item>
        <el-sub-menu index="2">
        <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>系统管理</span>
        </template>
        <el-menu-item-group>
            <template #title>用户</template>
            <el-menu-item index="/user">用户管理</el-menu-item>
            <el-menu-item index="2-2">Option 2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="设置">
            <el-menu-item index="2-3">系统设置</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="2-4">
            <template #title>Option 4</template>
            <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
        </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="3">
        <template #title>
            <el-icon><setting /></el-icon>
            <span>关于</span>
        </template>
        <el-menu-item-group>
            <template #title>Group 1</template>
            <el-menu-item index="3-1">Option 1</el-menu-item>
            <el-menu-item index="3-2">Option 2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group 2">
            <el-menu-item index="3-3">Option 3</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="3-4">
            <template #title>Option 4</template>
            <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
        </el-sub-menu>
        </el-sub-menu>
    </el-menu>
</el-scrollbar>
</template>

<script setup>
 import {Message,Menu as IconMenu,Setting,House} from '@element-plus/icons-vue'
 const props = defineProps(['isCollapse','logoTextShow'])
 console.log(props)
    
</script>

<style>
.el-menu{ 
    min-height: 100%;
    border-right: none;
}
</style>