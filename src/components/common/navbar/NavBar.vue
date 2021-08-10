<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() { 
    return {

    }
  },
  components: {},

  ceated(){},

  computed: {},

  mounted(){},

  methods: {}
}

</script>

<style lang="less" scoped>
.nav-bar{
  display: flex;
  height: 45px;
  line-height: 44px;
  text-align: center;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #f5f5f5;
}
.left,.right{
  width: 30px;
}

.center{
  flex: 1;
}
</style>
