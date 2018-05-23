import React from 'react';
import {Table, Row, Col, Spin} from 'antd';


class DetailTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: '排行',
					dataIndex: 'rank',
				}, {
					title: '标题',
					dataIndex: 'title',
				}, {
					title: '歌手',
					dataIndex: 'author',
				}, {
					title: '专辑',
					dataIndex: 'album',
				}, {
					title: '情感',
					dataIndex: 'mood',
				}, {
					title: '流派',
					dataIndex: 'genre',
				}, {
					title: '语言',
					dataIndex: 'language',
				}, {
					title: '发行日期',
					dataIndex: 'public_time',
				},
			],
		};
	}


	render() {
		return (
			<div>
				<Spin spinning={this.props.loading} size={'default'} tip={'加载中...'}>
					<Row gutter={16}>
						<Col className="gutter-row" md={24}>
							<div className="gutter-box">
								<Table
									style={{background: '#fff'}}
									pagination={false}
									columns={this.state.columns}
									dataSource={this.props.tblData}
								/>
							</div>
						</Col>
					</Row>
				</Spin>

			</div>
		);
	}
}

export default DetailTable;