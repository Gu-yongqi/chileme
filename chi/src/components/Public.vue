<template>
  <div class="public">
    <ul :class="{color:select==item.select}" v-for="item in List" :key="item.id">
      <router-link :to="item.to">
        <li><i class="iconfont" v-html="item.li"></i></li>
        <li>{{item.name}}</li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      List: [
        {
          id: 1,
          name: '收银',
          li: '&#xe625;',
          to: '/sy',
          select: 'one'
        },
        {
          id: 2,
          name: '会员',
          li: '&#xe654;',
          to: '/hy',
          select: 'two'
        },
        {
          id: 3,
          name: '库存',
          li: '&#xe603;',
          to: '/kc',
          select: 'thr'
        },
        {
          id: 4,
          name: '换班',
          li: '&#xe689;',
          to: '/hb',
          select: 'for'
        },
        {
          id: 5,
          name: '报表',
          li: '&#xe63a;',
          to: '/bb',
          select: 'fiv'
        },
        {
          id: 6,
          name: '辅助',
          li: '&#xe605;',
          to: '/fz',
          select: 'sex'
        },
        {
          id: 7,
          name: '退出',
          li: '&#xe62e;',
          to: '/tc',
          select: 'sev'
        }
      ]
    }
  },
  computed: {
    select() {
      return this.$store.state.select
    }
  },
}
</script>

<style lang="scss" scoped>
.public {
  height: 100vh;
  text-align: center;
  background-color: #1099ff;
  cursor: pointer;
  ul {
    height: 76px;
    margin: 0;
    padding: 24px 0 0 0;
    border-bottom: 1px solid #ccc;
    a {
      color: #fff;
      text-decoration: none;
    }
    li {
      list-style: none;
      i {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .color {
    background-color: crimson;
  }
}
</style>