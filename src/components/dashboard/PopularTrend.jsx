import React from 'react';
import MyChart from '../common/MyChart';
import axios from 'axios';
import {Row, Col} from 'antd';

const option = {
  color: ['#0045db', '#ff9006'],
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
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0,//横轴信息全部显示
      rotate: -10,//-30度角倾斜显示
    }
  },
  yAxis: [
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
      barWidth: '60%',
      yAxisIndex: 1,
      data: []
    }
  ]
};

const imageURL = 'https://y.gtimg.cn/music/photo_new/T002R90x90M000';

class PopularTrend extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      option,
      songList: {},
      count: 0,
      hot: 0,
      title: '',
      singer: '',
      album: '',
      date: '',
      aid: ''
    }
  }

  componentDidMount() {
    axios.post('dashboard/getTenDaysTop').then(
      res => {
        console.log(res.data.data);
        let songList = res.data.data;
        let xData = [];
        let yData = [];
        let barData = [];

        songList.forEach((song) => {
          xData.push(song.date);
          yData.push({
            value: parseInt(song.hot * 100, 10),
            symbol: 'image://' + imageURL + song.aid + '.jpg',
            symbolSize: 60
          });
          barData.push(song.play_count);
        });
        option.xAxis.data = xData.reverse();
        option.series[0].data = yData.reverse();
        option.series[1].data = barData.reverse();
        this.setState({
          option,
          songList,
          count: songList[0].play_count,
          date: songList[0].date,
          hot: songList[0].hot,
          title: songList[0].title,
          singer: songList[0].singer,
          album: songList[0].album,
          aid: songList[0].aid
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
        date: selectedSong.date,
        count: selectedSong.play_count,
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
          <Col span={22}>
            <MyChart option={option} height={'500px'} isLoading={false} event={this.addEChartEvent}/>
          </Col>
          <Col span={2}>
            <p>{this.state.date} 榜单</p>
            <img src={imageURL + this.state.aid + '.jpg'} style={{margin: '4px 0'}} alt="album"/>
            <p>7日播放量：{this.state.count}</p>
            <p>热度：{parseInt(this.state.hot * 100, 10) + '%'}</p>
            <p>歌曲名：{this.state.title}</p>
            <p>歌手：{this.state.singer}</p>
            <p>专辑：{this.state.album}</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PopularTrend;