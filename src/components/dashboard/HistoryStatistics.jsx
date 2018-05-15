import React from 'react';
import MyChart from '../common/MyChart';
import axios from 'axios';

const trendOpt = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['QQ音乐', '虾米音乐', '网易云音乐', '曲库总量']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'QQ音乐',
      type: 'line',
      data: []
    },
    {
      name: '虾米音乐',
      type: 'line',
      data: []
    },
    {
      name: '网易云音乐',
      type: 'line',
      data: []
    },
    {
      name: '曲库总量',
      type: 'line',
      data: []
    },
  ]
};

class HistoryStatistics extends React.Component {
  constructor() {
    super();
    this.state = {
      trendOpt,
      isLoading:true
    }
  }

  componentDidMount() {
    axios.post('dashboard/getHistoryStatistics').then(
      res => {
        let data = res.data;
        trendOpt.xAxis.data = data.date;
        trendOpt.series[0].data = data.qq;
        trendOpt.series[1].data = data.xm;
        trendOpt.series[2].data = data.wy;
        trendOpt.series[3].data = data.total;
        this.setState({trendOpt,isLoading:false});
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  render() {
    return (
      <MyChart option={this.state.trendOpt} height="400px" isLoading={this.state.isLoading}/>
    );
  }
}

export default HistoryStatistics;