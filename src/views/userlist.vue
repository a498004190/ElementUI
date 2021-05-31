<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="SearchText" clearable>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getuserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="11">
          <!-- <el-date-picker
            v-model="startTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
          <span style="padding:0 10px">至</span>
          <el-date-picker v-model="endTime" type="date" placeholder="选择日期">
          </el-date-picker> -->
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="dialogAddFormVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column label="ID" width="120px" prop="id"></el-table-column>
        <el-table-column label="用户名" prop="title"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="日期" prop="date"></el-table-column>
        <el-table-column label="状态" prop="date">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑按钮"
              placement="top"
              :enterable="false"
            >
              <el-button
                size="mini"
                @click="showEditDialog(scope.$index, scope.row)"
                >编辑</el-button
              >
            </el-tooltip>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[1, 2, 5, 8]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userList.length"
      >
      </el-pagination>
    </el-card>

    <el-dialog
      title="添加用户"
      :visible.sync="dialogAddFormVisible"
      @close="dialogaddClose"
    >
      <el-form :model="addForm" :rules="addFormRulers" ref="addFormRef">
        <el-form-item label="ID" :label-width="formLabelWidth" prop="id">
          <el-input v-model="addForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="title">
          <el-input v-model="addForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth" prop="date">
          <el-date-picker
            style="width:100%"
            v-model="addForm.date"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser('addFormRef')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="修改用户"
      :visible.sync="dialogEditFormVisible"
      @close="dialogeditClose"
    >
      <el-form :model="editForm" :rules="addFormRulers" ref="editFormRef">
        <el-form-item label="ID" :label-width="formLabelWidth" prop="id">
          <el-input v-model="editForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="title">
          <el-input v-model="editForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth" prop="date">
          <el-date-picker
            style="width:100%"
            v-model="editForm.date"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser(editForm.item)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'userlist',
  data() {
    return {
      SearchText: '',
      startTime: '',
      endTime: '',
      queryinfo: {
        pagenum: 1,
        pagesize: 2
      },
      dialogAddFormVisible: false,
      dialogEditFormVisible: false,
      formLabelWidth: '80px',
      addForm: {
        id: '',
        name: '',
        title: '',
        date: ''
      },
      addFormRulers: {
        id: [
          // { required: true, message: '请输入ID', tigger: blur }
          // { type: 'number', message: '必须为数字', tigger: blur }
        ],
        name: [],
        title: [],
        date: [{ required: true, message: '请选择日期', tigger: blur }]
      },
      editForm: {
        id: '',
        name: '',
        title: '',
        date: ''
      }
      //   tableData: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    }
  },
  created() {
    this.getuserList()
  },
  computed: {
    ...mapState('userlist', ['userList'])
  },
  methods: {
    async getuserList() {
      this.$store.dispatch('userlist/GetuserList', this.queryinfo)
    },
    showEditDialog(index, row) {
      this.editForm.id = row.id
      this.editForm.title = row.title
      this.editForm.name = row.name
      this.editForm.date = row.date
      this.editForm.item = index
      this.dialogEditFormVisible = true
    },
    handleDelete(index, row) {
      // console.log(index, row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let addData = {
            id: this.addForm.id,
            name: this.addForm.name,
            title: this.addForm.title,
            date: this.addForm.date
          }
          // console.log(addData)
          this.userList.push(addData)
          this.$refs[formName].resetFields()
          this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    editUser(item) {
      this.$refs.editFormRef.validate(valid => {
        if (valid) {
          let editData = {
            id: this.editForm.id,
            name: this.editForm.name,
            title: this.editForm.title,
            date: this.editForm.date
          }

          this.userList[item].id = editData.id
          this.userList[item].name = editData.name
          this.userList[item].title = editData.title
          this.userList[item].date = editData.date
          // this.$refs.editFormRef.resetFields()
          this.dialogEditFormVisible = false
        } else {
          return false
        }
      })
    },
    dialogaddClose() {
      this.$refs.addFormRef.resetFields()
    },
    dialogeditClose() {
      this.$refs.editFormRef.resetFields()
    },
    handleSizeChange(val) {
      this.queryinfo.pagesize = val
      this.getuserList()
    },
    handleCurrentChange(val) {
      this.queryinfo.pagenum = val
      this.getuserList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 15px;
  text-align: left;
}
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
