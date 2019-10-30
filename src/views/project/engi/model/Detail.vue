<template>
  <div>
    <div>
      <!-- <a-tabs defaultActiveKey="1"> -->
        <!-- <a-tab-pane tab="企业基本概括" key="1"> -->
          <a-card :bordered="false">
            <a-form @submit="handleSubmit" :form="form" class="form">
              <!-- 行1 -->
              <a-row class="form-row" :gutter="16">
                <a-col :lg="6" :md="12" :sm="24">
                  <a-form-item label="所属园区">
                    <a-input
                      placeholder="请输入园区名称"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入园区名称', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                  <a-form-item label="项目名称">
                    <a-input
                      placeholder="请输入项目名称"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入项目名称', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
                  <a-form-item label="项目类别">
                    <a-select
                      placeholder="请选择项目类别"
                      v-decorator="[ 'repository.manager', {rules: [{ required: true, message: '请选择项目类别'}]} ]"
                    >
                      <a-select-option value="工程">工程项目</a-select-option>
                      <a-select-option value="住宅">住宅项目</a-select-option>
                      <a-select-option value="商业">商业项目</a-select-option>
                      <a-select-option value="基础">基础设施项目</a-select-option>
                      <a-select-option value="字典表">（字典表）</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <!-- 行2 -->
              <a-row class="form-row" :gutter="16">
                <a-col :lg="6" :md="12" :sm="24">
                  <a-form-item label="所属单位">
                    <a-input
                      placeholder="请输入单位名称"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入单位名称', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                  <a-form-item label="项目总投资（元）">
                    <a-input
                      placeholder="请输入金额"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: 0, message: '请输入金额', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                  <a-form-item label="立项文号">
                    <a-input
                      placeholder="请输入立项文号"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: 0, message: '请输入立项文号', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <!-- 行3 -->
              <a-row class="form-row" :gutter="16">
                <a-col :lg="6" :md="12" :sm="24">
                  <a-form-item label="立项金额（元）">
                    <a-input
                      placeholder="请输入金额"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入金额', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                  <a-form-item label="初步批复文号">
                    <a-input
                      placeholder="请输入文号"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: 0, message: '请输入文号', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                  <a-form-item label="土地编号">
                    <a-input
                      placeholder="请输入土地编号"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入土地编号', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <!-- 行4 -->
              <a-row class="form-row" :gutter="16">
                <a-col :lg="6" :md="12" :sm="24">
                  <a-form-item label="计划开工日期">
                    <a-input
                      placeholder="请输入日期"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: 0, message: '请输入日期', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                  <a-form-item label="计划完工日期">
                    <a-input
                      placeholder="请输入日期"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: 0, message: '请输入日期', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                  <a-form-item label="工程联系人">
                    <a-input
                      placeholder="请输入姓名"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入姓名', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <!-- 行5 -->
              <a-row class="form-row" :gutter="16">
                <a-col :lg="6" :md="12" :sm="24">
                  <a-form-item label="项目性质">
                    <a-input
                      placeholder="请输入项目性质"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入项目性质', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                  <a-form-item label="建筑面积（m²）">
                    <a-input
                      placeholder="请输入面积"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: 0, message: '请输入面积', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                  <a-form-item label="绿化面积">
                    <a-input
                      placeholder="请输入面积"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入面积', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <!-- 行6 -->
              <a-row class="form-row" :gutter="16">
                <a-col :lg="6" :md="12" :sm="24">
                  <a-form-item label="层数、层高等">
                    <a-input
                      placeholder="请输入层数、层高等"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: 0, message: '请输入层数、层高等', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                  <a-form-item label="建筑结构">
                    <a-input
                      placeholder="请输入建筑结构"
                      v-decorator="[
              'repository.name',
              {rules: [{ required: 0, message: '请输入建筑结构', whitespace: true}]}
            ]"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-form-item v-if="showSubmit">
                <a-button htmlType="submit">Submit</a-button>
              </a-form-item>
            </a-form>
          </a-card>
        <!-- </a-tab-pane> -->

        <!-- <a-tab-pane tab="参建单位信息" key="2"> -->
          <a-card :bordered="false">
            <a-form @submit="handleSubmit" :form="form" class="form">
              <a-row class="form-row" :gutter="16">
                <a-col :lg="6" :md="12" :sm="24">
                  <a-form-item label="建设单位">
                    <a-input
                      placeholder="请输入单位名称"
                      v-decorator="[ 'task.name1', {rules: [{ required: true, message: '请输入单位名称', whitespace: true}]} ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                  <a-form-item label="设计单位">
                    <a-input
                      placeholder="请输入单位名称"
                      v-decorator="[ 'task.description', {rules: [{ required: true, message: '请输入单位名称', whitespace: true}]} ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                  <a-form-item label="代建单位">
                    <a-input
                      placeholder="请输入单位名称"
                      v-decorator="[ 'task.description', {rules: [{ required: true, message: '请输入单位名称', whitespace: true}]} ]"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="6" :md="12" :sm="24">
                  <a-form-item label="勘察单位">
                    <a-input
                      placeholder="请输入单位名称"
                      v-decorator="[ 'task.name', {rules: [{ required: true, message: '请输入单位名称', whitespace: true}]} ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                  <a-form-item label="施工单位">
                    <a-input
                      placeholder="请输入单位名称"
                      v-decorator="[ 'task.description', {rules: [{ required: true, message: '请输入单位名称', whitespace: true}]} ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                  <a-form-item label="项目地址">
                    <a-input
                      placeholder="请输入项目地址"
                      v-decorator="[ 'task.description', {rules: [{ required: true, message: '请输入项目地址', whitespace: true}]} ]"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="6" :md="12" :sm="24">
                  <a-form-item label="任务名">
                    <a-input
                      placeholder="请输入任务名称"
                      v-decorator="[ 'task.name', {rules: [{ required: true, message: '请输入任务名称', whitespace: true}]} ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                  <a-form-item label="联系方式">
                    <a-input
                      placeholder="请输入联系方式"
                      v-decorator="[ 'task.description', {rules: [{ required: true, message: '请输入联系方式', whitespace: true}]} ]"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="22" :md="12" :sm="24">
                  <a-form-item label="项目信息">
                    <a-textarea
                      :rows="4"
                      placeholder="请输入项目信息"
                      v-decorator="[ 'task.name', {rules: [{ required: true, message: '请输入项目信息', whitespace: true}]} ]"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-form-item v-if="showSubmit">
                <a-button htmlType="submit">Submit</a-button>
              </a-form-item>
            </a-form>
          </a-card>
        <!-- </a-tab-pane> -->

        <a-button slot="tabBarExtraContent" @click="add">立项登记</a-button>
      </a-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>