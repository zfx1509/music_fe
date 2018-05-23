import React from 'react';
import {Table, Row, Col, Spin} from 'antd';


class Tables extends React.Component {

  render() {
    let {recordsTotal, length, current} = this.props.tblConfig;
    let self = this;
    return (
      <div className="simple-pagination-table">
        <Spin spinning={this.props.tblConfig.loading} size={'large'} tip={'加载中...'}>
          <Row gutter={16}>
            <Col className="gutter-row" md={24}>
              <div className="gutter-box">
                <Table
                  columns={this.props.tblConfig.columns}
                  pagination={{
                    current: current,
                    total: recordsTotal,
                    pageSize: length,
                    pageSizeOptions: ['25', '50', '100', '200'],
                    defaultPageSize: 25,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    onShowSizeChange(current, pageSize) {
                      self.props.toSelectPageChange(current, pageSize);
                    },
                    onChange(current) {
                      self.props.goToThisPage(current);
                    },
                    showTotal() {
                      return `共${recordsTotal}条数据`;
                    }
                  }}
                  dataSource={this.props.tblConfig.listData}
                />
              </div>
            </Col>
          </Row>
        </Spin>
      </div>
    );

  }
}

export default Tables;