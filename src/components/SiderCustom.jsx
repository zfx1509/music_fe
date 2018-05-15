/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Link} from 'react-router';

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;

class SiderCustom extends Component {
	state = {
		collapsed: false,
		mode: 'inline',
		openKey: '',
		selectedKey: '',
		firstHide: true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
	};

	componentDidMount() {
		this.setMenuOpen(this.props);
	}

	componentWillReceiveProps(nextProps) {
		/*console.log(nextProps);*/
		this.onCollapse(nextProps.collapsed);
		this.setMenuOpen(nextProps)
	}

	setMenuOpen = props => {
		const {path} = props;
		this.setState({
			openKey: path.substr(0, path.lastIndexOf('/')),
			selectedKey: path
		});
	};
	onCollapse = (collapsed) => {
		/*console.log(collapsed);*/
		this.setState({
			collapsed,
			firstHide: collapsed,
			mode: collapsed ? 'vertical' : 'inline',
		}, () => {
			setTimeout(() => {
				let event = new Event('resize');
				window.dispatchEvent(event);
			},300)
		});
	};
	menuClick = e => {
		this.setState({
			selectedKey: e.key
		});
		console.log(this.state);
		const {popoverHide} = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
		popoverHide && popoverHide();
	};
	openMenu = v => {
		console.log(v);
		this.setState({
			openKey: v[v.length - 1],
			firstHide: false,
		})
	};

	render() {
		return (
			<Sider
				trigger={null}
				breakpoint="lg"
				collapsed={this.props.collapsed}
				style={{overflowY: 'auto'}}
			>
				<div className="logo">
					{
						this.state.collapsed ?
							<p style={{color: '#fff', textAlign: 'center', marginLeft: '-7', paddingTop: '7'}}><Icon type="heart"/>
							</p>
							:
							<p style={{color: '#fff', textAlign: 'center', paddingTop: '7'}}>音乐大数据可视化系统</p>
					}
				</div>
				<Menu
					onClick={this.menuClick}
					theme="dark"
					mode="inline"
					selectedKeys={[this.state.selectedKey]}
					openKeys={this.state.firstHide ? null : [this.state.openKey]}
					onOpenChange={this.openMenu}
				>
					<Menu.Item key="/app/dashboard/index">
						<Link to={'/app/dashboard/index'}><Icon type="appstore"/><span className="nav-text">首页</span></Link>
					</Menu.Item>
					<Menu.Item key="/app/statistics">
						<Link to={'/app/statistics'}><Icon type="line-chart"/><span className="nav-text">曲库统计</span></Link>
					</Menu.Item>
					<Menu.Item key="/app/dashboard2/index">
						<Link to={'/app/dashboard/top'}><Icon type="trophy"/><span className="nav-text">热度榜单</span></Link>
					</Menu.Item>
					<SubMenu
						key="/app/dimension"
						title={<span><Icon type="api"/><span className="nav-text">特征分析</span></span>}
					>
						<Menu.Item key="/app/dimension"><Link to={'/app/form/basicForm'}>情感分析</Link></Menu.Item>
						<Menu.Item key="/app/dimensions"><Link to={'/app/form/basicForm2'}>流派分析</Link></Menu.Item>
						<Menu.Item key="/app/dimension/ugd"><Link to={'/app/dimension/ugd'}>用户行为</Link></Menu.Item>
					</SubMenu>
					<SubMenu
						key="/app/levels"
						title={<span><Icon type="fork"/><span className="nav-text">关联分析</span></span>}
					>
						<Menu.Item key="/app/levels/artists"><Link to={'/app/levels/artists'}>层次结构</Link></Menu.Item>
						<Menu.Item key="/app/basicForm2135"><Link to={'/app/form/basicForm2'}>关系网络</Link></Menu.Item>

					</SubMenu>
					<Menu.Item key="/app/dashboarda/sindex">
						<Link to={'/app/dashboards/index'}><Icon type="scan"/><span className="nav-text">音乐百科</span></Link>
					</Menu.Item>
					<SubMenu
						key="/app/database"
						title={<span><Icon type="database"/><span className="nav-text">数据管理</span></span>}
					>

						<Menu.Item key="/app/database/add"><Link to={'/app/database/add'}>添加数据源</Link></Menu.Item>
						<Menu.Item key="/app/database/edit"><Link to={'/app/database/edit'}>数据操作</Link></Menu.Item>
					</SubMenu>
					<Menu.Item key="/app/config/sindex">
						<Link to={'/app/dashboards/index'}><Icon type="setting"/><span className="nav-text">系统设置</span></Link>
					</Menu.Item>
				</Menu>
				<style>
					{`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
				</style>
			</Sider>
		)
	}
}

export default SiderCustom;