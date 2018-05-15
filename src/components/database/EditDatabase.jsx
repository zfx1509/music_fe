import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import axios from 'axios';
import {Row, Col, Select} from 'antd';
import Tables from '../common/Table';

const Option = Select.Option;


class EditDatabase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			option: [],
			loading: false,
			listData: [],             // 展示列表数据
			recordsTotal: 0,          // 总共多少条记录，初始化0条
			begin: 0,                 // 显示第一条数据
			end: 24,                  // 显示第25条数据
			current: 1,               // 当前页码，初始化第一页
			length: 25,               // 每页显示的条数，初始化25条
			total: 0,                 // 总页数
			columns: []
		}
	}

	componentDidMount() {
		let arr = this.generateSelection();
		console.log(arr);
	}

	generateSelection = () => {
		axios.post('/database/getDatabaseList').then(
			res => {
				let rows = res.data.data;
				// console.log(JSON.parse(rows[0].config));
				let option = [];
				rows.forEach((row, idx) => {
					option.push(<Option value={row.id + ''} key={idx}>{row.name}</Option>)
				});
				this.setState({option});
			}
		).catch(
			err => {
				console.log(err);
			}
		);
	};

	handleSelectChange = (value) => {
		console.log(value);
		axios.post('/database/getTableList', {id: value}).then(
			res => {
				this.setState({
					columns: [
						{
							title: '序号',
							dataIndex: 'idx',
						},
						{
							title: '表名',
							dataIndex: 'tName',
						},
						{
							title: '操作',
							render: (text, record) => (<a>查看</a>)
						}
					],
					listData: res.data.data,
					recordsTotal: res.data.total
				});
			}
		).catch(
			err => {
				console.log(err);
			}
		);
	};

	render() {
		return (
			<div>
				<BreadcrumbCustom first={'数据管理'} second={'数据操作'}/>
				<Row>
					<Col span={24}>
						<div className="wrapper-white">
							<Row>
								<span style={{paddingRight: 5}}>选择数据源</span>
								<Select style={{width: 120}} onChange={this.handleSelectChange}>
									{this.state.option}
								</Select>
							</Row>
							<Row>
								<Tables tblConfig={this.state}/>
							</Row>
						</div>
					</Col>
				</Row>
			</div>
		);
	}

}

export default EditDatabase;