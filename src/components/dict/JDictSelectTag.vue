<template>
  <a-radio-group v-if="tagType=='radio'" @change="handleInput" :value="value" :disabled="disabled">
    <a-radio v-for="(item, key) in dictOptions" :key="key" :value="item.value">{{ item.text }}</a-radio>
  </a-radio-group>

  <a-select v-else-if="tagType=='select'" :placeholder="placeholder" :disabled="disabled" :value="value" @change="handleInput">
    <a-select-option value="">请选择</a-select-option>
    <a-select-option v-for="(item, key) in dictOptions" :key="key" :value="item.value">
      <span style="display: inline-block;width: 100%" :title=" item.text || item.label ">
        {{ item.text || item.label }}
      </span>
    </a-select-option>
  </a-select>

  <!-- <a-select slot="addonAfter" style="width: 100px;" v-decorator="['feeScaleUnit', {initialValue: dict.parksStationExt[0].value}]">
    <a-select-option v-for="(item, key) in dict.parksStationExt" :value="item.value" :key="key">{{ item.text }}</a-select-option>
</a-select> -->
</template>

<script>
  import {ajaxGetDictItems} from '@/api/api'

  export default {
    name: "JDictSelectTag",
    props: {
      dictCode: String,
      placeholder: String,
      triggerChange: Boolean,
      disabled: Boolean,
      value: String,
      type: String,
      dict: {
        type: Array,
        default: () => {
          return []
        },
      },
    },
    data() {
      return {
        dictOptions: [],
        tagType:""
      }
    },
    created() {
      if(!this.type || this.type==="list"){
        this.tagType = "select"
      }else{
        this.tagType = this.type
      }
      this.initDictData();
    },
    methods: {
      initDictData() {
        if (this.dictCode) {
          //根据字典Code, 初始化字典数组
          ajaxGetDictItems(this.dictCode, null).then((res) => {
            if (res.success) {
              this.dictOptions = res.result;
            }
          })
        } else if (this.dict) {
          this.dictOptions = this.dict
        }
      },
      handleInput(e) {
        let val;
        if(this.tagType=="radio"){
          val = e.target.value
        }else{
          val = e
        }
        if(this.triggerChange){
          this.$emit('change', val);
        }else{
          this.$emit('input', val);
        }
      },
      setCurrentDictOptions(dictOptions){
        this.dictOptions = dictOptions
      },
      getCurrentDictOptions(){
        return this.dictOptions
      }
    },
    watch: {
      dict() {
        this.initDictData()
      },
    }
  }
</script>

<style scoped>
</style>