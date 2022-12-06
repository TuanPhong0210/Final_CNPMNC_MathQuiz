import { useNavigate, Link } from 'react-router-dom';
import { Space, MenuProps, Layout, Menu, SiderProps, Typography } from 'antd';

// hooks
import useAuth from '../../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../../routes/path';

const { Sider } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const SideBar = (props: SiderProps) => {
  const navigate = useNavigate();
  const { accessibleResources } = useAuth();
  const menuItems = accessibleResources.map((item) => {
    const { key, label, icon, children } = item!;
    const menuItem: MenuItem = { key, label, icon, children };
    return menuItem;
  });
  const isActive = window.location.pathname;
  const extraActions = ['/create', '/edit'];
  const currentAction = extraActions.find((action) => isActive.indexOf(action) >= 0);
  const extraActive = currentAction && isActive.substring(0, isActive.indexOf(currentAction));
  const deep = (isActive.match(/\//g) || []).length;
  const openKeys = isActive
    .substring(1)
    .split('/')
    .slice(0, deep - 1);

  const handleClickItem: MenuProps['onClick'] = (item) => {
    const { key } = item;
    navigate(key);
  };
  return (
    <Sider {...props}>
      <Space align="center" style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
        <Link to={PATH_DASHBOARD.root}>
          <Title level={3} style={{color: '#fff', fontFamily: "'Pacifico', cursive"}}>Math Quiz</Title>
        </Link>
      </Space>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={openKeys}
        selectedKeys={extraActive ? [isActive, extraActive] : [isActive]}
        items={menuItems}
        onClick={handleClickItem}
      />
    </Sider>
  );
};

export default SideBar;
