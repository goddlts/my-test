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
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" @click="handleShowDialog(scope.row)" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 选择权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
      <!-- 树形组件 -->
      <el-tree
        ref="mytree"
        node-key="id"
        :default-checked-keys="defaultCheckedKeys"
        :props="props"
        :data="treeData"
        default-expand-all
        show-checkbox>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
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
      },
      defaultCheckedKeys: [],
      // 当前的角色id
      currentRowId: -1
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
    },
    // 打开对话框，并设置默认选中的权限
    handleShowDialog (role) {
      // 重新加载树，解决状态不改变的问题
      this.loadTreeData()
      // 设置默认选中的权限
      const arr = []
      role.children.forEach(level1 => {
        level1.children.forEach(level2 => {
          level2.children.forEach(level3 => {
            arr.push(level3.id)
          })
        })
      })
      this.defaultCheckedKeys = arr

      // 记录当前点击的角色id
      this.currentRowId = role.id
      this.dialogFormVisible = true
    },
    // 重新分配权限
    async handleSure () {
      const arr1 = this.$refs.mytree.getHalfCheckedKeys()
      const arr2 = this.$refs.mytree.getCheckedKeys()

      // arr1.concat() 连接两个或多个数组，返回拼接好的新数组
      // 以 , 分割的权限 ID 列表

      const rids = [...arr1, ...arr2].join(',')

      await this.$http.post(`/roles/${this.currentRowId}/rights`, {
        rids
      })
      this.dialogFormVisible = false
      this.$message({
        type: 'success',
        message: '分配权限成功'
      })
      this.loadData()
    }
  }
}
</script>

<style lang="less">
.tag {
  margin: 5px 5px;
}
</style>
