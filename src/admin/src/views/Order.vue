<template>
  <div class="content">
    <!-- 订单列表 -->
    <el-table class="margin-bottom" :data="list" v-loading="loading" stripe border>
      <el-table-column type="selection" width="55" fixed="left" />
      <el-table-column prop="cornet" label="订单编号" min-width="100" />
      <el-table-column label="产品名称" min-width="200">
        <el-row class="product" type="flex" align="middle" slot-scope="scope">
          <img class="product-image" :src="scope.row.productSnapShot.thumbnail">
          <div class="product-name">{{ scope.row.productSnapShot.name }}</div>
        </el-row>
      </el-table-column>
      <el-table-column prop="addressSnapShot.name" label="收货人" min-width="120" />
      <el-table-column prop="addressSnapShot.phone" label="手机号" min-width="120" />
      <el-table-column label="地址" min-width="200" :formatter="addressFormatter" />
      <el-table-column prop="count" label="件数" min-width="80" />
      <el-table-column prop="totalFee" label="支付金额" min-width="100" :formatter="priceFormatter" />
      <el-table-column prop="status" label="订单状态" min-width="100" />
      <el-table-column prop="createdAt" label="创建时间" min-width="180" :formatter="dateFormatter" />
      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="280" fixed="right">
        <el-button-group slot-scope="scope">
          <template v-if="!scope.row.timeClosed">
            <el-button type="primary" size="mini" v-if="scope.row.timePayed && !scope.row.timeConsign">发货</el-button>
            <el-button type="danger" size="mini" v-if="scope.row.timePayed && !scope.row.timeRefund" @click="refundBtnHandler(scope.row)">退款</el-button>
            <el-button type="warning" size="mini" @click="closeBtnHandler(scope.row)">关闭订单</el-button>
          </template>
          <el-button type="primary" size="mini">查看</el-button>
        </el-button-group>
      </el-table-column>
      <!-- 操作END -->
    </el-table>
    <!-- 订单列表END -->

    <!-- 分页 -->
    <el-pagination
      :page-size="pagesize"
      :total="total"
      :current-page="page"
      @current-change="getOrderList"
    ></el-pagination>
    <!-- 分页END -->
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Order',
  data() {
    return {
      page: 1,
      pagesize: 10,
      total: 0,
      list: [],
      selection: [],
      loading: false,
    }
  },
  async created() {
    await this.getOrderList(1)
  },
  methods: {

    // 获取订单列表
    async getOrderList(page) {
      this.loading = true
      const { data: res } = await this.$http.post('/order/list', {
        page: Math.max(1, page),
        pagesize: this.pagesize
      })
      this.loading = false
      if (res.status === 'ok') {
        this.page = res.data.page
        this.pagesize = res.data.pagesize
        this.total = res.data.total
        this.list = res.data.list.slice(0)
        this.selection = []
      }
    },

    // 格式化地址
    addressFormatter(row) {
      const obj = row.addressSnapShot
      return obj.city.concat(obj.address).join(' ')
    },
    // 格式化价格
    priceFormatter(row, column, cellValue) {
      return `￥${cellValue / 100}`
    },
    // 格式化日期
    dateFormatter(row, column, cellValue) {
      return moment(cellValue).format('YYYY/MM/DD HH:mm:ss')
    },

    // 关闭订单
    closeBtnHandler(item) {
      this.$confirm('确定要关闭该订单吗？', '订单关闭提示', {
        type: 'warning',
        callback: async action => {
          if (action !== 'confirm') return
          this.loading = true
          const { data: res } = await this.$http.post('/order/close', {
            _id: item._id
          })
          this.loading = false
          if (res.status !== 'ok') {
            return this.$message.error(res.errmsg)
          }
          this.$message.success('关闭订单成功')
          await this.getOrderList(this.page)
        }
      })
    },

    // 订单退款
    refundBtnHandler(item) {
      this.$confirm('是否标记订单为已退款状态？', '退款提示', {
        type: 'warning',
        callback: async action => {
          if (action !== 'confirm') return
          this.loading = true
          const { data: res } = await this.$http.post('/order/refund', { _id: item._id })
          this.loading = false
          if (res.status !== 'ok') {
            return this.$message.error(res.errmsg)
          }
          this.$message.success('订单退款成功')
          await this.getOrderList(this.page)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  // 产品信息
  .product {
    $image-size: 30px;

    &-image {
      width: $image-size;
      height: $image-size;
      margin-right: 10px;
    }

    &-name {
      flex: 1;
      width: 0;
      @include line-cut;
    }
  }
</style>
