<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.bt_type" placeholder="输入图书类别" clearable :oninput="findBookInfo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getPages">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :inline="true"
      :data="lists"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
     
    >
      <el-table-column type="selection"  ></el-table-column>
      <el-table-column label="编号" prop="bt_id" ></el-table-column>
      <el-table-column prop="bt_type" label="图书类别"  :sortable='true'></el-table-column>
      <el-table-column label="操作" >
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination
         layout="total,sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		background
		:page-sizes="[5, 10, 20]" 
        :page-size="pageSize"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false" style="width:60%">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="图书类别" prop="bt_type">
          <el-input v-model="editForm.bt_type" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增图书类别" v-model="addFormVisible" :close-on-click-modal="false" style="width:60%">
      <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
        <el-form-item label="图书类别" prop="bt_type">
          <el-input v-model="addForm.bt_type" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
//import util from '../../common/js/util'
//import NProgress from 'nprogress'
import {
  getBookTypeList,
  removeBookType,
  batchRemoveBookType,
  editBookType,
  addBookType
} from "../../api/api";

export default {
  data() {
    return {
      filters: {
		    bt_id:"",
        bt_type:""
      },
      pageSize: 10,
      lists: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        bt_type: [
          { required: true, message: "请输入图书类别", trigger: "blur" }
        ]
      },
      //编辑界面数据
      editForm: {
        id: 0,
        bt_type: ""
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        bt_type: [
          { required: true, message: "请输入图书类别", trigger: "blur" }
        ]
      },
      //新增界面数据
      addForm: {
        bt_type: ""
      }
    };
  },
  computed: {
    findBookInfo: function() {
      if(this.filters.bt_type=="")
      return this.getPages();
    }
  },
  methods: {
	handleSizeChange(val){
	this.pageSize = val;
	this.getPages();
	},
    handleCurrentChange(val) {
      this.page = val;
      this.getPages();
    },
    //获取图书类别列表
    getPages: function() {
      let para = {
		page: this.page,
    pageSize: this.pageSize,
    bt_type: this.filters.bt_type
        //bt_type: this.filters.bt_type
      };
      this.listLoading = true;
      //NProgress.start();
      getBookTypeList(para).then(res => {
        console.log(res.data);
		console.log(res.data.list);
		//this.total = res.data.length;
		this.total = res.data.total;
		//this.lists = res.data;
        this.lists = res.data.list;
        this.listLoading = false;
        //NProgress.done();
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeBookType(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getPages();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        bt_type: ""
      };
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            editBookType(para).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getPages();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            addBookType(para).then(res => {
              this.addLoading = false;
              //NProgress.done();
              if(res.data.code==200){
              this.$message({
                message: res.data.msg,
                type: "success"
              });          
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getPages();
              }else{
                this.$message({
                message: res.data.msg,
                type: "error"
              }); 
              }
            });
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      var s=JSON.stringify(this.sels);
      console.log(s);
      var b=JSON.parse(s);
      var ids = b.map(item => item.bt_id).toString();
      console.log("sss"+JSON.stringify(this.sels));
      console.log("ids"+ids);
      console.log("miao"+b[0].bt_type);
      console.log(b);
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveBookType(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            if(res.data.code==200){
            this.$message({
              message: res.data.msg,
              type: "success",
              duration: 600
            });
            }else {
             this.$message({
              message: res.data.msg,
              type: "error",
              duration: 600
            }); 
            }
            this.getPages();
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getPages();
  }
};
</script>

<style scoped>
</style>