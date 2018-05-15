/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {Card, Col, Row} from 'antd';
import LanguageMap from './LanguageMap';
import LanguageGenre from './LanguageGenre';
import LanguagePie from './LanguagePie';
import MusicStroyGenre from './MusicStroyGenre';
import QQGenre from './QQGenre';
import "../../style/components/dashboard/Dashboard.less";


class Statistics extends React.Component {
  render() {
    return (
      <div className="gutter-example button-demo">
        <BreadcrumbCustom first={'曲库分析'}/>
        <Card title="曲库语种分布" bordered={false} className={"mt"}>
          <LanguageMap/>
        </Card>

        <Row gutter={16} className={'mt'}>
          <Col span={14}>
            <Card title="语种与流派统计图" bordered={false} className={'mt'}>
              <LanguageGenre/>
            </Card>
          </Col>
          <Col span={10}>
            <Card title="各语种占比图" bordered={false} className={'mt'}>
              <LanguagePie/>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} className={'mt'}>
          <Col span={10}>
            <Card title="QQ音乐流派统计" bordered={false} className={'mt'}>
              <QQGenre/>
            </Card>
          </Col>
          <Col span={14}>
            <Card title="流派分布排行" bordered={false} className={'mt'}>
              <MusicStroyGenre/>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Statistics;