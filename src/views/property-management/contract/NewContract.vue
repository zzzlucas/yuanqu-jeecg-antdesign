<template>
	<a-drawer title="新建合同" :width="1500" @close="onClose" :visible="visible">
		<div>
			<a-button type="primary" @click="showChildrenDrawer" style="float: right;">
				设置
			</a-button>
			<a-drawer title="合同参数设置" width="600" :closable="false" @close="onChildrenDrawerClose" :visible="childrenDrawer">
				<div>
					<a-form layout="inline">
						<a-row :gutter="24">
							<a-form-item label="合同分账方式">
								<a-radio>合同月</a-radio>
								<a-radio>自然月</a-radio>
							</a-form-item>
						</a-row>
						<a-row :gutter="24">
							<a-form-item label="应收账结果取整">
								<a-select defaultValue="2位">
									<a-select-option>不保留小数点</a-select-option>
									<a-select-option>1位</a-select-option>
									<a-select-option>2位</a-select-option>
									<a-select-option>3位</a-select-option>
									<a-select-option>4位</a-select-option>
								</a-select>
							</a-form-item>
						</a-row>
						<a-row :gutter="24">
							<a-form-item label="续租提醒日期：合同结束前">
								<a-input placeholder="3日"></a-input>
								<a-radio>月</a-radio>
								<a-radio>天</a-radio>
							</a-form-item>
						</a-row>
						<a-row :gutter="24">
							<a-form-item label="付款截至天数：：合同结束前">
								<a-input placeholder="10">天</a-input>
							</a-form-item>
						</a-row>
						<a-row :gutter="24">
							<a-form-item label="应收帐去尾法">
								<a-radio>采用</a-radio>
								<a-radio>不采用</a-radio>
							</a-form-item>
						</a-row>
					</a-form>
					<div :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }">
						<a-button :style="{marginRight: '8px'}" @click="onClose">
							取消
						</a-button>
						<a-button @click="onClose" type="primary">提交</a-button>
					</div>

				</div>
			</a-drawer>
		</div>
		<div style="padding: 5px;">
			<a-col :span="12">
				<a-tabs defaultActiveKey="1">
					<a-tab-pane tab="基本信息">
						<a-form layout="inline">
							<a-row :gutter="24" style="margin-top: 10px;">
								<a-col :xl="24">
									<a-form-item label="客户名称：">
										<a-input style="width: 600px;"></a-input>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24" style="margin-top: 10px;">
								<a-col :xl="12">
									<a-form-item label="合同编号：">
										<a-input></a-input>
									</a-form-item>
								</a-col>
								<a-col :xl="12">
									<a-form-item label="甲方：">
										<a-input></a-input>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24" style="margin-top: 10px;">
								<a-col :xl="12">
									<a-form-item label="开始日期：">
										<a-input></a-input>
									</a-form-item>
								</a-col>
								<a-col :xl="12">
									<a-form-item label="结束日期：">
										<a-input></a-input>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24" style="margin-top: 10px;">
								<a-col :xl="12">
									<a-form-item label="保证金：">
										<a-input></a-input>
									</a-form-item>
								</a-col>
								<a-col :xl="12">
									<a-form-item label="支付方式：">
										<a-select defaultValue="一个月">
											<a-select-option value="选择楼宇">季度</a-select-option>
											<a-select-option value="lucy">半年</a-select-option>
											<a-select-option value="选择楼宇">年度</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24" style="margin-top: 10px;">
								<a-col :xl="12">
									<a-form-item label="经办人：">
										<a-input></a-input>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24" style="margin-top: 10px;">
								<a-form-item label="备注：">
									<a-textarea style="width: 600px;margin-left: 30px;" :rows="5" />
								</a-form-item>
							</a-row>
						</a-form>
					</a-tab-pane>
				</a-tabs>

			</a-col>
			<a-col :span="11">
				<a-tabs defaultActiveKey="1">
					<a-tab-pane tab="合同附件">
						<div>
							<a-upload name="file" :multiple="true" style="text-align: center;">
								<a style="margin-top: 40px;">你还没用附件，点击上传附件</a>
							</a-upload>
						</div>
					</a-tab-pane>
				</a-tabs>
				<a-tabs defaultActiveKey="1" style="margin-top: 20px;">
					<a-tab-pane tab="合同标签">
						<a-button style="margin: 7px;">研发楼</a-button>
						<a-button style="margin: 7px;">研发楼</a-button>
						<a-button style="margin: 7px;">研发楼</a-button>
						<a-button style="margin: 7px;">研发楼</a-button>
						<a-button style="margin: 7px;">研发楼</a-button>
						<a-button style="margin: 7px;">研发楼</a-button>
						<a-button style="margin: 7px;">研发楼</a-button>
						<a-button style="margin: 7px;">研发楼</a-button>
						<a-button style="margin: 7px;">研发楼</a-button>
						<a-button style="margin: 7px;">研发楼</a-button>
						<a-button style="margin: 7px;">研发楼</a-button>
						<a-button style="margin: 7px;">研发楼</a-button>
					</a-tab-pane>
				</a-tabs>
			</a-col>
		</div>
		<div>
			<a-col :span="24" style="margin-top: 30px;">
				<a-table :columns="columns" :dataSource="data" bordered>
					<template slot="name" slot-scope="text">
						<a slot="action" slot-scope="text" href="javascript:;">Delete</a>
						<a href="javascript:;">{{text}}</a>
					</template>
					<template slot="title" slot-scope="currentPageData">
						租金
					</template>
				</a-table>
			</a-col>
			<a-col :span="24">
				<a-table :columns="columns" :dataSource="data" bordered>
					<template slot="name" slot-scope="text">
						<a slot="action" slot-scope="text" href="javascript:;">Delete</a>
						<a href="javascript:;">{{text}}</a>
					</template>
					<template slot="title" slot-scope="currentPageData">
						物业费
					</template>
				</a-table>
			</a-col>
		</div>
		<div :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }">
			<a-button :style="{marginRight: '8px'}" @click="onClose">
				取消
			</a-button>
			<a-button @click="onClose" type="primary">提交</a-button>
		</div>
	</a-drawer>
</template>

<script>
	import qs from 'qs'
	import { httpAction } from '@/api/manage'
	import pick from 'lodash.pick'
	import moment from 'moment'
	import { initDictOptions } from '@comp/dict/JDictSelectUtil'
	import { AddbaseCustomerForm } from '@/config/pick-fields'
</script>

<style>

</style>