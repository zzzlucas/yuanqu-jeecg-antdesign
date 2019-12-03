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
              <a-radio-group @change="loadDataBuilding">
                <!-- :defaultValue="buildingInfo.block[1].buildingProjectId" -->
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
          <!-- 楼层+房间显示方式 -->
          <a-col span="24">
            <div
              v-for="item in buildingInfo.floor"
              :value="item.floorId"
              v-if="item.rooms.length > 0"
            >
              <div>
                {{item.floorName}}
                <a-checkbox-group v-model="queryParam.FIANALLYROOM" @change="consoleee">
                  <a-checkbox v-for="itemA in item.rooms" :value="itemA.roomId">{{itemA.roomName}}</a-checkbox>
                </a-checkbox-group>
              </div>
            </div>
          </a-col>

          <!-- <a-col span="24">
            <a-form-item label="楼层">
              <a-checkbox-group >
                <a-checkbox
                  v-for="item in buildingInfo.floor"
                  :value="item.floorId"
                >{{item.floorName}}</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>-->
          <!-- <a-col span="24">
            <a-form-item label="房间">
              <a-checkbox-group v-model="queryParam.deptGroups">
                <a-checkbox v-for="item in buildingInfo.room" :value="item.roomId">{{item.roomName}}</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>-->
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
    consoleee(e) {
      console.log('e')
      console.log(e)
    },
    detail() {
      //需要默认值？
      // this.loadDataBlock()
      // this.loadDataBuilding('')
      // this.loadDataFloor('')
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
      let params = { buildingProjectId: record.target.value }
      this.loading = true
      getAction('/park.architecture/baseArchitectureBuilding/queryBuildingList', params).then(res => {
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
      this.loading = true
      getAction('/park.architecture/baseArchitectureFloor/queryByBuildingId', { buildingId: record.target.value }).then(
        res => {
          if (res.success) {
            this.buildingInfo.floor = res.result
            console.log(this.buildingInfo.floor)
            //每个楼层里面遍历出自己的房间
            for (const item of res.result) {
              getAction('/park.architecture/baseArchitectureRoom/queryByFloorId', { floorId: item.floorId }).then(
                resA => {
                  if (resA.success) {
                    console.log(typeof resA.result.length)
                    item.rooms = resA.result ? resA.result : []
                    // this.buildingInfo.room = resA.result
                    // 这里获取到对应的房间，但是如何分发这个值呢。。。。
                    //
                    // console.log(this.buildingInfo.room)
                    this.form.setFieldsValue()
                  }
                }
              )
            }
            this.form.setFieldsValue()
          } else {
            this.$message.warning(res.message)
          }
          this.loading = false
        }
      )
    },

    // 4/5 用floor查room   应当是自主遍历出来
    // loadDataRoom(record) {
    //   this.loading = true
    //   getAction('/park.architecture/baseArchitectureRoom/queryByFloorId', { floorId: record.toString() }).then(res => {
    //     if (res.success) {
    //       this.buildingInfo.room = res.result
    //       console.log(this.buildingInfo.room)
    //       this.form.setFieldsValue()
    //     } else {
    //       this.$message.warning(res.message)
    //     }
    //     this.loading = false
    //   })
    // },

    handleCancel() {
      this.visible = false
    }
  }
}
</script>

