<template>
  <el-card class="card">
    <!-- 面包屑组件 -->
    <my-components level1="角色管理" level2="角色列表"></my-components>

    <el-button style="margin: 10px 0px;">添加角色</el-button>

    <!-- 表格 -->
    <el-table
      border
      stripe
      :data="list"
      style="width: 100%">
      <el-table-column
        type="expand">
        <template slot-scope="scope">
          <!-- 展示一级权限 -->
          <el-row v-for="level1 in scope.row.children" :key="level1.id">
            <el-col :span="4">
              <!-- scope.row.id 权限id -->
              <!-- level1.id 角色id -->
              <el-tag @close="handleClose(scope.row, level1.id)" class="tag" closable>{{ level1.authName }}</el-tag> >
            </el-col>
            <el-col :span="20">
              <!-- 展示二级权限 -->
              <el-row v-for="level2 in level1.children" :key="level2.id">
                <el-col :span="5">
                  <el-tag @close="handleClose(scope.row, level2.id)" class="tag" type="success" closable>{{ level2.authName }}</el-tag> >
                </el-col>
                <el-col :span="19">
                  <!-- 展示三级权限 -->
                  <el-tag
                    class="tag"
                    @close="handleClose(scope.row, level3.id)"
                    v-for="level3 in level2.children"
                    :key="level3.id"
                    closable
                    >{{ level3.authName }}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述">
      </el-table-column>
      <el-table-column
        label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" @click="dialogFormVisible = true" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 选择权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
      <!-- 树形组件 -->
      <el-tree
        :props="props"
        :data="treeData"
        default-expand-all
        show-checkbox>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import MyComponents from '../../components/MyComponents.vue'
export default {
  components: { MyComponents },
  data () {
    return {
      list: [],
      dialogFormVisible: false,
      // 树形组件使用的数据
      treeData: [],
      props: {
        // 要展示的数据字段
        label: 'authName',
        // 存储子节点的字段
        children: 'children'
      }
    }
  },
  created () {
    this.loadData()
    this.loadTreeData()
  },
  methods: {
    async loadData () {
      const data = await this.$http.get('/roles')
      this.list = data.data
    },
    // 加载树
    async loadTreeData () {
      const data = await this.$http.get('/rights/tree')
      this.treeData = data.data
    },
    // 点击x，取消当前权限的角色
    async handleClose (role, rightId) {
      const data = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      this.$message({
        type: 'success',
        message: '取消权限成功'
      })
      role.children = data.data
    }
  }
}
</script>

<style lang="less">
.tag {
  margin: 5px 5px;
}
</style>
