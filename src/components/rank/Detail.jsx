import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import axios from 'axios';
import DetailTable from './DetailTable';
import {Row, Col, Card} from 'antd';
import MyChart from '../common/MyChart';
import worldCloud from '../../style/imgs/wordCloud/7.png';

const radarOption = {
	backgroundColor: '#161627',
	title: {
		text: '歌曲热度 - 雷达图',
		left: 'center',
		textStyle: {
			color: '#eee'
		}
	},
	tooltip: {
		trigger: 'item',
		backgroundColor: 'rgba(0,0,0,0.8)'
	},
	radar: {
		indicator: [
			{name: '播放量', max: 90373011},
			{name: '分享量', max: 233223},
			{name: '评论量', max: 79616},
			{name: '热度', max: 18163400},
		],
		shape: 'circle',
		splitNumber: 5,
		name: {
			textStyle: {
				color: 'rgb(238, 197, 102)'
			}
		},
		splitLine: {
			lineStyle: {
				color: [
					'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
				].reverse()
			}
		},
		splitArea: {
			show: false
		},
		axisLine: {
			lineStyle: {
				color: 'rgba(238, 197, 102, 0.5)'
			}
		}
	},
	series: [
		{
			name: '歌曲热度',
			type: 'radar',
			lineStyle: {
				normal: {
					width: 1,
					opacity: 0.5
				}
			},
			data: [],
			symbol: 'none',
			itemStyle: {
				normal: {
					color: '#F9713C'
				}
			},
			areaStyle: {
				normal: {
					opacity: 0.1
				}
			}
		}
	]
};

class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rank: 0,
			listData: [],
			loading: false,
			radarOption,
			lyrics:''
		};
	}

	componentWillMount() {
		let data = this.props.location.query;
		let {rank} = data;
		this.setState({rank});
		let params = {rank};
		this.setState({loading: true});
		if (params.rank != null) {
			axios.post('/rank/getDetail', params).then(
				res => {
					let listData = res.data.data[0];
					let lyrics = listData.lyrics;
					console.log(listData);
					radarOption.series[0].data = [[listData.play, listData.share, listData.comment, listData.xiami_hot]];
					console.log(radarOption);
					this.setState(
						{
							loading: false,
							listData: [listData],
							radarOption,
							lyrics
						});
				}
			).catch(
				err => {
					console.log(err);
				}
			);
		}
	}

	render() {
		return (
			<div>
				<BreadcrumbCustom first={'热度榜单'} second={'歌曲详情'}/>
				<DetailTable tblData={this.state.listData} loading={this.state.loading}/>
				<Row gutter={16} className={'mt'}>
					<Col span={14}>
						<Card title="歌曲热度分析" bordered={false} className={'mt'}>
							<MyChart option={this.state.radarOption} height={'400px'} isLoading={this.state.loading}/>
						</Card>
					</Col>
					<Col span={10}>
						<Card title="歌词分析" bordered={false} className={'mt'}>
							{
								this.state.rank === '7' ?
									<img src={worldCloud} alt={"0"} style={{width:'100%',height:'400px'}}/>
									:
									<span style={{display:'inline-block',width:'100%',height:'395px',overflow:'auto'}}>
										{this.state.lyrics}
									</span>
							}
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Detail;