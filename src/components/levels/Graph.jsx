import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';

class Graph extends React.Component {
	render() {
		return (
			<div>
				<BreadcrumbCustom first={'关联分析'} second={'关联网络'}/>
			</div>
		);
	}
}

export default Graph;