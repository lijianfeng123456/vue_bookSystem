<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="80px"
    class="demo-ruleForm"
    @submit.prevent="onSubmit"
    style="margin:30px;width:50%;min-width:500px;"
  >
    <el-form-item label="图书名称" prop="bi_name">
      <el-input v-model="ruleForm.bi_name" placeholder="请输入图书名称"></el-input>
    </el-form-item>
    <el-form-item label="图书作者" prop="bi_author">
      <el-input v-model="ruleForm.bi_author" placeholder="请输入图书作者"></el-input>
    </el-form-item>
    <el-form-item label="图书出版" prop="bi_publish">
      <el-input v-model="ruleForm.bi_publish" placeholder="请输入图书出版社"></el-input>
    </el-form-item>
    <el-form-item label="图书分类" prop="bt_id">
      <div v-if="book_type!=null">
        <el-select
          @change="selectBookType"
          v-model="ruleForm.bt_id"
          placeholder="请选择图书类型"
          style="width:100%;"
          clearable
        >
          <!--clearable:清除选择-->
          <el-option
            v-for="item in book_type"
            :key="item.bt_id"
            :label="item.bt_type"
            :value="item.bt_id"
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
          v-model="ruleForm.bi_pubDate"
          style="width: 100%;"
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
          v-model="ruleForm.bi_putTime"
          style="width: 100%;"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          @change="changePutTime"  
        ></el-date-picker>
      </el-form-item>
    </el-form-item>

    <el-form-item label="是否推送" prop="push">
      <el-switch on-text="是" off-text="否" v-model="ruleForm.push" @change="selectPush"></el-switch>
    </el-form-item>
    <el-form-item label="印刷次数" prop="bi_pubTime">
      <el-input v-model="ruleForm.bi_pubTime" style="width:180px" type="number" :min="0"></el-input>
    </el-form-item>
    <el-form-item label="图书单价" prop="bi_unitPrice">
      <el-input v-model="ruleForm.bi_unitPrice" style="width:180px" type="number" :min="0">
        <div slot="prepend">￥</div>
      </el-input>
    </el-form-item>
    <el-form-item label="借阅积分" prop="bi_il">
      <el-input-number
        v-model="ruleForm.bi_il"
        controls-position="left"
        :min="0"
        :max="100"
        type="number"
      ></el-input-number>
    </el-form-item>

    <el-form-item label="图书数量" prop="bi_num">
      <el-input-number v-model="ruleForm.bi_num" :min="0" :max="1000" type="number"></el-input-number>
    </el-form-item>
    <el-form-item label="封面上传" prop="bi_img">
      <el-upload
        :class="{disabled:uploadDisabled}"
        action="http://localhost:8080/bookSystem/upload"
        list-type="picture-card"
        name="picture"
        :before-upload="beforeUpload"
        :limit="1"
        :on-preview="handlePictureCardPreview"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        ref="upload"
        :on-change="changeUpload"        
      >
      <!--
          :auto-upload="false"-->
        <i class="el-icon-plus"></i>
      </el-upload>

      <el-dialog :visible.sync="dialogVisible" title="亲亲❤您所上传的封面如下：" style="text-align:center;">
        <img width="100%" alt v-model="ruleForm.bi_img" :src="dialogImageUrl">
      </el-dialog>
    </el-form-item>
    <el-form-item label="图书简介" prop="bi_abstract">
      <el-input
        type="textarea"
        v-model="ruleForm.bi_abstract"
        :autosize="{ minRows: 5, maxRows: 8}"
        placeholder="请输入图书的简介"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即上架</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>

<script>
import { base, allBookType, addBook, upload } from "../../api/api";
export default {
  data() {
    return {
      flag: false,
      dialogImageUrl: "",
      dialogVisible: false,
      ruleForm: {
        bi_name: "",
        bi_author: "",
        bi_publish: "",
        bi_pubDate: "",
        bi_putTime: "",
        bi_pubTime: 0,
        bt_id: "",
        bi_il: "",
        bi_unitPrice: 0,
        bi_num: "",
        push: true,
        bi_img: "",
        bi_abstract: ""
      },
      fileList: { name: "", url: "" },
      book_type: [],
      rules: {
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
        bt_id: [
          {
            type: "number",
            required: true,
            message: "请选择图书的类别",
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
      }
    };
  },
  computed: {
    uploadDisabled: function() {
      //console.log("hhh"+this.dialogImageUrl)
      return this.dialogImageUrl != "" || this.ruleForm.bi_img != "";
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
    changePubDate(val){
    this.ruleForm.bi_pubDate=val;
    console.log("bi_pubDate"+this.ruleForm.bi_pubDate);
    },
    changePutTime(val){
    this.ruleForm.bi_putTime=val;
    console.log("bi_putTime"+this.ruleForm.bi_putTime);
    },
    selectBookType(vId) {
      let obj = {};
      obj = this.book_type.find(item => {
        //这里的book_type就是上面遍历的数据源
        return item.bt_id === vId; //筛选出匹配数据
      });
      this.ruleForm.bt_id = vId;
      //console.log(obj.bt_type); //这边的name就是对应label的
      console.log(obj.bt_id);
      console.log(vId);
    },
    selectPush() {
      console.log(this.ruleForm.push);
    },
    handleRemove(file, fileList) {
      this.ruleForm.bi_img = "";
      this.dialogImageUrl = "";
      console.log("sdasdsa" + JSON.stringify(file));
    },
    changeUpload(file, fileList) {
      // this.ruleForm.bi_img = file.url;
      this.dialogImageUrl = file.url;
     
    },
    //图片添加成功的钩子函数
    handleSuccess(res, file) {
      console.log(file.url);
      if (res.code == 200) {
        this.$message({
          type: "info",
          message: res.msg,
          duration: 600
        });
      }
       console.log("file.response.obj"+ JSON.stringify(file.response.obj))
      if (file.response.code == 200) {
        this.ruleForm.bi_img = file.response.obj; //将文件路径赋值picture字段
        console.log("图片位置=" + this.ruleForm.bi_img);
         this.flag = true;
        this.dialogImageUrl = JSON.stringify(file.response.obj);
      }
    },
    handlePictureCardPreview(file) {
      //console.log(file.url)
      //this.dialogImageUrl = file.url;
      console.log("  this.dialogImageUrl " + this.dialogImageUrl);
      this.dialogVisible = true;
    },
    //文件上传前的前的钩子函数
    //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";
      const isLt4M = file.size / 1024 / 1024 < 4;

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error("上传图片必须是JPG/GIF/PNG/BMP 格式!");
      }
      if (!isLt4M) {
        this.$message.error("上传图片大小不能超过 4MB!");
      }
      this.ruleForm.bi_img = this.dialogImageUrl;
      return (isJPG || isBMP || isGIF || isPNG) && isLt4M;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.bi_pubDate < this.ruleForm.bi_putTime) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              //this.$refs.upload.submit();
              console.log("flag=" + this.flag);
              if (this.flag == true) {
                let bookinfo = this.ruleForm;
                console.log("111"+JSON.stringify(bookinfo))
                addBook(bookinfo).then(res => {
                  console.log("res.code"+res.data.code);
                  if (res.data.code == 200) {
                    this.$message({
                      type: "success",
                      message: res.data.msg,
                      duration: 400
                    });
                    this.$refs.upload.clearFiles();
                    this.ruleForm.bi_img = "";
                    this.dialogImageUrl = "";
                    this.$refs[formName].resetFields();
                  } else if (res.data.code == 501) {
                    this.$message({
                      type: "info",
                      message: res.data.msg,
                      duration: 400
                    });
                  } else {
                    this.$message({
                      type: "error",
                      message: res.data.msg,
                      duration: 400
                    });
                  }
                });
              }
            });
          } else {
            alert("提交错误,请修改图书信息!");
            this.$message({
              type: "error",
              message: "错误的出版或上架时间！",
              duration: 400
            });
            return false;
          }
        } else {
          this.$message({
            showClose: true,
            message: "请正确填写好图书信息！",
            type: "error"
          });
          return false;
          console.log("error submit!!");
        }
      });
    },
    resetForm(formName) {
      this.$refs.upload.clearFiles();
      this.ruleForm.bi_img = "";
      this.dialogImageUrl = "";
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.getBookType();
  }
};
</script>