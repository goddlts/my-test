<template>
  <el-card class="card">
    <my-components level1="商品管理" level2="商品列表"></my-components>
    <!-- 搜索框 -->
    <div style="margin-top: 10px; margin-bottom: 10px;">
      <!-- 搜索框 -->
      <el-input clearable style="width: 300px;" placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <el-button type="success" plain style="margin-left: 10px;">添加商品</el-button>

      <el-table
        border
        stripe
        :data="list"
        style="width: 100%">
        <el-table-column
          type="index"
          width="60">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="goods_name"
          label="商品名称"
          width="250">
        </el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格(元)">
        </el-table-column>
        <el-table-column
          prop="goods_weight"
          label="商品重量">
        </el-table-column>
        <el-table-column
          prop="add_time"
          label="创建时间">
          <template>
            {{ add_time | fmtDate('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template>
            <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
import MyComponents from '../../components/MyComponents.vue'
export default {
  components: { MyComponents },
  data () {
    return {
      list: [],
      pagenum: 1,
      pagesize: 10
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const data = await this.$http.get('/goods', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      this.list = data.data.goods
    }
  }
}
</script>

<style>

</style>
