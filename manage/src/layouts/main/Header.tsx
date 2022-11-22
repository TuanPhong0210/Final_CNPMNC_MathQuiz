import styled from 'styled-components';
import { Layout, Space, Typography } from 'antd';

// constant
import { HEADER_HEIGHT } from '../../constant';

const { Text } = Typography;

const Header = () => {
  return (
    <RootStyle>
      <Space align="center" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div></div>
        <Space size="middle" align="center">
          <Text>Pihe</Text>
        </Space>
      </Space>
    </RootStyle>
  );
};

const RootStyle = styled(Layout.Header)({
  height: `${HEADER_HEIGHT}px`,
  position: 'sticky',
  top: 0,
  zIndex: 999,
});

export default Header;
