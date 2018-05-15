import React from 'react';
import MyChart from '../common/MyChart';
import axios from 'axios';
import {Row, Col} from 'antd';

const option = {
  color: ['#db0a30','#17b584'],
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      let relVal = params[0].name;
      for (let i = 0, l = params.length; i < l; i++) {
        if (i % 2 === 0) {
          relVal += '<br/>' + params[i].seriesName + ' : ' + params[i].value + "%";
        } else {
          relVal += '<br/>' + params[i].seriesName + ' : ' + params[i].value;
        }
      }
      return relVal;
    },
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    top: '1%',
    left: '3%',
    right: '6%',
    bottom: '2%',
    containLabel: true
  },
  yAxis: [
    {
      type: 'category',
      data: [],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  xAxis: [
    {
      type: 'value',
      name: '热度上升比',
      axisLabel: {
        show: true,
        interval: 'auto',
        formatter: '{value} %'
      },
    },
    {
      type: 'value',
      name: '7日播放量',
      axisLabel: {
        show: true,
        interval: 'auto',
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name: '热度上升比',
      type: 'line',
      data: []
    },
    {
      name: '7日播放量',
      type: 'bar',
      barWidth: '70%',
      xAxisIndex: 1,
      data: []
    }
  ]
};
const imageURL = 'https://y.gtimg.cn/music/photo_new/T002R90x90M000';

class TodayPopularTop extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      option,
      songList: {},
      rank: 1,
      hot: 0,
      title: '',
      singer: '',
      album: '',
      date: '',
      aid: ''
    }
  }

  componentDidMount() {
    axios.post('dashboard/getTodayTop').then(
      res => {
        console.log(res.data.data);
        let songList = res.data.data;
        let xData = [];
        let yData = [];
        let lineData = [];
        songList.forEach((song, idx) => {
          xData.push(song.play_count);
          yData.push(song.title);
          lineData.push({
            value: parseInt(song.hot * 100, 10),
            symbol: 'image://' + imageURL + song.aid + '.jpg',
            symbolSize: 40
          });
        });
        option.yAxis[0].data = yData.reverse();
        option.series[0].data = lineData.reverse();
        option.series[1].data = xData.reverse();
        this.setState({
          option,
          songList,
          date: songList[0].date,
          aid: songList[0].aid,
          hot: songList[0].hot,
          title: songList[0].title,
          singer: songList[0].singer,
          album: songList[0].album,
        });
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  addEChartEvent = (myChart) => {
    let that = this;
    myChart.on('click', function (param) {
      let selectedSong = that.state.songList[9 - param.dataIndex];
      that.setState({
        rank: selectedSong.rank,
        hot: selectedSong.hot,
        title: selectedSong.title,
        singer: selectedSong.singer,
        album: selectedSong.album,
        aid: selectedSong.aid
      });
    });

  };

  render() {
    return (
      <div>
        <p>数据来源：QQ音乐-巅峰榜</p>
        <Row>
          <Col span={20}>
            <MyChart option={option} height={'500px'} isLoading={false} event={this.addEChartEvent}/>
          </Col>
          <Col span={4}>
            <div style={{width: '50%', margin: '0 auto'}}>
              <p>{this.state.date} 榜单</p>
              <img src={imageURL + this.state.aid + '.jpg'} style={{margin: '4px 0'}} alt="album"/>
              <p>排行：{this.state.rank}</p>
              <p>热度：{parseInt(this.state.hot * 100, 10) + '%'}</p>
              <p>歌曲名：{this.state.title}</p>
              <p>歌手：{this.state.singer}</p>
              <p>专辑：{this.state.album}</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TodayPopularTop;