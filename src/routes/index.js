/**
 * Created by 叶子 on 2017/8/13.
 */
import React, {Component} from 'react';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';
import App from '../App';
import Page from '../components/Page';
import Dashboard from '../components/dashboard/Dashboard';
import LanguageAnalysis from '../components/statistics/Statistics';
import AddDatabase from '../components/database/AddDatabase';
import EditDatabase from '../components/database/EditDatabase';
import Artists from '../components/levels/Artists';
import Ugd from '../components/dimension/Ugd';

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
						<Route path={'statistics'}  component={LanguageAnalysis}/>
						<Route path={'top/index'} component={Dashboard}/>
						<Route path={'database'}>
							<Route path={'add'} component={AddDatabase} />
							<Route path={'edit'} component={EditDatabase}/>
						</Route>
						<Route path={'levels'}>
							<Route path={'artists'} component={Artists} />
						</Route>
						<Route path={'dimension'}>
							<Route path={'Ugd'} component={Ugd} />
						</Route>
					</Route>
				</Route>
			</Router>
		)
	}
}