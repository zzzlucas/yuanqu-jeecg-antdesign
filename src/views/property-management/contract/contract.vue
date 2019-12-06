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
												<a-checkbox value="a">不限</a-checkbox>
												<a-checkbox value="b">退回</a-checkbox>
												<a-checkbox value="c">暂存</a-checkbox>
											</a-row>
										</a-checkbox-group>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24">
								<a-col :xl="20">
									<a-form-item style="float: left;margin-top: 10px;">
										<a-button type="primary" icon="search">查询</a-button>
										<a-button type="primary" icon="reload" style="left: 7px;">重置</a-button>
									</a-form-item>
									<a-form-item style="float: right;margin-top: 10px;">
										<a-button type="primary" @click="showDrawer">登记</a-button>
									</a-form-item>
								</a-col>
							</a-row>
						</a-form>
						<a-table :columns="asd" :dataSource="data" bordered style="margin-top: 30px;">
							<span slot="asd">
                              <a href="javascript:;" @click="showDrawer">编辑</a>

                              <a-divider type="vertical" />
                              <a href="javascript:;" @click="showDrawer1">续租</a>
                              <a-drawer title="续租" :width="1500" @close="onClose1" :visible="visibles">
                              	<div>
                              		<h2>基本信息</h2>
                              		<a-row>
                                        <a-col :span="12">
                                                                                                                                    客户名称：哈斯电子科技有限公司<br>
                                                                                                                                   合同周期：2018-09-01 ~ 2020-08-31<br>
                                                                                                                                   物业位置：智慧园区/智慧二路8号1幢/301<br>
                                        </a-col>
                                        <a-col :span="12">
                                        	合同编号：HT20190004<br>
                                        	支付方式：季度<br>
                                        	保证金额：0.00<br>
                                        </a-col>
                                    </a-row>
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
                              <a-divider type="vertical" />
                              <a href="javascript:;" @click="showDrawer2">退租</a>
                              <a-drawer title="退租" :width="1500" @close="onClosea" :visible="visiblea">

							<div style="padding: 5px;">
								<a-col :span="12">
									<a-tabs defaultActiveKey="1">
										<a-tab-pane tab="基本信息">
											<a-form layout="inline">
												<a-row :gutter="24" style="margin-top: 10px; margin-left: 10px;">
													<a-col :xl="24">
														<a-form-item label="退租类型：">
															 <a-radio-group name="radioGroup" :defaultValue="1">
                                                                <a-radio :value="1">部分退租</a-radio>
                                                                <a-radio :value="2">整体退租</a-radio>
                                                             </a-radio-group>
														</a-form-item>
													</a-col>
												</a-row>
												<a-row :gutter="24" style="margin-top: 10px;margin-left: 15px;">
														<a-form-item label="退租日期：">
															<a-input></a-input>
														</a-form-item>
												</a-row>
												<a-row :gutter="24" style="margin-top: 10px;margin-left: 15px;">
													<a-form-item label="退租位置：">
														<a-input></a-input>
													</a-form-item>
												</a-row>
												<a-row :gutter="24" style="margin-top: 10px;margin-left: 15px;">
													<a-form-item label="退租原因：">
														<a-textarea style="width: 600px;" :rows="5" />
													</a-form-item>
												</a-row>
											</a-form>
										</a-tab-pane>
									</a-tabs>

								</a-col>
								<a-col :span="11">
									<a-tabs defaultActiveKey="1">
										<a-tab-pane tab="合同信息">
											<div>
											  <span style="margin-top: 15px;">合同编号：HT20190004</span><br>
											  <span style="margin-top: 15px;top: 15px;">客户名称： 嘉善哈耐斯电子科技有限公司</span><br>
											  <span style="margin-top: 15px;top: 15px;">合同租期： 2018-09-01~2020-08-31</span><br>
											  <span style="margin-top: 15px;top: 15px;">支付方式： 押0付3</span><br>
											</div>
										</a-tab-pane>
									</a-tabs>
								</a-col>
							</div>
							<div>
								<a-col :span="24">
									<div :style="{width:'100%', textAlign: 'right'}">
										<a-button type="primary" style="marginRight: 30px;">确认退租</a-button>
									</div>

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
                            </span>
						</a-table>
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
										<a-button type="primary" icon="search">登记合同</a-button>
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
										<a-checkbox-group>
											<a-row>
												<a-checkbox value="a">不限</a-checkbox>
												<a-checkbox value="b">待确认</a-checkbox>
												<a-checkbox value="c">退回</a-checkbox>
												<a-checkbox value="d">暂存</a-checkbox>
											</a-row>
										</a-checkbox-group>
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

	export default {
		name: 'contract',
		components: {

		},

		data() {
			return {
				visible: false,
				visibles: false,
				visiblea: false,
				childrenDrawer: false,
				data,
				columns,
				asd,
			}
		},
		methods: {
			showDrawer() {
				this.visible = true;
			},
			showDrawer1() {
				this.visibles = true;
			},
			showDrawer2() {
				this.visiblea = true;
			},
			onClose() {
				this.visible = false;
			},
			onClose1() {
				this.visibles = false;
			},
			onClosea() {
				this.visiblea = false;
			},
			showChildrenDrawer() {
				this.childrenDrawer = true;
			},
			onChildrenDrawerClose() {
				this.childrenDrawer = false;
			},
			RegisterContract() {

			},

			handleChange(info) {
				if(info.file.status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				if(info.file.status === 'done') {
					this.$message.success(`${info.file.name} file uploaded successfully`);
				} else if(info.file.status === 'error') {
					this.$message.error(`${info.file.name} file upload failed.`);
				}
			},
		}
	}
	const columns = [{
			title: '序号',
			dataIndex: 'id',
			scopedSlots: {
				customRender: 'name'
			},
		},
		{
			title: '物业位置',
			className: 'column-money',
			dataIndex: 'money',
		},
		{
			title: '面积',
			dataIndex: 'area',
		},
		{
			title: '付费类型',
			dataIndex: 'payway',
		},
		{
			title: '开始日期',
			dataIndex: 'startday',
		},
		{
			title: '结束日期',
			dataIndex: 'endday',
		},
		{
			title: '费用',
			dataIndex: 'price',
		},
		{
			title: '',
			dataIndex: 'none',
		},
	];
	const asd = [{
			title: '序号',
			dataIndex: 'id',
			scopedSlots: {
				customRender: 'name'
			},
		},
		{
			title: '客户名称',
			className: 'column-money',
			dataIndex: 'money',
		},
		{
			title: '合同编号',
			dataIndex: 'area',
		},
		{
			title: '计费位置',
			dataIndex: 'payway',
		},
		{
			title: '面积',
			dataIndex: 'startday',
		},
		{
			title: '合同周期',
			dataIndex: 'endday',
		},
		{
			title: '经办人',
			dataIndex: 'price',
		},
		{
			title: '合同状态',
			dataIndex: 'day',
		},
		{
			title: '操作',
			key: 'asd',
			dataIndex: 'asd',
			scopedSlots: {
				customRender: 'asd'
			},
		},
	];
	const data = [{
			key: '1',
			name: 'John Brown',
			money: '￥300,000.00',
			address: 'New York No. 1 Lake Park',
		},
		{
			key: '2',
			name: 'Jim Green',
			money: '￥1,256,000.00',
			address: 'London No. 1 Lake Park',
		},
		{
			key: '3',
			name: 'Joe Black',
			money: '￥120,000.00',
			address: 'Sidney No. 1 Lake Park',
		},
	];
</script>

<style scoped>

</style>