<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside :width="sideWidth+'px'" style="box-shadow: 2px 0 6px rgb(0 21 200); height: 100%">
      <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow" style="height: 100%"></Aside>
    </el-aside>

    <el-container style="margin-left: 2px;">    
      <el-header style="font-size: 12px; display:flex; align-items: center; background-color:aliceblue">
        <Header :collapse="collapse" :iconName="iconName"></Header>
      </el-header>

      <el-main>   
        <!-- 表示当前页面的子路由会在router-view中展示      -->
          <router-view/>
      </el-main>
    </el-container>

  </el-container>
</template>

<script setup>
  import {reactive, ref, shallowRef,onMounted,getCurrentInstance} from 'vue'
  import {Menu as IconMenu, Message, Setting, Fold, ArrowDown, Expand,Search,Position,Plus,Minus,Bottom,Top,Edit,Delete,InfoFilled} from '@element-plus/icons-vue'
  import * as Icon from '@element-plus/icons-vue'
  import { ElMessage as message}  from 'element-plus';

  //引入commponet组件
  import Aside from '@/components/Aside.vue';
  import Header from "@/components/Header.vue"

  // //axios对象
  // const currentInstance = getCurrentInstance()
  // const {$request} = currentInstance.appContext.config.globalProperties;

  //#region 处理页面收缩
  let isCollapse = ref(false);
  let sideWidth = ref(200);
  let logoTextShow = ref(true);
  let iconName = shallowRef(Fold);

  function collapse(){
    //点击收缩按钮触发
    //注意：用ref封装的数据需要用value取到
    isCollapse.value = !isCollapse.value;

    if(isCollapse.value){
      sideWidth.value = 64;
      logoTextShow.value = false;
      iconName.value = Expand
    }else{
      sideWidth.value = 200;
      logoTextShow.value = true;
      iconName.value = Fold
    }     
  } 
//#endregion
</script>

<style scoped>
  .layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }
  .layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
    position: relative;
  }
  .layout-container-demo .el-main {
    padding: 0;
  }
</style>