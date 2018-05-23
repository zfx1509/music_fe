/**
 * Created by 叶子 on 2017/8/13.
 */
import React, {Component} from 'react';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';
import App from '../App';
import Page from '../components/Page';
import Dashboard from '../components/dashboard/Dashboard';
import Statistics from '../components/statistics/Statistics';
import Rank from '../components/rank/Rank';
import Detail from '../components/rank/Detail';
import AddDatabase from '../components/database/AddDatabase';
import EditDatabase from '../components/database/EditDatabase';
import Tree from '../components/levels/Tree';
import Ugd from '../components/dimension/Ugd';
import MusicBrainZ from "../components/musicBrainZ/MusicBrainZ";
import Features from "../components/dimension/Features";
import Graph from "../components/levels/Graph";

/*const Wysiwyg = (location, cb) => {     // 按需加载富文本配置
	require.ensure([], require => {
		cb(null, require('../components/ui/Wysiwyg').default);
	}, 'Wysiwyg');
};*/

export default class CRouter extends Component {
	requireAuth = (permission, component) => {
		const {store} = this.props;
		const {auth} = store.getState().httpData;
		if (!auth || !auth.data.permissions.includes(permission)) hashHistory.replace('/404');
		return component;
	};

	render() {
		return (
			<Router history={hashHistory}>
				<Route path={'/'} components={Page}>
					<IndexRedirect to="/app/dashboard/index"/>
					<Route path={'app'} component={App}>
						<Route path={'dashboard/index'} component={Dashboard}/>
						<Route path={'statistics'}  component={Statistics}/>
						<Route path={'rank'}>
							<Route path={'index'}  component={Rank}/>
							<Route path={'detail'} component={Detail}/>
						</Route>
						<Route path={'top/index'} component={Dashboard}/>
						<Route path={'database'}>
							<Route path={'add'} component={AddDatabase} />
							<Route path={'edit'} component={EditDatabase}/>
						</Route>
						<Route path={'levels'}>
							<Route path={'tree'} component={Tree}/>
							<Route path={'graph'} component={Graph}/>
						</Route>
						<Route path={'dimension'}>
							<Route path={'features'} component={Features}/>
							<Route path={'Ugd'} component={Ugd}/>
						</Route>
						<Route path={'musicbrainz'} component={MusicBrainZ}/>
					</Route>
				</Route>
			</Router>
		)
	}
}