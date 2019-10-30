<template>
  <div>
    <a-button type="primary" @click="showModal">立项登记Modal</a-button>
    <a-modal
      title="首页/新建项目/项目详情"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      okText="保存"
      :closable="false"
      :width="1000"
    >
      <div>
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="企业基本概括" key="1">
            <!-- <a-card class="card" title="企业基本概括" :bordered="false">
              <repository-form ref="repository" :showSubmit="false" />
            </a-card>-->
            <repository-form ref="repository" :showSubmit="false" />
          </a-tab-pane>
          <a-tab-pane tab="参建单位信息" key="2">
              <task-form ref="task" :showSubmit="false" /> 
          </a-tab-pane>
          <a-button slot="tabBarExtraContent" @click="add">立项登记</a-button>
        </a-tabs>
        <!-- table -->
        <!-- <a-card>
          <form :autoFormCreate="(form) => this.form = form">
            <a-table :columns="columns" :dataSource="data" :pagination="false">
              <template
                v-for="(col, i) in ['name', 'workId', 'department']"
                :slot="col"
                slot-scope="text, record, index"
              >
                <a-input
                  :key="col"
                  v-if="record.editable"
                  style="margin: -5px 0"
                  :value="text"
                  :placeholder="columns[i].title"
                  @change="e => handleChange(e.target.value, record.key, col)"
                />
                <template v-else>{{ text }}</template>
              </template>
              <template slot="operation" slot-scope="text, record, index">
                <template v-if="record.editable">
                  <span v-if="record.isNew">
                    <a @click="saveRow(record.key)">添加</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                      <a>删除</a>
                    </a-popconfirm>
                  </span>
                  <span v-else>
                    <a @click="saveRow(record.key)">保存</a>
                    <a-divider type="vertical" />
                    <a @click="cancel(record.key)">取消</a>
                  </span>
                </template>
                <span v-else>
                  <a @click="toggle(record.key)">编辑</a>
                  <a-divider type="vertical" />
                  <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                    <a>删除</a>
                  </a-popconfirm>
                </span>
              </template>
            </a-table>
            <a-button
              style="width: 100%; margin-top: 16px; margin-bottom: 8px"
              type="dashed"
              icon="plus"
              @click="newMember"
            >新增成员</a-button>
          </form>
        </a-card>-->

        <!-- fixed footer toolbar -->
        <!-- <footer-tool-bar>
          <a-button type="primary" @click="validate" :loading="loading">提交</a-button>
        </footer-tool-bar>-->
      </div>
    </a-modal>
  </div>
</template>
<script>
import RepositoryForm from './advancedFormM/RepositoryForm'
import TaskForm from './advancedFormM/TaskForm'
import FooterToolBar from '@/components/tools/FooterToolBar'

export default {
  data() {
    return {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false
    }
  },
  components: {
    FooterToolBar,
    RepositoryForm,
    TaskForm
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    }
  }
}
</script>