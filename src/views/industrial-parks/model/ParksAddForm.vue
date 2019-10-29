<template>
  <a-drawer title="登记园区" wrapClassName="industrial-parks-list-form" width="400"
            :closable="false" :visible="show" @close="closeDrawer">

  </a-drawer>
</template>

<script>
  export default {
    name: 'ParksAddForm',
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    model: {
      prop: 'show',
      event: 'close'
    },
    methods: {
      closeDrawer() {
        this.$emit('close', false)
      }
    }
  }
</script>