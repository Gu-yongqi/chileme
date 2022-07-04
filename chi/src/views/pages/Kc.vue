<template>
  <div class="kc">
    库存
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('mut', 'thr')
  }
}
</script>