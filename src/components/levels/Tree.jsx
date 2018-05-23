import React from 'react';
import { Card } from 'antd';
import MyChart from '../common/MyChart';
import axios from 'axios';

const option = {
	tooltip: {
		trigger: 'item',
		triggerOn: 'mousemove'
	},
	series: [
		{
			type: 'tree',

			data: [{name:'1',children:[{name:'2'}]}],

			top: '18%',
			bottom: '14%',

			layout: 'radial',

			symbol: 'emptyCircle',

			symbolSize: 7,

			initialTreeDepth: 2,

			animationDurationUpdate: 750

		}
	]
};
class Artists extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			option
		}
	}

	componentDidMount() {
		axios.post('/levels/getArtistTree').then(
			res => {
				console.log(res.data.data[0]);
				let data = JSON.parse(res.data.data[0].tree);
				let option1 = JSON.parse(JSON.stringify(option));
				option1.series[0].data = [data];
				this.setState({option:option1});
			}
		).catch(
			err => {
				console.log(err);
			}
		);
	}

	render() {
		return (
			<div>
				<Card title="Card title" bordered={false} style={{ marginTop: 20 }}>

					<MyChart height={'850px'} option={this.state.option} isLoading={false}/>

				</Card>
			</div>
		);
	}
}

export default Artists;