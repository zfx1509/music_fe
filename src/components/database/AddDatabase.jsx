import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import axios from 'axios';
import {Row, Col, Form, Input, Button, Select, message} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
	labelCol: {
		xs: {span: 24},
		sm: {span: 5},
	},
	wrapperCol: {
		xs: {span: 24},
		sm: {span: 12},
	},
};


class AddDatabaseForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dbAvailable: false
		}
	}

	handleTest = () => {
		this.props.form.validateFields((err, values) => {
			axios.post('/database/ping', values).then(
				res => {
					if (res.data.status === 'success') {
						this.setState({dbAvailable: true},()=>{
							message.success('数据库连接成功！');
						});
					} else {
						this.setState({dbAvailable: false},()=>{
							message.error('数据库连接失败');
						});
					}
				}
			).catch(
				err => {
					console.log(err);
				}
			);
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			axios.post('/database/addDatabase', values).then(
				res => {
					if (res.data.status === 'success') {
						this.setState({dbAvailable: false},()=>{
							message.success('数据库添加成功！');
							this.props.form.resetFields();
						});
					} else {
						this.setState({dbAvailable: false},()=>{
							message.error('数据库连接失败,查看控制台获取详情');
						});
					}
				}
			).catch(
				err => {
					console.log(err);
				}
			);
		});
	};

	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<div>
				<BreadcrumbCustom first={'数据管理'} second={'添加数据源'}/>
				<Row>
					<Col span={24}>
						<div className="wrapper-white">
							<Form onSubmit={this.handleSubmit}>
								<Row>
									<Col span={8}>
										<FormItem {...formItemLayout} label={'数据库类型'}>
											{getFieldDecorator('type',
												{initialValue: "mysql"})(
												<Select>
													<Option value="mysql">MySQL</Option>
													<Option value="mongodb">MongoDB</Option>
												</Select>)}
										</FormItem>
									</Col>
								</Row>
								<Row>
									<Col span={8} key={'host'}>
										<FormItem {...formItemLayout} label={'主机地址'}>
											{getFieldDecorator('host')(
												<Input placeholder="输入主机IP"/>
											)}
										</FormItem>
									</Col>
									<Col span={8} key={'port'}>
										<FormItem {...formItemLayout} label={'端口号'}>
											{getFieldDecorator('port')(
												<Input placeholder="输入端口号"/>
											)}
										</FormItem>
									</Col>
									<Col span={8} key={'database'}>
										<FormItem {...formItemLayout} label={'数据库名'}>
											{getFieldDecorator('database')(
												<Input placeholder="输入数据库名"/>
											)}
										</FormItem>
									</Col>
									<Col span={8} key={'user'}>
										<FormItem {...formItemLayout} label={'用户名'}>
											{getFieldDecorator('user')(
												<Input placeholder="输入用户名"/>
											)}
										</FormItem>
									</Col>
									<Col span={8} key={'password'}>
										<FormItem {...formItemLayout} label={'密码'}>
											{getFieldDecorator('password')(
												<Input placeholder="输入密码"/>
											)}
										</FormItem>
									</Col>
									<Col span={8} key={'charset'}>
										<FormItem {...formItemLayout} label={'charset'}>
											{getFieldDecorator('charset',
												{initialValue: "utf8"})(
												<Select>
													<Option value="utf8">utf8</Option>
													<Option value="gbk">gbk</Option>
												</Select>)}
										</FormItem>
									</Col>
								</Row>
								<Row className={'mt'}>
									<Col span={24} style={{textAlign: 'center'}}>
										<Button style={{marginLeft: 8}} onClick={this.handleTest}>
											连通测试
										</Button>
										{
											this.state.dbAvailable ?
												<Button type="primary" htmlType="submit">提交</Button>
												: <Button disabled>提交</Button>
										}
									</Col>
								</Row>
							</Form>
						</div>
					</Col>
				</Row>
			</div>
		);
	}

}

const AddDatabase = Form.create()(AddDatabaseForm);

export default AddDatabase;