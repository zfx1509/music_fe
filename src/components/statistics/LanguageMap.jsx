import React from 'react';
import axios from 'axios';
import MyChart from '../common/MyChart';

require('echarts/map/js/world.js');

let option = {
	backgroundColor: '#404a59',
	tooltip: {
		trigger: 'item'
	},
	legend: {
		orient: 'vertical',
		y: 'bottom',
		x: 'right',
		textStyle: {
			color: '#fff'
		}
	},
	geo: {
		map: 'world',
		left: '10',
		right: '10',
		zoom: 0.9,
		label: {
			emphasis: {
				show: false
			}
		},
		roam: false,
		itemStyle: {
			normal: {
				areaColor: '#323c48',
				borderColor: '#111'
			},
			emphasis: {
				areaColor: '#2a333d'
			}
		}
	},
	series: [
		{
			name: '小于1万',
			type: 'scatter',
			coordinateSystem: 'geo',
			data: [],
			symbolSize: 10,
			label: {
				normal: {
					formatter: '{b}',
					position: 'right',
					show: false
				},
				emphasis: {
					show: true
				}
			},
			itemStyle: {
				normal: {
					color: '#6cc788'
				}
			},
			tooltip: {
				formatter: function (params) {
					return params.name + ': ' + params.value[2];
				}
			}
		},
		{
			name: '大于1万',
			type: 'effectScatter',
			coordinateSystem: 'geo',
			data: [],
			symbolSize: 15,
			showEffectOn: 'render',
			rippleEffect: {
				brushType: 'stroke'
			},
			hoverAnimation: true,
			label: {
				normal: {
					formatter: '{b}',
					position: 'right',
					show: true
				}
			},
			itemStyle: {
				normal: {
					color: '#ffb749',
					shadowBlur: 10,
					shadowColor: '#333'
				}
			},
			zlevel: 1,
			tooltip: {
				formatter: function (params) {
					return params.name + ': ' + params.value[2];
				}
			},
		},
		{
			name: '大于10万',
			type: 'effectScatter',
			coordinateSystem: 'geo',
			data: [],
			symbolSize: 30,
			showEffectOn: 'render',
			rippleEffect: {
				brushType: 'stroke'
			},
			hoverAnimation: true,
			label: {
				normal: {
					formatter: '{b}',
					position: 'right',
					show: true
				}
			},
			itemStyle: {
				normal: {
					color: '#d9534f',
					shadowBlur: 10,
					shadowColor: '#333'
				}
			},
			zlevel: 2,
			tooltip: {
				formatter: function (params) {
					return params.name + ': ' + params.value[2];
				}
			},
		},
	]
};
const geoCoordMap = {
	'国语': [116, 40],
	'英语': [-74, 40],
	'粤语': [114, 22,],
	'韩语': [128, 37],
	'日语': [138, 36],
	'台语': [121, 25],
	'芬兰语': [25, 60],
	'西班牙语': [-4, 40],
	'意大利语': [12, 42],
	'法语': [2, 42],
	'葡萄牙语': [-8, 39],
	'俄语': [100, 60],
	'德语': [9, 51],
	'拉丁': [-55, -10],
	'泰语': [100, 15],
	'印度语': [77, 20],
	'藏语': [91, 29],
	'瑞典语': [15, 62],
	'菲律宾语': [121, 15],
	'丹麦语': [12, 55],
	'波兰语': [19, 51],
	'印尼语': [120, -5],
	'越南语': [106, 10],
};

class LanguageMap extends React.Component {

	constructor(props) {
		super();
		this.state = {
			option
		}
	}

	componentWillMount() {
		this.getData();
	}

	// 获取服务器端数据
	getData = () => {
		axios.post('/statistics/languageMap').then(
			res => {
				// 声明数据格式化所需容器变量
				let data = res.data.data;
				let highData = [];
				let midData = [];
				let lowData = [];
				data.forEach((item) => {
					if (item.count > 100000) {
						highData.push(item);
					} else if (item.count > 10000) {
						midData.push(item);
					} else {
						lowData.push(item);
					}
				});
				option.series[0].data = this.convertData(lowData);
				option.series[1].data = this.convertData(midData);
				option.series[2].data = this.convertData(highData);
				this.setState({option});
			}
		).catch(
			error => {
				console.log(error);
			}
		);
	};


	// 数据格式转换接口
	convertData = (data) => {
		let res = [];
		for (let i = 0; i < data.length; i++) {
			let geoCoord = geoCoordMap[data[i].language];
			if (geoCoord) {
				res.push({
					name: data[i].language,
					value: geoCoord.concat(data[i].count)
				});
			}
		}
		return res;
	};

	render() {
		return (
			<div>
				<span style={{fontSize:'12px'}}>数据来源：QQ音乐爬虫</span>
				<MyChart height={"600px"} option={this.state.option}/>
			</div>
		);
	}
}

export default LanguageMap;