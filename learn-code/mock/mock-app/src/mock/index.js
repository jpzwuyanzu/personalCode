import Mock from 'mockjs'
import prolist from './pro'
Mock.mock('http://www.xiaohuozi.top/api/pro/list', prolist)
