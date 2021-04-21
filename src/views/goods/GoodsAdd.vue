<template>
  <el-card class="card">
    <my-components level1="商品管理" level2="添加商品"></my-components>
    <el-alert
      style="margin: 10px auto"
      title="添加商品"
      type="info"
      center
      :closable="false"
      show-icon>
    </el-alert>
    <!-- 步骤条 -->
    <el-steps :active="active" align-center finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品描述"></el-step>
    </el-steps>

    <!-- 标签页 -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="formData">
      <el-tabs tab-position="left" @tab-click="handleClick">
        <el-tab-pane label="基本信息">
          <el-form-item label="商品分类">
            <el-cascader
              style="width: 300px"
              v-model="catIds"
              :options="options"
              :props="{
                expandTrigger: 'hover',
                label: 'cat_name',
                value: 'cat_id',
                children: 'children'
              }"
              @change="handleChange"></el-cascader>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="formData.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input type="number" v-model="formData.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input type="number" v-model="formData.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input type="number" v-model="formData.goods_number"></el-input>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-form-item label="商品名称">

          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品描述">商品描述</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import MyComponents from '../../components/MyComponents.vue'
export default {
  components: { MyComponents },
  data () {
    return {
      active: 0,
      // 商品分类数据
      options: [],
      // 分类id数组
      catIds: [],
      // 动态参数
      dynamicParams: [],
      // 静态参数
      staticParams: [],
      formData: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        // 以 , 分割的商品分类id列表
        goods_cat: ''
      }
    }
  },
  created () {
    this.loadCats()
  },
  methods: {
    async handleClick (tab) {
      // console.log(tab, event)
      this.active = tab.index - 0

      // 判断当前点击的是否是商品分类、商品参数
      if (this.active === 1 || this.active === 2) {
        // 判断商品分类是否选了三级
        if (this.catIds.length !== 3) {
          this.$message({
            type: 'warning',
            message: '请选择商品的三级分类'
          })
          return
        }

        const sel = this.active === 1 ? 'many' : 'only'
        const catId = this.catIds[2]
        const data = await this.$http.get(`/categories/${catId}/attributes?sel=${sel}`)
        // 加载动态参数
        this.dynamicParams = data.data

        console.log(this.dynamicParams)

        // 加载静态参数
      }
    },
    // 商品分类改变
    handleChange () {
      // 判断当前是否选择的是三级分类
      console.log(this.catIds)
      if (this.catIds.length !== 3) {
        this.$message({
          type: 'warning',
          message: '请选择商品的三级分类'
        })
      }
    },
    // 加载商品分类列表
    async loadCats () {
      const data = await this.$http.get('/categories?type=3')
      this.options = data.data
    }
  }
}
</script>

<style>
.el-step__title {
  font-size: 12px;
  line-height: 38px;
}
.el-cascader-menu {
  height: 250px;
}
</style>
