<template>
  <div class="home">
    <el-container>
      <el-aside width="100px">
        <public></public>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Public from '@/components/Public.vue';
export default {
  components: {
    Public
  }
}
</script>

<style lang="scss">
.el-main{
  padding: 0 !important;
}
</style>




