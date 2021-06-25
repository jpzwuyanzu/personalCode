import React from 'react';
import { history } from 'umi';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
const RightContent = () => <div>右边</div>
const Footer = () => <div>底边</div>

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings;};
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    menuHeaderRender: () => <div style={{ color: 'white' }}>2323</div>,
    loading: false
  };
};