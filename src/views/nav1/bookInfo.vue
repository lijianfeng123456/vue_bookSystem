<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input
            v-model="filters.bi_name"
            placeholder="输入图书名称"
            clearable
            :oninput="findBookInfo"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getPages">查询</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>-->
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :inline="true"
      :data="lists"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      :row-style="{height:'80px'}"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="bi_id" label="图书编号" v-if="false"></el-table-column>
      <el-table-column prop="bi_name" label="图书名称"></el-table-column>
      <el-table-column prop="bi_author" label="图书作者"></el-table-column>
      <el-table-column prop="bi_publish" label="图书出版"></el-table-column>
      <el-table-column prop="bt_type" label="图书类别"></el-table-column>
      <el-table-column prop="bi_pubDate" label="出版时间" width="115px" :formatter="qudiaoxiaoshudian1"></el-table-column>
      <el-table-column prop="bi_putTime" label="上架时间" width="115px" :formatter="qudiaoxiaoshudian2"></el-table-column>
      <el-table-column prop="bi_pubTime" label="印刷次数" align="center"></el-table-column>
      <el-table-column prop="bi_unitPrice" label="图书单价" align="center"></el-table-column>
      <el-table-column prop="bi_il" label="借阅积分" align="center"></el-table-column>
      <el-table-column prop="bi_num" label="图书数量" align="center"></el-table-column>
      <el-table-column prop="bi_img" label="图书封面">
        <template slot-scope="scope">
          <el-popover placement="left" title trigger="hover">
            <img :src="scope.row.bi_img" style="max-height: 400px;max-width: 500px">
            <img
              slot="reference"
              :src="scope.row.bi_img"
              :alt="scope.row.picture"
              style="max-height: 50px;max-width: 88px;min-width:80px"
            >
          </el-popover>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="bi_abstract" label="图书简介"  ></el-table-column> -->

      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <br>
          <el-button
            type="danger"
            size="small"
            @click="handleDel(scope.$index, scope.row)"
            style="margin-top:10px"
          >删除</el-button>
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
    <el-dialog
      title="编辑"
      v-model="editFormVisible"
      :close-on-click-modal="false"
      style="width:2000px;"
    >
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="图书ID" prop="bi_id">
          <el-input v-model="editForm.bi_id" auto-complete="off" disabled style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="图书名称" prop="bi_name">
          <el-input v-model="editForm.bi_name" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="图书作者" prop="bi_author">
          <el-input v-model="editForm.bi_author" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <!-- <el-form-item label="图书类别" prop="bt_type">
          <el-input v-model="editForm.bt_type" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>-->
        <el-form-item label="图书分类" prop="bt_type">
          <div v-if="book_type!=null">
            <el-select v-model="editForm.bt_type" style="width:50%;" auto-complete="off">
              <!--clearable:清除选择-->
              <el-option
                v-for="item in book_type"
                :key="item.bt_id"
                :label="item.bt_type"
                :value="item.bt_type"
              ></el-option>
            </el-select>
          </div>
          <div v-if="book_type==null">
            <span style="color:red">* 404 Not Found：系统找不到图书类别,请查看图书分类是否存有具体的图书类别！</span>
          </div>
        </el-form-item>
        <el-form-item label="出版时间" required>
          <el-form-item prop="bi_pubDate">
            <el-date-picker
              type="datetime"
              placeholder="选择出版时间"
              v-model="editForm.bi_pubDate"
              auto-complete="off"
              style="width: 50%;"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
              @change="changePubDate"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="上架时间" required>
          <el-form-item prop="bi_putTime">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              v-model="editForm.bi_putTime"
              auto-complete="off"
              style="width: 50%;"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
              @change="changePutTime"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>

        <el-form-item label="是否推送" prop="push">
          <el-switch
            on-text="是"
            off-text="否"
            v-model="editForm.push"
            @change="selectPush"
            auto-complete="off"
          ></el-switch>
        </el-form-item>
        <el-form-item label="印刷次数" prop="bi_pubTime">
          <el-input
            v-model="editForm.bi_pubTime"
            style="width:180px"
            type="number"
            :min="0"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图书单价" prop="bi_unitPrice">
          <el-input
            v-model="editForm.bi_unitPrice"
            style="width:180px"
            type="number"
            :min="0"
            auto-complete="off"
          >
            <div slot="prepend">￥</div>
          </el-input>
        </el-form-item>
        <el-form-item label="借阅积分" prop="bi_il">
          <el-input-number
            auto-complete="off"
            v-model="editForm.bi_il"
            controls-position="left"
            :min="0"
            :max="100"
            type="number"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="图书数量" prop="bi_num">
          <el-input-number
            v-model="editForm.bi_num"
            :min="0"
            :max="1000"
            type="number"
            auto-complete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="图书封面" prop="bi_img">
          <img
            width="100%"
            alt
            :src="editForm.bi_img"
            style="max-height: 120px;max-width: 175px;min-width:150px;border-style: outset"
          >
        </el-form-item>
        <el-form-item label="图书简介" prop="bi_abstract">
          <el-input type="textarea" v-model="editForm.bi_abstract" autosize auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!-- 新增界面
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
    </el-dialog>-->
  </section>
</template>

<script>
//import util from '../../common/js/util'
//import NProgress from 'nprogress'
import {
  getBookList,
  removeBook,
  batchRemoveBook,
  editBook,
  allBookType
} from "../../api/api";

export default {
  data() {
    return {
      flag: false,
      dialogImageUrl: "",
      dialogVisible: false,
      filters: {
        bi_id: "",
        bi_name: "",
        bi_author: "",
        bi_publish: "",
        bi_pubDate: "",
        bi_putTime: "",
        bi_pubTime: 0,
        bt_type: "",
        bi_il: "",
        bi_unitPrice: 0,
        bi_num: "",
        //push: true,
        bi_img: "",
        bi_abstract: ""
      },
      pageSize: 10,
      lists: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列
      fileList: { name: "", url: "" },
      book_type: [],
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        bi_name: [
          { required: true, message: "请输入图书的名称", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "图书名长度在 1 到 30 个字符",
            trigger: "blur"
          }
        ],
        bi_author: [
          { required: true, message: "请输入图书的作者名", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "图书作者名长度在 1 到 30 个字符",
            trigger: "blur"
          }
        ],
        bt_type: [
          { required: true, message: "请输入图书类别", trigger: "blur" }
        ],
        bi_publish: [
          { required: true, message: "请输入图书的出版社", trigger: "blur" },
          {
            min: 4,
            max: 30,
            message: "图书作者名长度在 4 到 30 个字符",
            trigger: "blur"
          }
        ],
        bi_pubTime: [
          {
            type: "number",
            required: true,
            min: 0,
            max: 1000,
            message: "请填写正确的图书印刷次数",
            trigger: "blur"
          }
        ],
        bi_num: [
          {
            type: "number",
            required: true,
            min: 1,
            max: 1000,
            message: "请选择正确的图书数量",
            trigger: "blur"
          }
        ],
        bi_unitPrice: [
          {
            type: "number",
            required: true,
            min: 1,
            max: 1000,
            message: "请填写正确的图书价格",
            trigger: "blur"
          }
        ],
        bi_il: [
          {
            type: "number",
            required: true,
            min: 1,
            max: 100,
            message: "请正确选择借阅所需的积分",
            trigger: "blur"
          }
        ],

        bi_pubDate: [
          {
            required: true,
            message: "请选择出版的日期时间",
            trigger: "change"
          }
        ],
        bi_putTime: [
          {
            required: true,
            message: "请选择上架的日期时间",
            trigger: "change"
          }
        ],
        bi_img: [
          { required: true, message: "请上传图书的封面", trigger: "blur" }
        ],
        bi_abstract: [
          { required: true, message: "请填写图书的简介", trigger: "blur" },
          { min: 6, message: "图书的简介至少有6个字符", trigger: "blur" }
        ]
      },
      //编辑界面数据
      editForm: {
        bi_id: "",
        bi_author: "",
        bi_name: "",
        bt_type: "",
        bi_publish: "",
        bi_pubDate: "",
        bi_putTime: "",
        bi_pubTime: 0,
        bi_il: "",
        bi_unitPrice: 0,
        bi_num: "",
        //push: true,
        bi_img: "",
        bi_abstract: ""
      }

      //   addFormVisible: false, //新增界面是否显示
      //   addLoading: false,
      //   addFormRules: {
      //     bt_type: [
      //       { required: true, message: "请输入图书类别", trigger: "blur" }
      //     ]
      //   },
      //   //新增界面数据
      //   addForm: {
      //     bt_type: ""
      //   }
    };
  },
  computed: {
    findBookInfo: function() {
      if (this.filters.bi_name == "") return this.getPages();
    },
    uploadDisabled: function() {
      //console.log("hhh"+this.dialogImageUrl)
      return this.dialogImageUrl != "" || this.editForm.bi_img != "";
    }
  },
  methods: {
    getBookType() {
      allBookType().then(res => {
        if (res.data != null) {
          this.book_type = res.data;
          console.log(this.book_type);
          console.log(this.book_type[0]);
        }
      });
    },
    changePubDate(val) {
      this.editForm.bi_pubDate = val;
      console.log("bi_pubDate" + this.editForm.bi_pubDate);
    },
    changePutTime(val) {
      this.editForm.bi_putTime = val;
      console.log("bi_putTime" + this.editForm.bi_putTime);
    },
    // selectBookType(vId) {
    //   console.log("vid="+vId)
    //  let obj = {};
    //   obj = this.book_type.find(item => {
    //     //这里的book_type就是上面遍历的数据源
    //     return item.bt_id === vId; //筛选出匹配数据

    //   });
    //   this.ruleForm.bt_type=obj.bt_type;
    //   //console.log(obj.bt_type); //这边的name就是对应label的
    //   console.log(obj.bt_type);
    //   console.log(vId);
    // },
    selectPush() {
      console.log(this.editForm.push);
    },
    //处理后端传过来的时间尾巴的小数点.0
    qudiaoxiaoshudian1: function(row, column) {
      let pubDate = row.bi_pubDate;
      //   console.log("date="+pubDate)
      row.bi_pubDate = pubDate.split(".")[0];
      return row.bi_pubDate;
    },
    //处理后端传过来的时间尾巴的小数点.0
    qudiaoxiaoshudian2: function(row, column) {
      let putTime = row.bi_putTime;
      //   console.log("date="+putTime)
      row.bi_putTime = putTime.split(".")[0];
      return row.bi_putTime;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPages();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getPages();
    },
    //获取图书信息
    getPages: function() {
      let para = {
        page: this.page,
        pageSize: this.pageSize,
        bi_name: this.filters.bi_name
        //bt_type: this.filters.bt_type
      };
      this.listLoading = true;
      //NProgress.start();
      getBookList(para).then(res => {
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
          removeUser(para).then(res => {
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
      console.log("tupian=" + this.editForm.bi_img);
    },
    // //显示新增界面
    // handleAdd: function() {
    //   this.addFormVisible = true;
    //   this.addForm = {
    //     bt_type: ""
    //   };
    // },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            editBook(para).then(res => {
              this.editLoading = false;
              //NProgress.done();
              if (res.data.code == 200) {
                this.$message({
                  message: res.data.msg,
                  type: "success",
                  duration: 600
                });
              } else if (res.data.code == 404) {
                this.$message({
                  message: res.data.msg,
                  type: "info",
                  duration: 600
                });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "error",
                  duration: 600
                });
              }
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getPages();
            });
          });
        }
      });
    },
    // //新增
    // addSubmit: function() {
    //   this.$refs.addForm.validate(valid => {
    //     if (valid) {
    //       this.$confirm("确认提交吗？", "提示", {}).then(() => {
    //         this.addLoading = true;
    //         //NProgress.start();
    //         let para = Object.assign({}, this.addForm);
    //         addBookType(para).then(res => {
    //           this.addLoading = false;
    //           //NProgress.done();
    //           if(res.data.code==200){
    //           this.$message({
    //             message: res.data.msg,
    //             type: "success"
    //           });
    //           this.$refs["addForm"].resetFields();
    //           this.addFormVisible = false;
    //           this.getPages();
    //           }else{
    //             this.$message({
    //             message: res.data.msg,
    //             type: "error"
    //           });
    //           }
    //         });
    //       });
    //     }
    //   });
    // },
    selsChange: function(sels) {
      this.sels = sels;
      // console.log(sels)
    },
    //批量删除
    batchRemove: function() {
      var s = JSON.stringify(this.sels);
      console.log(s);
      var b = JSON.parse(s);
      var ids = b.map(item => item.bi_id).toString();
      console.log("sss" + JSON.stringify(this.sels));
      console.log("ids" + ids);
      console.log("miao" + b[0].bi_name);
      console.log(b);
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveBook(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            if (res.data.code == 200) {
              this.$message({
                message: res.data.msg,
                type: "success",
                duration: 600
              });
            } else if (res.data.code == 500) {
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
    this.getBookType();
  }
};
</script>

<style scoped>
</style>