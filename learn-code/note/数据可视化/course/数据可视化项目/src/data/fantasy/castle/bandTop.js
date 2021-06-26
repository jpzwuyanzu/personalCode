/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2017-12-26 23:20:59
 * @Last Modified time: 2017-12-26 23:20:59
 * @Description: top5
 */
import {
  urlReg
} from '../../../assets/scripts/tool/utils'
import Mock from 'mockjs'
const data = () => {
  Mock.mock(urlReg('/iot/overview/top5'), {
    'code': 1,
    'msg': 'success',
    'result': {
      'sex': {
        'male': '@natural(20,80)',
        'female': '@natural(20,80)' // 其实没用
      },
      'jizhan': [{
        'name': '开县',
        'value': '@natural(500,600)'
      }, {
        'name': '云阳',
        'value': '@natural(400,500)'
      }, {
        'name': '巫山',
        'value': '@natural(300,400)'
      }, {
        'name': '彭水',
        'value': '@natural(200,300)'
      }, {
        'name': '武隆',
        'value': '@natural(100,200)'
      }]
    }
  })
}
export default data
