<template>
  <div id="index">
    <nav-bar class="nav-bar">
      <a slot="left" class="nav-back"></a>
      <div slot="center" class="input-wrap">
       <form action="" method="get">
          <input type="text"  class="input-search" placeholder="设计logo"> 
       </form>
      </div>
      <a slot="right" class="nav-kinds">
        <img src="../assets/img/kinds.png" alt="">
      </a>
    </nav-bar>
    <tab-bar>
      <tab-bar-item>
        <div slot="text">服务</div>
      </tab-bar-item>
      <tab-bar-item>
        <div slot="text">案例</div>
      </tab-bar-item>
      <tab-bar-item>
        <div slot="text">店铺</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import NavBar from '../components/common/navbar/NavBar.vue'
import TabBar from '../components/common/tabbar/TabBar.vue'
import TabBarItem from '../components/common/tabbar/TabBarItem.vue'

export default {
  name: 'index',
  data() { 
    return {

    }
  },
  components: {
    NavBar,
    TabBar,
    TabBarItem
  },

  ceated(){},

  computed: {},

  mounted(){},

  methods: {}
}

</script>

<style lang="less" scoped>
.nav-bar{
  padding: 0 15px;
}
.input-wrap{
  background-color: #f3f3f3;
  height: 32px;
  line-height: 32px;
  padding-left: 10px;
  border-radius: 5px;
  margin-right: 5px;
}
.input-search{
  height: 24px;
  width: 100%;
  background-color: transparent;
  font-size: 15px;
}
.nav-back{
  display: block;
  width: 12px;
  height: 12px;
  margin-left: 5px;
  border-bottom: 2px solid #ccc;
  border-left: 2px solid #ccc;
  transform: rotate(45deg);
}
.nav-kinds{
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  right: -8px;
  img{
    width: 20px;
  }
}


</style>
