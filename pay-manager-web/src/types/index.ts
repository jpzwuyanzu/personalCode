import React from 'react';
import { ProColumns, ProFormColumnsType } from '@ant-design/pro-components';
import { Dayjs } from 'dayjs';

export enum FormType {
  ADD = 'add',
  EDIT = 'edit',
}

export enum RowActionType {
  EDIT = 'edit',
  DELETE = 'delete',
  CHANGE_STATUS = 'changeStatus',
  OTHER = 'other',
}

export type Columns = ProColumns &
  ProFormColumnsType & {
    hideInAddForm?: boolean;
    hideInEditForm?: boolean;
    renderAddForm?: (formType: FormType) => React.ReactNode;
    renderEditForm?: (formType: FormType) => React.ReactNode;
  };

export type RangeValue = [Dayjs | null, Dayjs | null] | null;
