import React from 'react';
import axios from 'axios';
import MyChart from '../common/MyChart';

const option = {
  tooltip: {
    trigger: 'axis'
  },
  dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
    type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
    start: 0, // 左边在 0% 的位置。
    end: 5 // 右边在 10% 的位置。
  }, { // 这个dataZoom组件，也控制x轴。
    type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
    start: 0, // 左边在 0% 的位置。
    end: 5 // 右边在 10% 的位置。
  }],
  toolbox: {
    feature: {
      dataView: {
        show: true,
        readOnly: false
      },
      magicType: {
        show: true,
        type: ['line', 'bar']
      },
      restore: {
        show: true
      },
      saveAsImage: {
        show: true
      }
    }
  },
  xAxis: {
    name: '流派分类',
    type: 'category',
    data: [],
  },
  yAxis: {
    name: '歌曲数量',
    type: 'value',
    axisLabel: {
      formatter: '{value} '
    }
  },
  series: [{
    name: 'values',
    type: 'bar',
    data: []
  },]
};

class MusicStroyGenre extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      option
    }
  }

  componentDidMount() {
    axios.post('statistics/getMusicStoryGenre').then(
      res => {
        this.setState({isLoading: true});
        option.xAxis.data = res.data.genres;
        option.series[0].data = res.data.values;
        this.setState({isLoading: false, option});
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
        <p>数据来源：Music Story爬虫</p>
        <MyChart height={'400px'} option={option} isloading={this.state.isLoading}/>
      </div>
    );
  }
}

export default MusicStroyGenre;