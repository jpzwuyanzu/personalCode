import React from 'react';
import { Breadcrumb } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import './style.less';

type Props = {
  moduleTitle: string[];
  children: React.ReactNode;
  loading?: boolean;
  refreshCallback?: () => Promise<any>;
  extraLeft?: React.ReactNode;
  extraRight?: React.ReactNode;
};

export default (props: Props) => {
  const {
    children,
    moduleTitle,
    extraLeft,
    extraRight,
    refreshCallback,
    loading,
  } = props;

  const commonHeader = () => {
    return (
      <div className="create-card-header">
        <div className="left">
          <Breadcrumb>
            {moduleTitle.map((title) => (
              <Breadcrumb.Item key={title}>{title}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          {extraLeft}
        </div>
        <div className="right">
          {extraRight}
          {refreshCallback && (
            <SyncOutlined
              className={loading ? 'loading' : ''}
              onClick={() => {
                !loading && refreshCallback();
              }}
              style={{ color: '#1677ff', margin: '0 10px' }}
            />
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="create-card">
      <>
        {commonHeader()}
        {children}
      </>
    </div>
  );
};
