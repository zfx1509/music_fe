import React from 'react';
import Table from '../common/Table';
import {Link} from 'react-router';
import axios from 'axios';

class RankTable extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: '排行',
          dataIndex: 'rank',
        }, {
          title: '标题',
          dataIndex: 'title',
          render: (text,record) => <Link to={{ pathname:'/app/rank/detail', query:{rank:record.rank}}}>{text}</Link>
        }, {
          title: '歌手',
          dataIndex: 'author',
          render: (text) => <a>{text}</a>
        }, {
          title: '专辑',
          dataIndex: 'album',
        }, {
          title: '播放量',
          dataIndex: 'play',
        }, {
          title: '热度评分',
          dataIndex: 'xiami_hot',
        },
      ],
      option: [],
      loading: false,
      listData: [],             // 展示列表数据
      recordsTotal: 0,          // 总共多少条记录，初始化0条
      begin: 0,                 // 显示第一条数据
      end: 24,                  // 显示第25条数据
      current: 1,               // 当前页码，初始化第一页
      length: 25,               // 每页显示的条数，初始化25条
      total: 0,                 // 总页数
    }
  }

  componentDidMount() {
    this.setState({loading: true});
    axios.post('rank/getRank').then(
      res => {
        let listData = res.data.data;
        let recordsTotal = res.data.count;
        this.setState(
          {
            listData,
            loading: false,
            recordsTotal
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  goToThisPage = (current) => {
    let params = {
      begin: (current - 1) * this.state.length,
      length: this.state.length
    };
    axios.post('rank/getRank', params).then(
      res => {
        let listData = res.data.data;
        let recordsTotal = res.data.count;
        this.setState(
          {
            listData,
            loading: false,
            recordsTotal,
            current
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  };

  toSelectPageChange = (current, pageSize) => {
    this.setState({length:pageSize});
    let params = {
      begin: (current - 1) * pageSize,
      length: pageSize
    };
    axios.post('rank/getRank', params).then(
      res => {
        let listData = res.data.data;
        let recordsTotal = res.data.count;
        this.setState(
          {
            listData,
            loading: false,
            recordsTotal,
            current
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  };

  render() {
    return (
      <div>
        <Table tblConfig={this.state} goToThisPage={this.goToThisPage} toSelectPageChange={this.toSelectPageChange}/>
      </div>
    );
  }
}

export default RankTable;