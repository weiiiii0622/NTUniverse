import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';

const PlsLogin: React.FC = () => (
  <Result
    icon={<SmileOutlined />}
    title="請先登入才能使用該功能！"
  />
);

export default PlsLogin;