import React from 'react';
import {Card} from 'antd';
import MyChart from '../common/MyChart';
import axios from 'axios';


let schema = [
	{name: 'date', index: 0, text: '播放量'},
	{name: 'AQIindex', index: 1, text: '收藏量'},
	{name: 'PM25', index: 2, text: '分享量'},
	{name: 'PM10', index: 3, text: '评论量'},
];

let lineStyle = {
	normal: {
		width: 1,
		opacity: 0.5
	}
};

const option = {
	backgroundColor: '#333',
	parallelAxis: [
		{dim: 0, name: schema[0].text},
		{dim: 1, name: schema[1].text},
		{dim: 2, name: schema[2].text},
		{dim: 3, name: schema[3].text},
	],
	parallel: {
		left: '5%',
		right: '18%',
		bottom: 100,
		parallelAxisDefault: {
			type: 'value',
			name: 'AQI指数',
			nameLocation: 'end',
			nameGap: 20,
			nameTextStyle: {
				color: '#fff',
				fontSize: 12
			},
			axisLine: {
				lineStyle: {
					color: '#aaa'
				}
			},
			axisTick: {
				lineStyle: {
					color: '#777'
				}
			},
			splitLine: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#fff'
				}
			}
		}
	},
	series: [
		{
			name: '北京',
			type: 'parallel',
			lineStyle: lineStyle,
			data: []
		}
	]
};

var dataAll = [
	[
		[10.0, 8.04],
		[8.0, 6.95],
		[13.0, 7.58],
		[9.0, 8.81],
		[11.0, 8.33],
		[14.0, 9.96],
		[6.0, 7.24],
		[4.0, 4.26],
		[12.0, 10.84],
		[7.0, 4.82],
		[5.0, 5.68]
	],
	[
		[10.0, 9.14],
		[8.0, 8.14],
		[13.0, 8.74],
		[9.0, 8.77],
		[11.0, 9.26],
		[14.0, 8.10],
		[6.0, 6.13],
		[4.0, 3.10],
		[12.0, 9.13],
		[7.0, 7.26],
		[5.0, 4.74]
	],
	[
		[10.0, 7.46],
		[8.0, 6.77],
		[13.0, 12.74],
		[9.0, 7.11],
		[11.0, 7.81],
		[14.0, 8.84],
		[6.0, 6.08],
		[4.0, 5.39],
		[12.0, 8.15],
		[7.0, 6.42],
		[5.0, 5.73]
	],
	[
		[8.0, 6.58],
		[8.0, 5.76],
		[8.0, 7.71],
		[8.0, 8.84],
		[8.0, 8.47],
		[8.0, 7.04],
		[8.0, 5.25],
		[19.0, 12.50],
		[8.0, 5.56],
		[8.0, 7.91],
		[8.0, 6.89]
	]
];

/*var markLineOpt = {
	animation: false,
	label: {
		normal: {
			formatter: 'y = 0.5 * x + 3',
			textStyle: {
				align: 'right'
			}
		}
	},
	lineStyle: {
		normal: {
			type: 'solid'
		}
	},
	tooltip: {
		formatter: 'y = 0.5 * x + 3'
	},
	data: [[{
		coord: [0, 3],
		symbol: 'none'
	}, {
		coord: [20, 13],
		symbol: 'none'
	}]]
};*/

const option2 = {
	title: {
		text: 'Anscombe\'s quartet',
		x: 'center',
		y: 0
	},
	grid: [
		{x: '7%', y: '7%', width: '38%', height: '38%'},
		{x2: '7%', y: '7%', width: '38%', height: '38%'},
		{x: '7%', y2: '7%', width: '38%', height: '38%'},
		{x2: '7%', y2: '7%', width: '38%', height: '38%'}
	],
	tooltip: {
		formatter: 'Group {a}: ({c})'
	},
	xAxis: [
		{gridIndex: 0},
		{gridIndex: 1, },
		{gridIndex: 2,},
		{gridIndex: 3, }
	],
	yAxis: [
		{gridIndex: 0, },
		{gridIndex: 1, },
		{gridIndex: 2, },
		{gridIndex: 3, }
	],
	series: [
		{
			name: 'I',
			type: 'scatter',
			xAxisIndex: 0,
			yAxisIndex: 0,
			data: dataAll[0],

		},
		{
			name: 'II',
			type: 'scatter',
			xAxisIndex: 1,
			yAxisIndex: 1,
			data: dataAll[1],

		},
		{
			name: 'III',
			type: 'scatter',
			xAxisIndex: 2,
			yAxisIndex: 2,
			data: dataAll[2],

		},
		{
			name: 'IV',
			type: 'scatter',
			xAxisIndex: 3,
			yAxisIndex: 3,
			data: dataAll[3],

		}
	]
};

class Ugd extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			option,
			option2
		}
	}

	componentDidMount() {
		axios.post('/dimension/getNetEasyUgd').then(
			res => {
				let play = JSON.parse(res.data.data[0].data);
				let collect = JSON.parse(res.data.data[1].data);
				let share = JSON.parse(res.data.data[2].data);
				let comment = JSON.parse(res.data.data[3].data);
				let data = [];
				for (let i = 0; i < play.length; i++) {
					data.push([play[i],collect[i],share[i],comment[i]]);
				}
				option.series[0].data = data;
				this.setState({option});
			}
		).catch(
			err => {
				console.log(err);
			}
		);

		/*axios.post('/dimension/getNetEasyDouble').then(
			res => {
				option2.series[0].data = JSON.parse(res.data.data[0].array);
				option2.series[1].data = JSON.parse(res.data.data[1].array);
				option2.series[2].data = JSON.parse(res.data.data[2].array);
				option2.series[3].data = JSON.parse(res.data.data[3].array);
				this.setState({option2});
			}
		).catch(
			err => {
				console.log(err);
			}
		);*/
	}

	render() {
		return (
			<div>
				<Card title="Card title" bordered={false} style={{marginTop: 20}}>
					<MyChart height={'800px'} option={this.state.option} isLoading={false}/>
					{/*	<MyChart height={'800px'} option={this.state.option2} isLoading={false}/>*/}
				</Card>
			</div>
		);
	}
}

export default Ugd;