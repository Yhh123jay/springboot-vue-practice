<template>

<el-scrollbar>
    <div style="margin: 10px 0">
        <el-input v-model="username" placeholder="请输入名称" style="width: 200px" :prefix-icon="Search"/>
        <el-input v-model="email" placeholder="请输入邮箱" style="width: 200px; margin-left: 5px" :prefix-icon="Position"/>
        <el-input v-model="address" placeholder="请输入地址" style="width: 200px; margin-left: 5px" :prefix-icon="Message"/>
        <el-button type="primary" style="margin-left: 5px" @click="load">搜索</el-button>
        <el-button type="success" style="margin-left: 5px" @click="reset">重置</el-button>
    </div>
    <div style="margin:10px 0">
        <el-button type="primary" style="margin-left: 5px" :icon="Plus" @click="handlerAdd">新增</el-button>
        <el-popconfirm
                width="220"
                confirm-button-text="OK"
                cancel-button-text="No, Thanks"
                :icon="InfoFilled"
                icon-color="#626AEF"
                title="Are you sure to delete this?"
                @confirm="handlerBatchDelete">
        <template #reference>
            <el-button type="danger" style="margin-left: 5px" :icon="Minus">批量删除</el-button>
        </template>
        </el-popconfirm>  
        <el-button type="primary" style="margin-left: 5px" :icon="Bottom">导入</el-button>
        <el-button type="primary" style="margin-left: 5px" :icon="Top">导出</el-button>
    </div>

    <el-table :data="tableData"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id" width="80" />
        <el-table-column prop="username" label="用户名" width="140" />
        <el-table-column prop="nickname" label="姓名" width="120" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="address" label="地址" />
        <el-table-column label="操作">
        <template #default="scope">
            <el-button type="success" :icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>                  
            <el-popconfirm
                width="220"
                confirm-button-text="OK"
                cancel-button-text="No, Thanks"
                :icon="InfoFilled"
                icon-color="#626AEF"
                title="Are you sure to delete this?"
                @confirm="handlerDelete(scope.row.id)">
                <template #reference>
                    <el-button type="danger" :icon="Delete">删除</el-button>
                </template>
            </el-popconfirm>                 
        </template>                       
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
        @current-change="handleCurrentChange"/>
    </div>
</el-scrollbar>

<el-dialog v-model="dialogFormVisible" title="新增用户" style="width: 30%;">
    <el-form :model="user" label-width="80px">
        <el-form-item label="用户名">
            <el-input v-model="user.username" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="昵称">
            <el-input v-model="user.nickname" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="user.email" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="user.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="地址">
            <el-input v-model="user.address" autocomplete="off"/>
        </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="saveUser">Confirm</el-button>
        </span>
    </template>
</el-dialog>
</template>

<script setup>
import {reactive, ref, shallowRef,onMounted,getCurrentInstance} from 'vue'
import {Menu as IconMenu, Message, Setting, Fold, ArrowDown, Expand,Search,Position,Plus,Minus,Bottom,Top,Edit,Delete,InfoFilled} from '@element-plus/icons-vue'
import * as Icon from '@element-plus/icons-vue'
import { ElMessage as message}  from 'element-plus';
//axios对象
const currentInstance = getCurrentInstance()
const {$request} = currentInstance.appContext.config.globalProperties;
//#region 接收数据并展示
  //接受数据
  let total = ref(0);
  let tableData = ref([])
  let currentPage = ref(1);
  let pageSize = ref(2);
  let small = ref(false)
  let username = ref("")
  let email = ref("")
  let address = ref("")
  const background = ref(false)
  const disabled = ref(false)
  //发送请求
  function load(){
    //axios请求
    $request.get("/user/page",{
        params: {
          pageNum: currentPage.value,
          pageSize: pageSize.value,
          username: username.value,
          email: email.value,
          address: address.value
        }
    }).then(res =>{
        //console.log(res)
        // console.log(username)
        tableData.value = res.records;
        total.value = res.total;
    })
    //fetch函数请求
    // fetch(`http://localhost:9090/user/page?pageNum=${currentPage.value}&pageSize=${pageSize.value}`).then(res => res.json()).then(res => {
    //   console.log(res)
    //   tableData.value = res.data;
    //   total.value = res.total;
    // })
  }
  function reset(){
    username.value = "";
    email.value = "";
    address.value = "";
    load();
  }
  //组件挂载时显示
  onMounted(()=> {
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
  //#endregion

//#region 对用户的增删改查
  //data
  //控制增加按钮表单弹窗可见性
  let dialogFormVisible = ref(false);
  //表单传来的数据
  let user = reactive({
    username: '',
    nickname: '',
    email: '',
    phone: '',
    address: ''
  })
  let multipleSelection = ref([]);
  //methods
  //点击增加按钮添加
  function handlerAdd(){
    user.username = '';
    user.nickname = '';
    user.email = '';
    user.phone = '';
    user.address = '';
    dialogFormVisible.value = true;
  }
  //点击确认按钮添加用户
  function saveUser(){
    $request.post("/user",user).then(res =>{
      if(res){
        message.success("保存成功");
        dialogFormVisible.value = false;
        load();
      }else{
        message.error("保存失败");
      }
    })
  }
  //点击编辑按钮修改用户信息
  function handleEdit(row){
    dialogFormVisible.value = true;
    user = row;
  }
  //点击删除按钮删除用户
  function handlerDelete(id){
    $request.delete(`/user/${id}`).then(res =>{
      if(res){
        message.success("删除成功");
        load();
      }else{
        message.error("删除失败");
      }
    })
  }
  //批量删除
  //选择多选框数据
  function handleSelectionChange(val){
    multipleSelection.value = val
  }
  //点击批量删除选中的用户
  function handlerBatchDelete(){
    let ids = multipleSelection.value.map(v => v.id);
    $request.delete("/user/delete/batch",{
      data:ids
    }).then(res =>{
      if(res){
        message.success("删除成功");
        load();
      }else{
        message.error("删除失败");
      }
    })
  }
  //#endregion
  
</script>

<style>

</style>