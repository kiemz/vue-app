<template>
  <div class="tab-control">
    <tab-item v-for="(item,index) in keywords" 
    :key="index" 
    @click.native="itemClick(item.keyword,index)"
    :isAct="cur === index">
      <div slot="text">{{item.func}}</div>
    </tab-item>
  </div>
</template>

<script>
import TabItem from './TabItem.vue'

export default {
  name: 'TabControl',
  data() { 
    return {
      keywords: [
      {keyword:'service',func:'服务'},
      {keyword:'case',func:'案例'},
      {keyword:'shop',func:'店铺'}
      ],
      cur: 0,
      keyword: ''
    }
  },
  components: {
    TabItem
  },
  created(){},

  computed: {},

  mounted(){},

  methods: {
    itemClick(keyword,index){
      this.keyword = keyword
      this.cur = index
      this.$emit('keywordChange',this.keyword)
    }
  }
}

</script>

<style scoped>
.tab-control{
  display: flex;
  height: 45px;
  line-height: 44px;
  text-align: center;
  background-color: #ffffff;
  border-bottom: 1px solid #f5f5f5;
}
</style>
