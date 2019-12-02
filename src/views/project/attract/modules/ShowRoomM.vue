<template>
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    cancelText="关闭"
    destroyOnClose
  >
    <a-card style="margin-bottom:10px">
      <a-form-item label="已选择房间">
        <a-input v-decorator="['title']" />
      </a-form-item>
    </a-card>
    <a-card>
      <a-form :form="form" layout="inline">
        <a-row>
          <a-col span="24">
            <a-form-item label="房间状态">
              <a-checkbox-group @change="searchQuery">
                <a-checkbox value="1">已租</a-checkbox>
                <a-checkbox value="2">可租</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>
          <a-col span="24">
            <a-form-item label="区块">
              <a-radio-group
                @change="loadDataBuilding"
                :defaultValue="buildingInfo.block[1].buildingProjectId"
              >
                <a-radio
                  v-for="item in buildingInfo.block"
                  :value="item.buildingProjectId"
                >{{item.projectName}}</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col span="24">
            <a-form-item label="楼宇">
              <a-radio-group @change="loadDataFloor">
                <a-radio
                  v-for="item in buildingInfo.building"
                  :value="item.buildingId"
                >{{item.buildingName}}</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <!-- 更改显示方式 -->
          <a-col span="24">
            <p>333</p>
            <div v-for="item in buildingInfo.floor" :value="item.floorId">
              <div>{{item.floorName}}</div>
            </div>
          </a-col>

          <a-col span="24">
            <a-form-item label="楼层">
              <a-checkbox-group @change="loadDataRoom">
                <a-checkbox
                  v-for="item in buildingInfo.floor"
                  :value="item.floorId"
                >{{item.floorName}}</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>
          <a-col span="24">
            <a-form-item label="房间">
              <a-checkbox-group v-model="queryParam.deptGroups">
                <a-checkbox v-for="item in buildingInfo.room" :value="item.roomId">{{item.roomName}}</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </a-modal>
</template>

<script>
import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import moment from 'moment'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import Dom7 from 'dom7'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
import { mapGetters } from 'vuex'

export default {
  mixins: [JeecgListMixin],
  name: '',
  components: {},

  data() {
    return {
      form: this.$form.createForm(this),
      buildingInfo: {},
      confirmLoading: false,
      title: '物业位置',
      record: {},
      labelCol: {
        span: 18
      },
      wrapperCol: {
        span: 16
      },
      visible: false,
      loading: false,
      bodyStyle: {
        padding: '0',
        height: window.innerHeight * 0.8 + 'px',
        'overflow-y': 'auto'
      },
      queryform: {},
      modelStyle: {
        width: '60%',
        style: { top: '20px' },
        fullScreen: false
      },
      url: {
        list: '/park.project/mgrProjectTrace/list'
      }
    }
  },
  created() {
    this.loadDataBlock()
  },
  computed: {
    ...mapGetters(['industrialParkId'])
  },
  methods: {
    detail() {
      //需要默认值？
      // this.loadDataBlock()
      // this.loadDataBuilding('1198870720399015936')
      // this.loadDataFloor('1198871006224056320')
      // this.loadDataRoom()
      this.visible = true
    },
    // 1/5 点开modal自查  park查block
    loadDataBlock() {
      let params = { parkId: this.industrialParkId }
      this.loading = true
      getAction('/park.architecture/baseArchitectureProject/queryByParkId', params).then(res => {
        if (res.success) {
          this.buildingInfo.block = res.result
          console.log(this.buildingInfo.block)
          //目前通过这个方式来刷新表单项，不确定是否规范   12.02
          // this.$nextTick(() => {
          this.form.setFieldsValue()
          // })
        } else {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    // 2/5 用block查building
    loadDataBuilding(record) {
      // let params = { projectId: '1198870720399015936' }
      console.log('loadDataBuilding')
      console.log(record)
      let params = { projectId: record.target.value }
      this.loading = true
      getAction('/park.architecture/baseArchitectureBuilding/queryByProjectId', params).then(res => {
        if (res.success) {
          this.buildingInfo.building = res.result
          console.log(this.buildingInfo.building)
          this.form.setFieldsValue()
        } else {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    // 3/5 用building查floor
    loadDataFloor(record) {
      // let params = { buildingId: '1198871006224056320' }
      console.log('loadDataFloor')
      console.log(record)
      let params = { buildingId: record.target.value }
      this.loading = true
      getAction('/park.architecture/baseArchitectureFloor/queryByBuildingId', params).then(res => {
        if (res.success) {
          this.buildingInfo.floor = res.result
          console.log(this.buildingInfo.floor)
          this.form.setFieldsValue()
        } else {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    // 4/5 用floor查room
    loadDataRoom(record) {
      let params = { floorId: record.toString() }
      this.loading = true
      getAction('/park.architecture/baseArchitectureRoom/queryByFloorId', params).then(res => {
        if (res.success) {
          this.buildingInfo.room = res.result
          console.log(this.buildingInfo.room)
          this.form.setFieldsValue()
        } else {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },

    handleCancel() {
      this.visible = false
    }
  }
}
</script>

