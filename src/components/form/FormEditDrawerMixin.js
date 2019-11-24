/**
 * Form edit draw mixin. Usually used on right side edit/add form.
 * To use, call this function after import this mixin.
 *
 * Originally there's an component contain the ant <Form> w/o form content, and use slot expose form content.
 * So we can use slot insert whatever we want fields in form. But <Form> does not allow us to do this,
 * so i have to write this mixin to make this edit drawer.
 */

import pick from 'lodash.pick'
import './FormEditDrawer.less'

export default function make(name) {
  return {
    data() {
      return {
        isEdit: false,
        show: false,
        title: '',
        disableSubmit: false,
        // Form
        formLabel: '',
        form: this.$form.createForm(this, { name }),
        fields: [], // Please overwrite me
        // Rules
        rules: {},
        record: {},
      }
    },
    computed: {
      getTitle() {
        let action = this.title
        if (!this.title) {
          action = this.isEdit ? '编辑' : '添加'
        }
        return action + this.formLabel
      },
    },
    methods: {
      closeDrawer() {
        this.show = false
        this.$emit('close', false)
      },
      async edit(record) {
        this.isEdit = true
        this.show = true
        this.record = record
        await this.$nextTick()
        this.form.setFieldsValue(pick(record, this.fields))
        this.$emit('open', false)
      },
      async add() {
        this.isEdit = false
        this.show = true
        this.record = {}
        await this.$nextTick()
        this.form.resetFields()
        this.$emit('open', false)
      },
    }
  }
}