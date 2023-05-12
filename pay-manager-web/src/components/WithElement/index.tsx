
import React, { Component } from 'react';
import { Button } from 'antd'
import { omit } from 'lodash'
import PermissionUtils from "@/utils/class/PermissionUtils";

interface WithElementAuthProps {
  auth?: string | boolean;
  [propName: string]: any;
}

interface LinksProps {
  underline: boolean;
  [propName: string]: any;
}

class Links extends React.Component<LinksProps> {
  // underline有下划线 danger文字颜色和下划线颜色是红色 plainText鼠标光标是箭头,文字颜色是黑色
  protected classConfig = ['underline', 'danger', 'plainText', 'disabled'];

  render() {
    const classArray: string[] = ['table-tool__link'];
    this.classConfig.forEach((i: string) => {
      if (this.props.hasOwnProperty(i) && this.props[i]) {
        classArray.push(`table-tool__${i}`);
      }
    });

    return (
      <a className={classArray.join(' ')} {...omit(this.props, this.classConfig)}>
        {this.props.children}
      </a>
    );
  }
}

export const WithElement = (ComposedComponent: typeof React.Component | typeof React.Fragment) => {
  class WithElements extends Component<WithElementAuthProps> {
    // props中的关键字
    filterKey = ['auth', 'dispatch'];

    // 过滤props中的关键字，防止与原生标签属性重名等问题
    filterProps = (props: WithElementAuthProps) => {
      const result: Record<string | number | symbol, any> = {};
      Object.keys(props).forEach((key) => {
        if (!this.filterKey.includes(key)) {
          result[key] = props[key];
        }
      });
      return result;
    };

    checkPerm = (auth: string) => {
      if (auth === 'true') {
        return true;
      }
      return PermissionUtils.checkPageResource(auth) || PermissionUtils.checkPageAccess(auth);
    };

    render() {
      const { auth = false } = this.props;
      const newProps = this.filterProps(this.props);
      if (this.checkPerm(auth.toString())) {
        return <ComposedComponent {...newProps} />;
      }
      return null;
    }
  }
  return WithElements;
};

export const WithButton = WithElement(Button);

export const WithLink = WithElement(Links);