<template>
	<a-card class="contract-list" :bordered="false">
		<div>
			<a-tabs defaultActiveKey="1" tabPosition="left">
				<a-tab-pane tab="新增合同" key="1">
					<div class="new_top">
						<a-form layout="inline">
							<a-row :gutter="24">
								<a-col :xl="7">
									<a-form-item label="厂房：">
										<a-select defaultValue="选择厂房" style="width: 300px">
											<a-select-option value="选择厂房">选择厂房</a-select-option>
											<a-select-option value="lucy">Lucy</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
								<a-col :xl="7">
									<a-form-item label="楼宇：">
										<a-select defaultValue="选择楼宇" style="width: 300px">
											<a-select-option value="选择楼宇">选择楼宇</a-select-option>
											<a-select-option value="lucy">Lucy</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
								<a-col :xl="7">
									<a-form-item label="楼层：">
										<a-select defaultValue="选择楼层" style="width: 300px">
											<a-select-option value="选择楼宇">1</a-select-option>
											<a-select-option value="lucy">Lucy</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24" style="margin-top: 15px;">
								<a-col :xl="7">
									<a-form-item label="房间">
										<a-input style="width: 300px;"></a-input>
									</a-form-item>
								</a-col>
								<a-col :xl="6">
									<a-form-item label="关键字：">
										<a-input style="width: 250px;"></a-input>
									</a-form-item>
								</a-col>
								<a-col :xl="10">
									<a-form-item label="合同状态：">
										<a-checkbox-group>
											<a-row>
												<a-checkbox value="a">A</a-checkbox>
												<a-checkbox value="b">B</a-checkbox>
												<a-checkbox value="c">C</a-checkbox>
												<a-checkbox value="d">D</a-checkbox>
											</a-row>
									    </a-checkbox-group>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24">
								<a-col :xl="20">
									<a-for-item style="float: left;margin-top: 10px;">
										<a-button type="primary" icon="search">查询</a-button>
										<a-button type="primary" icon="reload" style="left: 7px;">重置</a-button>
									</a-for-item>
									<a-for-item style="float: right;margin-top: 10px;">
										<a-button type="primary" icon="search" @click="addNewContract">登记合同</a-button>
									</a-for-item>
								</a-col>
							</a-row>
						</a-form>
						<a-table :columns="columns" :dataSource="data" style="margin-top: 20px;"/>
						    
					    </a-table>
						<a-drawer title="Basic Drawer" placement="right" :closable="false" @close="onClose" :visible="visible">

						</a-drawer>
					</div>
				</a-tab-pane>
				<a-tab-pane tab="执行中的合同" key="2">
					<div>
						<a-form layout="inline">
							<a-row :gutter="24">
								<a-col :xl="12">
									<a-form-item label="厂房：">
										<a-select defaultValue="选择厂房" style="width: 300px">
											<a-select-option value="选择厂房">选择厂房</a-select-option>
											<a-select-option value="lucy">Lucy</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
								<a-col :xl="12">
									<a-form-item label="楼宇：">
										<a-select defaultValue="选择楼宇" style="width: 300px">
											<a-select-option value="选择楼宇">选择楼宇</a-select-option>
											<a-select-option value="lucy">Lucy</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24" style="margin-top: 20px;">
								<a-col :xl="20">
									<a-form-item label="关键字：">
										<a-input placeholder="输入合同编号。客户名称。物业位置。经办人" style="width: 350px;"></a-input>
										<a-button type="primary" icon="search" style="left: 7px;">查询</a-button>
										<a-button type="primary" icon="reload" style="left: 12px;">重置</a-button>
									</a-form-item>
									<a-form-item style="float: right;">
										<a-button type="primary" icon="search" @click="addContract">登记合同</a-button>
									</a-form-item>
								</a-col>
							</a-row>
						</a-form>
						<a-table style="margin-top: 20px;"></a-table>
                        <new-contract ref="NewContract"></new-contract>
					</div>
				</a-tab-pane>
				<a-tab-pane tab="历史合同" key="3">
					<div>
						<a-form layout="inline">
							<a-row :gutter="24">
								<a-col :xl="12">
									<a-form-item label="项目：">
										<a-select defaultValue="项目" style="width: 300px">
											<a-select-option value="项目">项目</a-select-option>
											<a-select-option value="lucy">Lucy</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
								<a-col :xl="12">
									<a-form-item label="楼宇：">
										<a-select defaultValue="选择楼宇" style="width: 300px">
											<a-select-option value="选择楼宇">选择楼宇</a-select-option>
											<a-select-option value="lucy">Lucy</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24" style="margin-top: 20px;">
								<a-col :xl="20">
									<a-form-item label="关键字：">
										<a-input placeholder="输入合同编号。客户名称。物业位置。经办人" style="width: 350px;"></a-input>
										<a-button type="primary" icon="search" style="left: 7px;">查询</a-button>
										<a-button type="primary" icon="reload" style="left: 12px;">重置</a-button>
									</a-form-item>
								</a-col>
							</a-row>
						</a-form>
						<a-table style="margin-top: 20px;"></a-table>
					</div>
				</a-tab-pane>
				<a-tab-pane tab="续租提醒" key="4">
					<div>
						<a-form layout="inline">
							<a-row :gutter="24">
								<a-col :xl="12">
									<a-form-item label="厂房：">
										<a-select defaultValue="厂房" style="width: 300px">
											<a-select-option value="厂房">厂房</a-select-option>
											<a-select-option value="lucy">Lucy</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
								<a-col :xl="12">
									<a-form-item label="楼宇：">
										<a-select defaultValue="选择楼宇" style="width: 300px">
											<a-select-option value="选择楼宇">选择楼宇</a-select-option>
											<a-select-option value="lucy">Lucy</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24" style="margin-top: 20px;">
								<a-col :xl="10">
									<a-form-item label="合同状态：">
										<a-checkbox-group :options="plainOptions" />
									</a-form-item>
								</a-col>
								<a-col :xl="14">
									<a-form-item label="关键字：">
										<a-input placeholder="输入合同编号。客户名称。物业位置。经办人" style="width: 350px;"></a-input>
										<a-button type="primary" icon="search" style="left: 7px;">查询</a-button>
										<a-button type="primary" icon="reload" style="left: 20px;">重置</a-button>
									</a-form-item>
								</a-col>
							</a-row>
						</a-form>
						<a-table style="margin-top: 20px;"></a-table>
					</div>
				</a-tab-pane>
				<a-tab-pane tab="高级查询" key="5">
					<div>
						<a-form layout="inline">
							<a-row :gutter="24">
								<a-col :xl="8">
									<a-form-item label="厂房：">
										<a-select defaultValue="厂房" style="width: 300px">
											<a-select-option value="厂房1">厂房</a-select-option>
											<a-select-option value="lucy">Lucy</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
								<a-col :xl="8">
									<a-form-item label="楼宇：">
										<a-select defaultValue="选择楼宇" style="width: 300px">
											<a-select-option value="选择楼宇">选择楼宇</a-select-option>
											<a-select-option value="lucy">Lucy</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
								<a-col :xl="8">
									<a-button type="primary" icon="search" style="left: 7px;">查询</a-button>
									<a-button type="primary" icon="reload" style="left: 12px;">重置</a-button>
									<a-button type="primary" icon="reload" style="left: 20px;">导出</a-button>
								</a-col>
							</a-row>
						</a-form>
						<a-table style="margin-top: 20px;"></a-table>
					</div>
				</a-tab-pane>
			</a-tabs>
		</div>
	</a-card>
</template>

<script>
	import { JeecgListMixin } from '@/mixins/JeecgListMixin'
	import MixinList from '@/mixins/List'
	import { filterDictText } from '@/components/dict/JDictSelectUtil'
	import '@assets/less/common.less'
	import NewContract from './NewContract'
	export default {
		name: 'contract',
		components: {
			NewContract
		},

		data() {
			return {
				visible: false,
				columns,
			}
		},
		methods: {
		    addContract() {
				this.$refs.NewContract.add()
			},
			showDrawer() {
				this.visible = true;
			},
			onClose() {
				this.visible = false;
			},
			addNewContract(){
				console.log(asd);
			}
		}
	}
</script>

<style scoped>

</style>