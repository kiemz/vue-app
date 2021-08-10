<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
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

<style scoped>
.tab-bar{
  display: flex;
  height: 45px;
  line-height: 44px;
  text-align: center;
  background-color: #ffffff;
  border-bottom: 1px solid #f5f5f5;
}
</style>
