<template>
  <div class="fz">
    <el-calendar v-model="value">
    </el-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date()
    }
  },
  mounted() {
    this.$store.commit('mut', 'sex')
  }
}
</script>

