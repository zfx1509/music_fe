import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {Card, Col, Row} from 'antd';

class Features extends React.Component {
	render() {
		return (
			<div>
				<BreadcrumbCustom first={'特征分析'} second={'音乐特征'}/>
				<Card title="曲库语种分布" bordered={false} className={"mt"}>

				</Card>
				<Row gutter={16} className={'mt'}>
					<Col span={14}>
						<Card title="语种与流派统计图" bordered={false} className={'mt'}>

						</Card>
					</Col>
					<Col span={10}>
						<Card title="各语种占比图" bordered={false} className={'mt'}>

						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Features;