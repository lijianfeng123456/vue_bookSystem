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
    <el-form-item label="图书名称" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请输入图书名称"></el-input>
    </el-form-item>
    <el-form-item label="图书作者" prop="author">
      <el-input v-model="ruleForm.author" placeholder="请输入图书作者"></el-input>
    </el-form-item>
    <el-form-item label="图书出版" prop="publish">
      <el-input v-model="ruleForm.publish" placeholder="请输入图书出版社"></el-input>
    </el-form-item>
    <el-form-item label="图书分类" prop="type">
      <el-select v-model="ruleForm.type" placeholder="请选择图书类型" style="width:100%;">
        <el-option label="文学" value="文学"></el-option>
        <el-option label="自然" value="自然"></el-option>
        <el-option label="工程" value="工程"></el-option>
        <el-option label="心理" value="心理"></el-option>
        <el-option label="艺术" value="艺术"></el-option>
        <el-option label="科学" value="科学"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出版时间" required>
      <el-form-item prop="pubDate">
        <el-date-picker
          type="datetime"
          placeholder="选择出版时间"
          v-model="ruleForm.pubDate"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item label="上架时间" required>
      <el-form-item prop="datetime">
        <el-date-picker
          type="datetime"
          placeholder="选择日期时间"
          v-model="ruleForm.datetime"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
    </el-form-item>

    <el-form-item label="是否推送" prop="delivery">
      <el-switch on-text="是" off-text="否" v-model="ruleForm.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="印刷次数" prop="pubTime">
      <el-input v-model="ruleForm.pubTime" style="width:180px" type="number" :min="1"></el-input>
    </el-form-item>
    <el-form-item label="图书单价" prop="unitPrice">
      <el-input v-model="ruleForm.unitPrice" style="width:180px" type="number" :min="0">
        <div slot="prepend">￥</div>
      </el-input>
    </el-form-item>
    <el-form-item label="借阅积分" prop="integral">
      <el-input-number
        v-model="ruleForm.integral"
        controls-position="left"
        :min="0"
        :max="100"
        type="number"
      ></el-input-number>
    </el-form-item>

    <el-form-item label="图书数量" prop="bookNum">
      <el-input-number v-model="ruleForm.bookNum" :min="0" :max="1000" type="number"></el-input-number>
    </el-form-item>

    <el-form-item label="封面上传" prop="upload">
      <el-upload
        action="http://localhost"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </el-form-item>
    <el-form-item label="图书简介" prop="desc">
      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" placeholder="请输入图书的简介"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即上架</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      ruleForm: {
        name: "",
        author: "",
        publish: "",
        pubDate: "",
        datetime: "",
        pubTime: 1,
        type: "",
        integral: "",
        unitPrice: 0,
        bookNum: "",
        delivery: true,
        upload: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入图书的名称", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "图书名长度在 1 到 30 个字符",
            trigger: "blur"
          }
        ],
        author: [
          { required: true, message: "请输入图书的作者名", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "图书作者名长度在 1 到 30 个字符",
            trigger: "blur"
          }
        ],
        publish: [
          { required: true, message: "请输入图书的出版社", trigger: "blur" },
          {
            min: 4,
            max: 30,
            message: "图书作者名长度在 4 到 30 个字符",
            trigger: "blur"
          }
        ],
        pubTime: [
          {
            required: true,
            min: 1,
            max: 1000,
            message: "请填写正确的图书印刷次数",
            trigger: "blur"
          }
        ],
        bookNum: [
          {
            type: "number",
            required: true,
            min: 1,
            max: 1000,
            message: "请选择正确的图书数量",
            trigger: "blur"
          }
        ],
        unitPrice: [
          {
            required: true,
            min: 1,
            max: 1000,
            message: "请填写正确的图书价格",
            trigger: "blur"
          }
        ],
        integral: [
          {
            type: "number",
            required: true,
            min: 1,
            max: 100,
            message: "请正确选择借阅所需的积分",
            trigger: "blur"
          }
        ],
        type: [
          { required: true, message: "请选择图书的类别", trigger: "blur" }
        ],
        datetime: [
          {
            type: "date",
            required: true,
            message: "请选择上架的日期时间",
            trigger: "change"
          }
        ],
        upload: [
          { required: true, message: "请上传图书的封面", trigger: "change" }
        ],
        desc: [
          { required: true, message: "请填写图书的简介", trigger: "blur" },
          { min: 6, message: "图书的简介至少有6个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          this.$message({
            showClose: true,
            message: "请正确填写好图书信息！",
            type: "error"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>