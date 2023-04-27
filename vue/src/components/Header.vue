<template> 
    <div style="flex :1; font-size:18px"> 
        <span @click="collapse" >
        <component :is="iconName" style="width: 18px"></component>
        </span>
        <el-breadcrumb separator="/" style="font-size: 16px;display: inline-block; margin-left: 10px;">
        <el-breadcrumb-item v-for="(item) in tagList" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb> 
    </div>   
    <div class="toolbar">
        <span>Tom</span>
        <el-dropdown>
        <el-icon style="margin-right: 8px; margin-top: 1px"><ArrowDown /></el-icon>
        <template #dropdown>
            <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
        </template>
        </el-dropdown>         
    </div>
</template>

<script setup> 
    import { ref,getCurrentInstance,computed} from 'vue';
    import {ArrowDown} from '@element-plus/icons-vue'
    const props = defineProps(['iconName','collapse'])

    const currentInstance = getCurrentInstance()
    const {$route} = currentInstance.appContext.config.globalProperties;

    const tagList = computed(() => {
        console.log($route.matched)   
        return $route.matched
    })
</script>

<style>
.toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  } 
</style>