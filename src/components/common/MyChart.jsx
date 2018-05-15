import React from 'react';
import echarts from 'echarts';

class MyChart extends React.Component {
  componentDidMount() {
    let myChart = echarts.init(this.refs.myChart);
    myChart.setOption(this.props.option);
    myChart.showLoading();
    window.addEventListener('resize',()=>{
      myChart.resize();
		});
    if(this.props.event != null){
      this.props.event(myChart);
    }
  }

  componentDidUpdate() {
    let myChart = echarts.init(this.refs.myChart);
    myChart.setOption(this.props.option);
    if(!this.props.isLoading){
      myChart.hideLoading();
    } else {
      myChart.showLoading();
    }
		let event = new Event('resize');
		window.dispatchEvent(event);
  }

  render() {
    return (
      <div ref={'myChart'} style={{height:this.props.height}}>
      </div>
    )
  }
}

export default MyChart;
