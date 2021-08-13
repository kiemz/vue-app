<template>
  <div class="item-list">
    <item-card 
    v-for="(item,index) in listData" 
    :key="index"
    :itemInfo="item"
    :curCity="curCity"></item-card>
  </div>
</template>

<script>
import ItemCard from './ItemCard'


export default {
  name: 'ItemList',
  data() { 
    return {

    }
  },
  props: {
    listData: Array,
    curCity: String
  },
  components: {
    ItemCard
  },

  methods: {}
}

</script>

<style scoped>

</style>
