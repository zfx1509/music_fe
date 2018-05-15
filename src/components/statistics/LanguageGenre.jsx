import React from 'react';
import axios from 'axios';
import {Button} from 'antd';
import echarts from 'echarts';

let option = {
	title: {
		subtext: '数据来源：QQ音乐爬虫',
		x: 'left'
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {            // 坐标轴指示器，坐标轴触发有效
			type: 'shadow'          // 默认为直线，可选为：'line' | 'shadow'
		}
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '5%',
		containLabel: true
	},
	yAxis: {
		type: 'value',
	},
	xAxis: {
		type: 'category',
		data: [],
		axisLabel: {
			interval: 0,//横轴信息全部显示
			rotate: -45,//-30度角倾斜显示
		}
	},
	series: [
		{
			type: 'bar',
			data: [],
			barMinHeight: 1
		}
	]
};
// 声明全局的echarts变量对象，方便在不同作用域中访问
let myChart = null;

class LanguageGenre extends React.Component {
	constructor(props) {
		super();
		this.state = {
			// 用于控制返回按钮的显示状态
			btnStatus: false,
		}
	}

	componentDidMount() {
		// 初始化echarts对象
		myChart = echarts.init(this.refs.brand);
		myChart.showLoading();
		// 给echarts对象添加响应式监听事件
		window.addEventListener('resize', function () {
			myChart.resize();
		});
		this.getData();
	}

	getData = () => {
		let self = this;
		axios.post('/statistics/languageMap').then(
			res => {
				let data = res.data.data;
				// 格式化服务器端数据
				const generateChart = () => {
					let xData = [];
					let yData = [];
					for (let i = 0; i < data.length; i++) {
						xData.push(data[i].language);
						yData.push(data[i].count);
					}
					option.xAxis.data = xData;
					option.series[0].data = yData;
					myChart.setOption(option);
					myChart.hideLoading();
          // 添加一级图表的点击事件
					const delay = () => {
						myChart.on('click', function (param) {
              if (param.componentSubType === 'bar') {
								var params = new URLSearchParams();
								params.append('language', param.name);
								myChart.showLoading();
								axios.post('/statistics/getGenreByLanguage', params).then(
									res => {
										let subData = res.data.data;
										let xData = [];
										let yData = [];
										for (let i = 0; i < subData.length; i++) {
											xData.push(subData[i].genre);
											yData.push(subData[i]["count(id)"]);
										}
										option.xAxis.data = xData;
										option.series[0].data = yData;
										myChart.setOption(option);
										myChart.hideLoading();
										// 取消二级图表的点击事件
										myChart.off('click');
										// 按钮状态改变后，通过回调函数为按钮添加事件
										self.setState({btnStatus: true}, function () {
											let btn = document.getElementById('btn');
											btn.addEventListener('click', function () {
												self.setState({btnStatus: false});
												// 递归调用生成图表的函数
												generateChart();
											})
										});

									})

							}
						})
					};
					// 延时添加点击事件，防止图表未完成初始化
					setTimeout(delay, 100);
				};
				// 生成图表
				generateChart();
			}

		).catch(
			error => {
				console.log(error);
			}
		);
	};

	render() {
		return (
			<div className='brand-distribution-wrapper' style={{position: 'relative'}}>
				<div ref={'brand'} className='charts-wrapper' style={{height: '400px'}}>
				</div>
				{this.state.btnStatus ?
					<Button id={'btn'} style={{position: 'absolute', top: '0', right: '0',}} icon={'reload'}>返回</Button>
					: null}
			</div>
		);
	}

}

export default LanguageGenre;