import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';

class MusicBrainZ extends React.Component {
	render() {
		return (
			<div>
				<BreadcrumbCustom first={'音乐百科'}/>
				<iframe src={'http://222.31.101.225:5000/search'} width={'100%'} height={'800px'} scrolling={'auto'} title={'music'}>

				</iframe>
			</div>
		);
	}
}

export default MusicBrainZ;