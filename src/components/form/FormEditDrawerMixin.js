/**
 * Form edit draw mixin. Usually used on right side edit/add form.
 * To use, call this function after import this mixin.
 *
 * Originally there's an component contain the ant <Form> w/o form content, and use slot expose form content.
 * So we can use slot insert whatever we want fields in form. But <Form> does not allow us to do this,
 * so i have to write this mixin to make this edit drawer.
 */

export default function make (name) {
  return {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      edit: {
        type: Boolean,
        default: false,
      },
      editData: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    model: {
      prop: 'show',
      event: 'close'
    },
    data() {
      return {
        // Form
        formLabel: '',
        form: this.$form.createForm(this, { name }),
        // Rules
        rules: {},
      }
    },
    computed: {
      getTitle() {
        return (this.edit ? '编辑' : '添加') + this.formLabel
      },
    },
    methods: {
      closeDrawer() {
        this.$emit('close', false)
      },
    }
  }
}