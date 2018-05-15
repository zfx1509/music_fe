import React from 'react';
import axios from 'axios';
import MyChart from '../common/MyChart';

const option = {
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    x : 'center',
    y : 'bottom',
    data:[]
  },
  toolbox: {
    show : true,
    feature : {
      mark : {show: true},
      dataView : {show: true, readOnly: false},
      magicType : {
        show: true,
        type: ['pie', 'funnel']
      },
      restore : {show: true},
      saveAsImage : {show: true}
    }
  },
  calculable : true,
  series : [
    {
      name:'流派数量（占比）',
      type:'pie',
      radius : [30, 100],
      center : ['50%', '35%'],
      roseType : 'area',
      data:[]
    }
  ]
};

class QQGenre extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      option
    }
  }

  componentDidMount() {
    axios.post('statistics/getQQGenre').then(
      res => {
        this.setState({isLoading: true});
        option.legend.data = res.data.genres;
        option.series[0].data = res.data.data;
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

export default QQGenre;