/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {Card, Col, Row} from 'antd';
import "../../style/components/dashboard/Dashboard.less";
import HistoryStatistics from './HistoryStatistics';
import TodayPopularTop from './TodayPopularTop';
import PopularTrend from './PopularTrend';
import axios from 'axios';
import qq from '../../style/imgs/qq.png';
import xm from '../../style/imgs/xm.png';
import wy from '../../style/imgs/wy.png';
import total from '../../style/imgs/total.png';


class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      qqCount: 0,
      xmCount: 0,
      wyCount: 0,
    }

  }

  componentDidMount() {
    axios.post('dashboard/getStatistics').then(
      res => {
        this.setState({qqCount: res.data.qq, wyCount: res.data.wy, xmCount: res.data.xm});
      }
    ).catch(
      err => {
        console.log(err);
      }
    );

  }

  render() {
    return (
      <div className="gutter-example button-demo">
        <BreadcrumbCustom/>
        <Row gutter={16}>
          <Col span={6}>
            <Card title="QQ音乐" bordered={false} className={'board-card'}>
							<span>
                {this.state.qqCount} 条
							</span>
              <img className="dashboard-logo" src={qq} alt="qq music"/>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="虾米音乐" bordered={false} className={'board-card'}>
             	<span>
                {this.state.xmCount} 条
							</span>
              <img className="dashboard-logo" src={xm} alt="xm music"/>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="网易云音乐" bordered={false} className={'board-card'}>
             	<span>
                {this.state.wyCount} 条
							</span>
              <img className="dashboard-logo" src={wy} alt="wy music"/>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="曲库总量" bordered={false} className={'board-card'}>
              	<span>
                {this.state.qqCount + this.state.xmCount + this.state.wyCount} 条
							</span>
              <img className="dashboard-logo" src={total} alt="total music"/>
            </Card>
          </Col>
        </Row>

        <Card title="今日流行趋势监测（每日12时更新）" bordered={false} className={"mt"}>
          <TodayPopularTop/>
        </Card>

        <Card title="近10天流行榜首监测（每日12时更新）" bordered={false} className={"mt"}>
          <PopularTrend/>
        </Card>

        <Card title="本月曲库容量走势图" bordered={false} className={"mt"}>
          <HistoryStatistics/>
        </Card>
      </div>


    )
  }
}

export default Dashboard;