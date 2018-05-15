import React from 'react';
import axios from 'axios';
import MyChart from '../common/MyChart';

let option = {
	title: {
		subtext: '数据来源：QQ音乐爬虫',
		x: 'left'
	},
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	grid: {
		left: '3%',
		right: '5%',
		bottom: '3%',
		containLabel: true
	},
	/*legend: {
		orient: 'vertical',
		left: 'left',
		data: []
	},*/
	series: [
		{
			name: '语种占比',
			type: 'pie',
			radius: ['50%', '70%'],
			center: ['50%', '60%'],
			data: [
				{value: 335, name: '直接访问'},
				{value: 310, name: '邮件营销'},
				{value: 234, name: '联盟广告'},
				{value: 135, name: '视频广告'},
				{value: 1548, name: '搜索引擎'}
			],
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}
	]
};


class LanguagePie extends React.Component {
	constructor(props) {
		super();
		this.state = {
			option
		}
	}

	componentWillMount() {
		this.getData();
	}

	getData = () => {
		axios.post('/statistics/languageMap').then(
			res => {
				let data = res.data.data;
				// let legendData = [];
				let yData = [];
				data.forEach(
					(item) => {
						// legendData.push(item.language);
						yData.push({value: item.count, name: item.language});
					}
				);
				// option.legend.data = legendData;
				option.series[0].data = yData;
				this.setState({option});
			}
		).catch(
			error => {
				console.log(error);
			}
		);
	};

	render() {
		return (
			<div>
				<MyChart option={this.state.option} height={'400px'}/>
			</div>
		);
	}

}

export default LanguagePie;