<template>
  <el-container class="layout-container-demo" style="height: 100%">

    <el-aside :width="sideWidth+'px'" style="box-shadow: 2px 0 6px rgb(0 21 200); height: 100%" >
      <el-scrollbar>
        <el-menu 
                :default-openeds="['1', '3']"                
                style="overflow-x:hidden"
                background-color="#4F4F4F"
                text-color="#fff"
                active-text-color="#90EE90"
                :collapse-transition="false"
                :collapse="isCollapse"
        >
          <div style="height: 60px; line-height: 60px; text-align: center">
            <img src="../assets/logo.png" style="width: 25px; position: relative; top: 5px; margin-right: 5px">
            <b style="color:#cccccc" v-show="logoTextShow">后台管理系统</b>
          </div>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message/></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
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
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span>Navigator Two</span>
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>
              <span>Navigator Three</span>
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
    </el-aside>

    <el-container style="margin-left: 2px">   
      <el-header style="font-size: 12px; display:flex; align-items: center">
        <div style="flex :1; font-size:18px"> 
          <span @click="collapse" >
            <component :is="iconName" style="width: 20px"></component>
          </span>
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
      </el-header>

      <el-main>        
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
          </el-breadcrumb>        
          <el-scrollbar>
          <div style="margin: 10px 0">
              <el-input  placeholder="请输入名称" style="width: 200px" :prefix-icon="Search"/>
              <el-input  placeholder="请输入地址" style="width: 200px; margin-left: 5px" :prefix-icon="Position"/>
              <el-input  placeholder="请输入邮箱" style="width: 200px; margin-left: 5px" :prefix-icon="Message"/>
              <el-button type="primary" style="margin-left: 5px">搜索</el-button>
          </div>
          <div style="margin:10px 0">
            <el-button type="primary" style="margin-left: 5px" :icon="Plus">新增</el-button>
            <el-button type="danger" style="margin-left: 5px" :icon="Minus">删除</el-button>
            <el-button type="primary" style="margin-left: 5px" :icon="Bottom">导入</el-button>
            <el-button type="primary" style="margin-left: 5px" :icon="Top">导出</el-button>
          </div>

          <el-table :data="tableData">
            <el-table-column prop="id" label="id" width="80" />
            <el-table-column prop="username" label="用户名" width="140" />
            <el-table-column prop="nickname" label="姓名" width="120" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="phone" label="电话" />
            <el-table-column prop="address" label="地址" />

            <el-table-column label="操作">              
              <el-button type="success" :icon="Edit">编辑</el-button>
              <el-button type="danger" :icon="Delete">删除</el-button>
            </el-table-column>    
          </el-table>
          <div style="padding 10px 0">
             <el-pagination
              :current-page="currentPage"
              :page-size="pageSize"
              :page-sizes="[2, 5, 8, 10]"
              :small="small"
              :disabled="disabled"
              :background="background"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>

  </el-container>
</template>

<script setup>
  import {reactive, ref, shallowRef,onMounted} from 'vue'
  import {Menu as IconMenu, Message, Setting, Fold, ArrowDown, Expand,Search,Position,Plus,Minus,Bottom,Top,Edit,Delete} from '@element-plus/icons-vue'
  import * as Icon from '@element-plus/icons-vue'

  //接受数据
  let total = ref(0);
  let tableData = ref([])
  let currentPage = ref(1);
  let pageSize = ref(3);
  let small = ref(false)
  const background = ref(false)
  const disabled = ref(false)

  function load(){
    fetch(`http://localhost:9090/user/page?pageNum=${currentPage.value}&pageSize=${pageSize.value}`).then(res => res.json()).then(res => {
      console.log(res)
      tableData.value = res.data;
      total.value = res.total;
    })
  }
  //组件挂载时显示
  onMounted(()=>{
    load()
  })

  //分页处理,当每页数量变化时触发
  function handleSizeChange(_pageSize){
    console.log("val1",_pageSize)
    pageSize.value = _pageSize;
    load()
  }

  //当前页改变时触发
  function handleCurrentChange(_currentPage){
    console.log("val2",_currentPage)
    currentPage.value = _currentPage;
    load()
  }

  //处理收缩的数据和方法
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
  }
  .layout-container-demo .el-menu {
    height: 100vh;
    border-right: none;
  }
  .layout-container-demo .el-main {
    padding: 0;
  }
  .layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  } 
</style>