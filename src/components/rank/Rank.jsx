import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {Card} from 'antd';
import RankTable from './RankTable'

class Rank extends React.Component {
  render() {
    return (
      <div>
        <BreadcrumbCustom first={'热度榜单'}/>
        <Card title="曲库歌曲热度排行榜" bordered={false} className={"mt"}>
          <RankTable/>
        </Card>
      </div>
    );
  }
}

export default Rank;