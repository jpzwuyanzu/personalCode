import { Tooltip, Tag, ButtonProps } from 'antd';
import { find } from 'lodash';
import { WithLink, WithButton } from '@/components';
import PermissionUtils from './PermissionUtils';
import React, { ReactNode } from 'react'; // 权限管理类

type className = 'text-red' | 'text-green' | 'text-yellow';

type ActionItem = ButtonProps & {
  label: string;
  key?: string;
  className?: className;
  hide?: boolean;
  auth?: string;
  render?: () => React.ReactElement;
  onClick?: () => void;
};

class AntdUtils {
  protected static limitTooltipsLen = 60;

  /**
   * 文字超长的详情提示
   * @param content
   * @param addOnBefore
   * @returns
   */
  static renderTips(content: string, addOnBefore?: string) {
    const isMaxThanLimit = content.length > this.limitTooltipsLen;
    const subText = isMaxThanLimit
      ? content.substring(0, this.limitTooltipsLen) + '...'
      : content;

    const baseContent = (
      <>
        {addOnBefore && <div>{addOnBefore}</div>}
        <div>{content}</div>
      </>
    );

    if (isMaxThanLimit) {
      return (
        <Tooltip title={baseContent}>
          <>
            {addOnBefore && <div>{addOnBefore}</div>}
            <div>{subText}</div>
          </>
        </Tooltip>
      );
    }

    return baseContent;
  }

  /**
   * 渲染tag 或者 带颜色的文字
   * @param list
   * @param value
   * @param isTag
   */
  static renderTag(list: any[], value: string | number, isTag = true) {
    const current = find(list, { value });
    if (!current) {
      return null;
    }

    if (isTag) {
      return (
        <Tag color={current.color ?? 'default'}>{current.label ?? '-'}</Tag>
      );
    }
    return (
      <span style={{ color: current.color ?? '#333', fontWeight: 'bold' }}>
        {current.label ?? '-'}
      </span>
    );
  }

  /**
   * table组件操作按钮
   * @param actions 操作按钮
   * @param isButton 是否是按钮
   * @returns
   */
  static renderTableAction(actions: ActionItem[], isButton = false) {
    const checkPerm = (auth: string) => {
      if (auth === 'true') {
        return true;
      }
      return PermissionUtils.checkPageResource(auth);
    };
    let result: ReactNode[] = [];
    if (Array.isArray(actions)) {
      const NodeName = isButton ? WithButton : WithLink;
      result = actions
        .filter((i) => !i.hide)
        .map((action, idx) => {
          if (action.render) {
            return checkPerm(action.auth ?? 'true') ? action.render() : null;
          }
          return (
            <NodeName
              {...action}
              key={action.key ?? idx}
              className={action.className ?? ''}
              auth={action.auth}
            >
              {action.label}
            </NodeName>
          );
        });
    }
    return result;
  }
}

export default AntdUtils;
