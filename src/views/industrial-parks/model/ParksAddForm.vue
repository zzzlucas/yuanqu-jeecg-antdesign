<template>
  <a-drawer
    title="登记园区"
    wrapClassName="industrial-parks-list-form"
    width="400"
    :closable="false"
    :visible="show"
    @close="closeDrawer">

    <div class="drawer-bottom-btn-group">
      <a-button style="margin-right: 8px" type="primary" @click="handleSubmit">确定</a-button>
      <a-button @click="closeDrawer">取消</a-button>
    </div>
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