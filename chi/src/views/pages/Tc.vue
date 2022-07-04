<template>
  <div class="tc">
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('mut', 'sev')
    /* localStorage.setItem()
    localStorage.getItem()
    // 清空
    localStorage.clear() */
    localStorage.removeItem('tokenid')
    this.$router.push('/login')
  },
}
</script>