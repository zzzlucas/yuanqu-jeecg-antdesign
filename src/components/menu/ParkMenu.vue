<template>
  <a-select :value="industrialPark.id" style="width: 140px" @change="handleParkChange">
    <a-select-option :value="item.parkId" v-for="item in industrialPark.list" :key="item.parkId">
      {{ item.parkName }}
    </a-select-option>
  </a-select>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'industrialPark',
      ]),
    },
    methods: {
      handleParkChange(parkId) {
        const map = {}
        this.industrialPark.list.forEach((item, index) => {
          map[item.parkId] = index
        })
        const { parkName } = this.industrialPark.list[map[parkId]]
        this.$store.dispatch('setPark', { parkId, parkName })
      },
    },
  }
</script>
