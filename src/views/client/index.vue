<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="账号">
        <template slot-scope="scope">{{ scope.row.uid | decryptNickname }}</template>
      </el-table-column>
      <el-table-column label="加入时间" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.join_time }}</template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
import { getList } from '@/api/client'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '可用',
        0: '禁用'
      }
      return statusMap[status]
    },
    decryptNickname(name) {
      return window.decodeURIComponent(window.atob(name))
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then((response) => {
        this.list = response.data
        this.listLoading = false
      })
    }

  }
}
</script>
