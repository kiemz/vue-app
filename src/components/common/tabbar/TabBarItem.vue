<template>
  <div class="tab-bar-item">
    <div :class="{active:isActive}">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  data() { 
    return {
      isActive: true
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
.tab-bar-item{
  flex: 1;
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: bolder;
  color: #333333;
  .active{
    display: inline-block;
    position: relative;
    color: #ff6900;
  }
  .active::after{
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 3px;
    background: #ff6900;
    border-radius: 2px;
  }
}
</style>
