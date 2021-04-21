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
          <!-- 动态参数 -->
          <el-form-item
            v-for="item in dynamicParams"
            :label="item.attr_name"
            :key="item.attr_id">
            <el-checkbox-group v-model="item.attr_arr">
              <el-checkbox
                border
                v-for="attr in item.attr_arr"
                :key="attr"
                :label="attr"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <!-- 静态参数 -->
          <el-form-item
            v-for="item in staticParams"
            :label="item.attr_name"
            :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <!-- 上传图片 -->
          <!-- action 上传图片的接口，不会经过axios的拦截器，也就是不会自动添加token -->
          <el-upload
            action="http://localhost:8888/api/private/v1/upload"
            :headers="headers"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品描述">
          <el-button>添加</el-button>
          <vue-editor v-model="formData.goods_introduce"></vue-editor>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import { VueEditor } from 'vue2-editor'

import MyComponents from '../../components/MyComponents.vue'
export default {
  components: { MyComponents, VueEditor },
  data () {
    return {
      headers: {
        Authorization: localStorage.getItem('token')
      },
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
        goods_cat: '',
        // 商品描述
        goods_introduce: '',
        pics: [],
        attrs: []
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

        if (sel === 'many') {
          // 加载动态参数
          this.dynamicParams = data.data
          this.dynamicParams.forEach(param => {
            // param.attr_vals
            // 动态参数，属性值的数组，绑定checkbox使用
            // 动态给对象增加的属性，不是响应式数据
            param.attr_arr = param.attr_vals.split(',')
            // 如果想动态给元素增加响应式数据应该使用 $set
            // this.$set(param, 'attr_arr', param.attr_vals.split(','))
          })
        } else {
          // 加载静态参数
          this.staticParams = data.data
        }
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
    },
    handleRemove (file, fileList) {
      // console.log(file)
      // console.log(fileList)

      // 获取删除图片在数组中的索引
      const index = this.formData.pics.findIndex(item => {
        return item.pic === file.response.data.tmp_path
      })
      this.formData.pics.splice(index, 1)
    },
    handleSuccess (response, file, fileList) {
      this.formData.pics.push({
        pic: response.data.tmp_path
      })
      // console.log(this.formData.pics)
      // 服务器响应回来的对象
      // console.log(response)
      // console.log(file)
      // console.log(fileList)
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
