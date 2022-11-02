import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from "../../hooks/redux-hook";
import { switchTabBar } from "../../store/tabbar.slice";
import { NavBar,IndexBar, List, SearchBar } from 'antd-mobile'
import { CloseOutline } from 'antd-mobile-icons'
import styles from './City.module.scss'

export default function City() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cityJson = [
    {
      title: "A",
      items: [
        {
          cityId: 210300,
          name: "鞍山",
          pinyin: "anshan",
          isHot: 0,
        },
        {
          cityId: 340800,
          name: "安庆",
          pinyin: "anqing",
          isHot: 0,
        },
        {
          cityId: 410500,
          name: "安阳",
          pinyin: "anyang",
          isHot: 0,
        },
        {
          cityId: 520400,
          name: "安顺",
          pinyin: "anshun",
          isHot: 0,
        },
        {
          cityId: 610900,
          name: "安康",
          pinyin: "ankang",
          isHot: 0,
        },
        {
          cityId: 652900,
          name: "阿克苏地区",
          pinyin: "ake",
          isHot: 0,
        },
      ],
    },
    {
      title: "B",
      items: [
        {
          cityId: 110100,
          name: "北京",
          pinyin: "beijing",
          isHot: 1,
        },
        {
          cityId: 130600,
          name: "保定",
          pinyin: "baoding",
          isHot: 0,
        },
        {
          cityId: 150200,
          name: "包头",
          pinyin: "baotou",
          isHot: 0,
        },
        {
          cityId: 150800,
          name: "巴彦淖尔",
          pinyin: "bayan",
          isHot: 0,
        },
        {
          cityId: 210500,
          name: "本溪",
          pinyin: "benxi",
          isHot: 0,
        },
        {
          cityId: 220600,
          name: "白山",
          pinyin: "baishan",
          isHot: 0,
        },
        {
          cityId: 220800,
          name: "白城",
          pinyin: "baicheng",
          isHot: 0,
        },
        {
          cityId: 340300,
          name: "蚌埠",
          pinyin: "bangbu",
          isHot: 0,
        },
        {
          cityId: 341600,
          name: "亳州",
          pinyin: "bozhou",
          isHot: 0,
        },
        {
          cityId: 371600,
          name: "滨州",
          pinyin: "binzhou",
          isHot: 0,
        },
        {
          cityId: 450500,
          name: "北海",
          pinyin: "beihai",
          isHot: 0,
        },
        {
          cityId: 451000,
          name: "百色",
          pinyin: "baise",
          isHot: 0,
        },
        {
          cityId: 511900,
          name: "巴中",
          pinyin: "bazhong",
          isHot: 0,
        },
        {
          cityId: 520500,
          name: "毕节",
          pinyin: "bijie",
          isHot: 0,
        },
        {
          cityId: 530500,
          name: "保山",
          pinyin: "baoshan",
          isHot: 0,
        },
        {
          cityId: 610300,
          name: "宝鸡",
          pinyin: "baoji",
          isHot: 0,
        },
        {
          cityId: 620400,
          name: "白银",
          pinyin: "baiyin",
          isHot: 0,
        },
      ],
    },
    {
      title: "C",
      items: [
        {
          cityId: 130800,
          name: "承德",
          pinyin: "chengde",
          isHot: 0,
        },
        {
          cityId: 130900,
          name: "沧州",
          pinyin: "cangzhou",
          isHot: 0,
        },
        {
          cityId: 140400,
          name: "长治",
          pinyin: "changzhi",
          isHot: 0,
        },
        {
          cityId: 150400,
          name: "赤峰",
          pinyin: "chifeng",
          isHot: 0,
        },
        {
          cityId: 211300,
          name: "朝阳",
          pinyin: "chaoyang",
          isHot: 0,
        },
        {
          cityId: 220100,
          name: "长春",
          pinyin: "changchun",
          isHot: 0,
        },
        {
          cityId: 320400,
          name: "常州",
          pinyin: "changzhou",
          isHot: 0,
        },
        {
          cityId: 341100,
          name: "滁州",
          pinyin: "chuzhou",
          isHot: 0,
        },
        {
          cityId: 341700,
          name: "池州",
          pinyin: "chizhou",
          isHot: 0,
        },
        {
          cityId: 430100,
          name: "长沙",
          pinyin: "changsha",
          isHot: 0,
        },
        {
          cityId: 430700,
          name: "常德",
          pinyin: "changde",
          isHot: 0,
        },
        {
          cityId: 431000,
          name: "郴州",
          pinyin: "chenzhou",
          isHot: 0,
        },
        {
          cityId: 445100,
          name: "潮州",
          pinyin: "chaozhou",
          isHot: 0,
        },
        {
          cityId: 451400,
          name: "崇左",
          pinyin: "chongzuo",
          isHot: 0,
        },
        {
          cityId: 469023,
          name: "澄迈县",
          pinyin: "chengmai",
          isHot: 0,
        },
        {
          cityId: 469026,
          name: "昌江黎族自治县",
          pinyin: "changjiang",
          isHot: 0,
        },
        {
          cityId: 500100,
          name: "重庆",
          pinyin: "chongqing",
          isHot: 0,
        },
        {
          cityId: 510100,
          name: "成都",
          pinyin: "chengdou",
          isHot: 0,
        },
        {
          cityId: 532300,
          name: "楚雄彝族自治州",
          pinyin: "chuxiong",
          isHot: 0,
        },
        {
          cityId: 652300,
          name: "昌吉回族自治州",
          pinyin: "changji",
          isHot: 0,
        },
      ],
    },
    {
      title: "D",
      items: [
        {
          cityId: 140200,
          name: "大同",
          pinyin: "datong",
          isHot: 0,
        },
        {
          cityId: 210200,
          name: "大连",
          pinyin: "dalian",
          isHot: 0,
        },
        {
          cityId: 210600,
          name: "丹东",
          pinyin: "dandong",
          isHot: 0,
        },
        {
          cityId: 230600,
          name: "大庆",
          pinyin: "daqing",
          isHot: 0,
        },
        {
          cityId: 232700,
          name: "大兴安岭地区",
          pinyin: "daxing",
          isHot: 0,
        },
        {
          cityId: 370500,
          name: "东营",
          pinyin: "dongying",
          isHot: 0,
        },
        {
          cityId: 371400,
          name: "德州",
          pinyin: "dezhou",
          isHot: 0,
        },
        {
          cityId: 441900,
          name: "东莞",
          pinyin: "dongguan",
          isHot: 0,
        },
        {
          cityId: 460400,
          name: "儋州",
          pinyin: "danzhou",
          isHot: 0,
        },
        {
          cityId: 469007,
          name: "东方",
          pinyin: "dongfang",
          isHot: 0,
        },
        {
          cityId: 510600,
          name: "德阳",
          pinyin: "deyang",
          isHot: 0,
        },
        {
          cityId: 511700,
          name: "达州",
          pinyin: "dazhou",
          isHot: 0,
        },
        {
          cityId: 532900,
          name: "大理白族自治州",
          pinyin: "dali",
          isHot: 0,
        },
        {
          cityId: 533100,
          name: "德宏傣族景颇族自治州",
          pinyin: "dehong",
          isHot: 0,
        },
        {
          cityId: 533400,
          name: "迪庆藏族自治州",
          pinyin: "diqing",
          isHot: 0,
        },
        {
          cityId: 621100,
          name: "定西",
          pinyin: "dingxi",
          isHot: 0,
        },
      ],
    },
    {
      title: "E",
      items: [
        {
          cityId: 150600,
          name: "鄂尔多斯",
          pinyin: "eer",
          isHot: 0,
        },
        {
          cityId: 420700,
          name: "鄂州",
          pinyin: "ezhou",
          isHot: 0,
        },
        {
          cityId: 422800,
          name: "恩施土家族苗族自治州",
          pinyin: "enshi",
          isHot: 0,
        },
      ],
    },
    {
      title: "F",
      items: [
        {
          cityId: 210400,
          name: "抚顺",
          pinyin: "fushun",
          isHot: 0,
        },
        {
          cityId: 210900,
          name: "阜新",
          pinyin: "fuxin",
          isHot: 0,
        },
        {
          cityId: 341200,
          name: "阜阳",
          pinyin: "fuyang",
          isHot: 0,
        },
        {
          cityId: 350100,
          name: "福州",
          pinyin: "fuzhou",
          isHot: 0,
        },
        {
          cityId: 361000,
          name: "抚州",
          pinyin: "fuzhou",
          isHot: 0,
        },
        {
          cityId: 440600,
          name: "佛山",
          pinyin: "fushan",
          isHot: 0,
        },
        {
          cityId: 450600,
          name: "防城港",
          pinyin: "fangcheng",
          isHot: 0,
        },
      ],
    },
    {
      title: "G",
      items: [
        {
          cityId: 360700,
          name: "赣州",
          pinyin: "ganzhou",
          isHot: 0,
        },
        {
          cityId: 440100,
          name: "广州",
          pinyin: "guangzhou",
          isHot: 1,
        },
        {
          cityId: 450300,
          name: "桂林",
          pinyin: "guilin",
          isHot: 0,
        },
        {
          cityId: 450800,
          name: "贵港",
          pinyin: "guigang",
          isHot: 0,
        },
        {
          cityId: 510800,
          name: "广元",
          pinyin: "guangyuan",
          isHot: 0,
        },
        {
          cityId: 511600,
          name: "广安",
          pinyin: "guangan",
          isHot: 0,
        },
        {
          cityId: 520100,
          name: "贵阳",
          pinyin: "guiyang",
          isHot: 0,
        },
        {
          cityId: 640400,
          name: "固原",
          pinyin: "guyuan",
          isHot: 0,
        },
      ],
    },
    {
      title: "H",
      items: [
        {
          cityId: 130400,
          name: "邯郸",
          pinyin: "handan",
          isHot: 0,
        },
        {
          cityId: 131100,
          name: "衡水",
          pinyin: "hengshui",
          isHot: 0,
        },
        {
          cityId: 150100,
          name: "呼和浩特",
          pinyin: "huhe",
          isHot: 0,
        },
        {
          cityId: 150700,
          name: "呼伦贝尔",
          pinyin: "hulun",
          isHot: 0,
        },
        {
          cityId: 211400,
          name: "葫芦岛",
          pinyin: "hulu",
          isHot: 0,
        },
        {
          cityId: 230100,
          name: "哈尔滨",
          pinyin: "haer",
          isHot: 0,
        },
        {
          cityId: 231100,
          name: "黑河",
          pinyin: "heihe",
          isHot: 0,
        },
        {
          cityId: 320800,
          name: "淮安",
          pinyin: "huaian",
          isHot: 0,
        },
        {
          cityId: 330100,
          name: "杭州",
          pinyin: "hangzhou",
          isHot: 0,
        },
        {
          cityId: 330500,
          name: "湖州",
          pinyin: "huzhou",
          isHot: 0,
        },
        {
          cityId: 340100,
          name: "合肥",
          pinyin: "hefei",
          isHot: 0,
        },
        {
          cityId: 340400,
          name: "淮南",
          pinyin: "huainan",
          isHot: 0,
        },
        {
          cityId: 340600,
          name: "淮北",
          pinyin: "huaibei",
          isHot: 0,
        },
        {
          cityId: 341000,
          name: "黄山",
          pinyin: "huangshan",
          isHot: 0,
        },
        {
          cityId: 371700,
          name: "菏泽",
          pinyin: "heze",
          isHot: 0,
        },
        {
          cityId: 410600,
          name: "鹤壁",
          pinyin: "hebi",
          isHot: 0,
        },
        {
          cityId: 420200,
          name: "黄石",
          pinyin: "huangshi",
          isHot: 0,
        },
        {
          cityId: 421100,
          name: "黄冈",
          pinyin: "huanggang",
          isHot: 0,
        },
        {
          cityId: 430400,
          name: "衡阳",
          pinyin: "hengyang",
          isHot: 0,
        },
        {
          cityId: 431200,
          name: "怀化",
          pinyin: "huaihua",
          isHot: 0,
        },
        {
          cityId: 441300,
          name: "惠州",
          pinyin: "huizhou",
          isHot: 0,
        },
        {
          cityId: 441600,
          name: "河源",
          pinyin: "heyuan",
          isHot: 0,
        },
        {
          cityId: 451100,
          name: "贺州",
          pinyin: "hezhou",
          isHot: 0,
        },
        {
          cityId: 451200,
          name: "河池",
          pinyin: "hechi",
          isHot: 0,
        },
        {
          cityId: 460100,
          name: "海口",
          pinyin: "haikou",
          isHot: 0,
        },
        {
          cityId: 532500,
          name: "红河哈尼族彝族自治州",
          pinyin: "honghe",
          isHot: 0,
        },
        {
          cityId: 610700,
          name: "汉中",
          pinyin: "hanzhong",
          isHot: 0,
        },
        {
          cityId: 630200,
          name: "海东",
          pinyin: "haidong",
          isHot: 0,
        },
        {
          cityId: 632300,
          name: "黄南藏族自治州",
          pinyin: "huangnan",
          isHot: 0,
        },
        {
          cityId: 650500,
          name: "哈密",
          pinyin: "hami",
          isHot: 0,
        },
      ],
    },
    {
      title: "J",
      items: [
        {
          cityId: 140500,
          name: "晋城",
          pinyin: "jincheng",
          isHot: 0,
        },
        {
          cityId: 140700,
          name: "晋中",
          pinyin: "jinzhong",
          isHot: 0,
        },
        {
          cityId: 210700,
          name: "锦州",
          pinyin: "jinzhou",
          isHot: 0,
        },
        {
          cityId: 220200,
          name: "吉林",
          pinyin: "jilin",
          isHot: 0,
        },
        {
          cityId: 230300,
          name: "鸡西",
          pinyin: "jixi",
          isHot: 0,
        },
        {
          cityId: 230800,
          name: "佳木斯",
          pinyin: "jiamu",
          isHot: 0,
        },
        {
          cityId: 330400,
          name: "嘉兴",
          pinyin: "jiaxing",
          isHot: 0,
        },
        {
          cityId: 330700,
          name: "金华",
          pinyin: "jinhua",
          isHot: 0,
        },
        {
          cityId: 360200,
          name: "景德镇",
          pinyin: "jingde",
          isHot: 0,
        },
        {
          cityId: 360400,
          name: "九江",
          pinyin: "jiujiang",
          isHot: 0,
        },
        {
          cityId: 360800,
          name: "吉安",
          pinyin: "jian",
          isHot: 0,
        },
        {
          cityId: 370100,
          name: "济南",
          pinyin: "jinan",
          isHot: 0,
        },
        {
          cityId: 370800,
          name: "济宁",
          pinyin: "jining",
          isHot: 0,
        },
        {
          cityId: 410800,
          name: "焦作",
          pinyin: "jiaozuo",
          isHot: 0,
        },
        {
          cityId: 419001,
          name: "济源",
          pinyin: "jiyuan",
          isHot: 0,
        },
        {
          cityId: 420800,
          name: "荆门",
          pinyin: "jingmen",
          isHot: 0,
        },
        {
          cityId: 421000,
          name: "荆州",
          pinyin: "jingzhou",
          isHot: 0,
        },
        {
          cityId: 440700,
          name: "江门",
          pinyin: "jiangmen",
          isHot: 0,
        },
        {
          cityId: 445200,
          name: "揭阳",
          pinyin: "jieyang",
          isHot: 0,
        },
        {
          cityId: 620200,
          name: "嘉峪关",
          pinyin: "jiayu",
          isHot: 0,
        },
        {
          cityId: 620300,
          name: "金昌",
          pinyin: "jinchang",
          isHot: 0,
        },
        {
          cityId: 620900,
          name: "酒泉",
          pinyin: "jiuquan",
          isHot: 0,
        },
      ],
    },
    {
      title: "K",
      items: [
        {
          cityId: 410200,
          name: "开封",
          pinyin: "kaifeng",
          isHot: 0,
        },
        {
          cityId: 530100,
          name: "昆明",
          pinyin: "kunming",
          isHot: 0,
        },
        {
          cityId: 653100,
          name: "喀什地区",
          pinyin: "kashen",
          isHot: 0,
        },
      ],
    },
    {
      title: "L",
      items: [
        {
          cityId: 131000,
          name: "廊坊",
          pinyin: "langfang",
          isHot: 0,
        },
        {
          cityId: 141000,
          name: "临汾",
          pinyin: "linfen",
          isHot: 0,
        },
        {
          cityId: 141100,
          name: "吕梁",
          pinyin: "lvliang",
          isHot: 0,
        },
        {
          cityId: 211000,
          name: "辽阳",
          pinyin: "liaoyang",
          isHot: 0,
        },
        {
          cityId: 220400,
          name: "辽源",
          pinyin: "liaoyuan",
          isHot: 0,
        },
        {
          cityId: 320700,
          name: "连云港",
          pinyin: "lianyun",
          isHot: 0,
        },
        {
          cityId: 331100,
          name: "丽水",
          pinyin: "lishui",
          isHot: 0,
        },
        {
          cityId: 341500,
          name: "六安",
          pinyin: "liuan",
          isHot: 0,
        },
        {
          cityId: 350800,
          name: "龙岩",
          pinyin: "longyan",
          isHot: 0,
        },
        {
          cityId: 371200,
          name: "莱芜",
          pinyin: "laiwu",
          isHot: 0,
        },
        {
          cityId: 371300,
          name: "临沂",
          pinyin: "linyi",
          isHot: 0,
        },
        {
          cityId: 371500,
          name: "聊城",
          pinyin: "liaocheng",
          isHot: 0,
        },
        {
          cityId: 410300,
          name: "洛阳",
          pinyin: "luoyang",
          isHot: 0,
        },
        {
          cityId: 411100,
          name: "漯河",
          pinyin: "luohe",
          isHot: 0,
        },
        {
          cityId: 431300,
          name: "娄底",
          pinyin: "loudi",
          isHot: 0,
        },
        {
          cityId: 450200,
          name: "柳州",
          pinyin: "liuzhou",
          isHot: 0,
        },
        {
          cityId: 451300,
          name: "来宾",
          pinyin: "laibin",
          isHot: 0,
        },
        {
          cityId: 469024,
          name: "临高县",
          pinyin: "lingao",
          isHot: 0,
        },
        {
          cityId: 469027,
          name: "乐东黎族自治县",
          pinyin: "ledong",
          isHot: 0,
        },
        {
          cityId: 510500,
          name: "泸州",
          pinyin: "luzhou",
          isHot: 0,
        },
        {
          cityId: 511100,
          name: "乐山",
          pinyin: "leshan",
          isHot: 0,
        },
        {
          cityId: 513400,
          name: "凉山彝族自治州",
          pinyin: "liangshan",
          isHot: 0,
        },
        {
          cityId: 520200,
          name: "六盘水",
          pinyin: "liupan",
          isHot: 0,
        },
        {
          cityId: 530700,
          name: "丽江",
          pinyin: "lijiang",
          isHot: 0,
        },
        {
          cityId: 530900,
          name: "临沧",
          pinyin: "lincang",
          isHot: 0,
        },
        {
          cityId: 540100,
          name: "拉萨",
          pinyin: "lasa",
          isHot: 0,
        },
        {
          cityId: 620100,
          name: "兰州",
          pinyin: "lanzhou",
          isHot: 0,
        },
        {
          cityId: 621200,
          name: "陇南",
          pinyin: "longnan",
          isHot: 0,
        },
        {
          cityId: 622900,
          name: "临夏回族自治州",
          pinyin: "linxia",
          isHot: 0,
        },
      ],
    },
    {
      title: "M",
      items: [
        {
          cityId: 231000,
          name: "牡丹江",
          pinyin: "mudan",
          isHot: 0,
        },
        {
          cityId: 340500,
          name: "马鞍山",
          pinyin: "maan",
          isHot: 0,
        },
        {
          cityId: 440900,
          name: "茂名",
          pinyin: "maoming",
          isHot: 0,
        },
        {
          cityId: 441400,
          name: "梅州",
          pinyin: "meizhou",
          isHot: 0,
        },
        {
          cityId: 510700,
          name: "绵阳",
          pinyin: "mianyang",
          isHot: 0,
        },
        {
          cityId: 511400,
          name: "眉山",
          pinyin: "meishan",
          isHot: 0,
        },
      ],
    },
    {
      title: "N",
      items: [
        {
          cityId: 320100,
          name: "南京",
          pinyin: "nanjing",
          isHot: 0,
        },
        {
          cityId: 320600,
          name: "南通",
          pinyin: "nantong",
          isHot: 0,
        },
        {
          cityId: 330200,
          name: "宁波",
          pinyin: "ningbo",
          isHot: 0,
        },
        {
          cityId: 350700,
          name: "南平",
          pinyin: "nanping",
          isHot: 0,
        },
        {
          cityId: 350900,
          name: "宁德",
          pinyin: "ningde",
          isHot: 0,
        },
        {
          cityId: 360100,
          name: "南昌",
          pinyin: "nanchang",
          isHot: 0,
        },
        {
          cityId: 411300,
          name: "南阳",
          pinyin: "nanyang",
          isHot: 0,
        },
        {
          cityId: 450100,
          name: "南宁",
          pinyin: "nanning",
          isHot: 0,
        },
        {
          cityId: 511000,
          name: "内江",
          pinyin: "neijiang",
          isHot: 0,
        },
        {
          cityId: 511300,
          name: "南充",
          pinyin: "nanchong",
          isHot: 0,
        },
        {
          cityId: 533300,
          name: "怒江傈僳族自治州",
          pinyin: "nujiang",
          isHot: 0,
        },
      ],
    },
    {
      title: "P",
      items: [
        {
          cityId: 211100,
          name: "盘锦",
          pinyin: "panjin",
          isHot: 0,
        },
        {
          cityId: 350300,
          name: "莆田",
          pinyin: "putian",
          isHot: 0,
        },
        {
          cityId: 360300,
          name: "萍乡",
          pinyin: "pingxiang",
          isHot: 0,
        },
        {
          cityId: 410400,
          name: "平顶山",
          pinyin: "pingding",
          isHot: 0,
        },
        {
          cityId: 410900,
          name: "濮阳",
          pinyin: "puyang",
          isHot: 0,
        },
        {
          cityId: 510400,
          name: "攀枝花",
          pinyin: "panzhi",
          isHot: 0,
        },
        {
          cityId: 530800,
          name: "普洱",
          pinyin: "puer",
          isHot: 0,
        },
        {
          cityId: 620800,
          name: "平凉",
          pinyin: "pingliang",
          isHot: 0,
        },
      ],
    },
    {
      title: "Q",
      items: [
        {
          cityId: 130300,
          name: "秦皇岛",
          pinyin: "qinhuang",
          isHot: 0,
        },
        {
          cityId: 230200,
          name: "齐齐哈尔",
          pinyin: "qiqi",
          isHot: 0,
        },
        {
          cityId: 330800,
          name: "衢州",
          pinyin: "quzhou",
          isHot: 0,
        },
        {
          cityId: 350500,
          name: "泉州",
          pinyin: "quanzhou",
          isHot: 0,
        },
        {
          cityId: 370200,
          name: "青岛",
          pinyin: "qingdao",
          isHot: 0,
        },
        {
          cityId: 429005,
          name: "潜江",
          pinyin: "qianjiang",
          isHot: 0,
        },
        {
          cityId: 441800,
          name: "清远",
          pinyin: "qingyuan",
          isHot: 0,
        },
        {
          cityId: 450700,
          name: "钦州",
          pinyin: "qinzhou",
          isHot: 0,
        },
        {
          cityId: 469002,
          name: "琼海",
          pinyin: "qionghai",
          isHot: 0,
        },
        {
          cityId: 522300,
          name: "黔西南布依族苗族自治州",
          pinyin: "qianxi",
          isHot: 0,
        },
        {
          cityId: 522600,
          name: "黔东南苗族侗族自治州",
          pinyin: "qiandong",
          isHot: 0,
        },
        {
          cityId: 522700,
          name: "黔南布依族苗族自治州",
          pinyin: "qiannan",
          isHot: 0,
        },
        {
          cityId: 530300,
          name: "曲靖",
          pinyin: "qujing",
          isHot: 0,
        },
        {
          cityId: 621000,
          name: "庆阳",
          pinyin: "qingyang",
          isHot: 0,
        },
      ],
    },
    {
      title: "R",
      items: [
        {
          cityId: 371100,
          name: "日照",
          pinyin: "rizhao",
          isHot: 0,
        },
      ],
    },
    {
      title: "S",
      items: [
        {
          cityId: 130100,
          name: "石家庄",
          pinyin: "shijia",
          isHot: 0,
        },
        {
          cityId: 140600,
          name: "朔州",
          pinyin: "shuozhou",
          isHot: 0,
        },
        {
          cityId: 210100,
          name: "沈阳",
          pinyin: "shenyang",
          isHot: 0,
        },
        {
          cityId: 220300,
          name: "四平",
          pinyin: "siping",
          isHot: 0,
        },
        {
          cityId: 220700,
          name: "松原",
          pinyin: "songyuan",
          isHot: 0,
        },
        {
          cityId: 230500,
          name: "双鸭山",
          pinyin: "shuangya",
          isHot: 0,
        },
        {
          cityId: 231200,
          name: "绥化",
          pinyin: "suihua",
          isHot: 0,
        },
        {
          cityId: 310100,
          name: "上海",
          pinyin: "shanghai",
          isHot: 1,
        },
        {
          cityId: 320500,
          name: "苏州",
          pinyin: "suzhou",
          isHot: 0,
        },
        {
          cityId: 321300,
          name: "宿迁",
          pinyin: "suqian",
          isHot: 0,
        },
        {
          cityId: 330600,
          name: "绍兴",
          pinyin: "shaoxing",
          isHot: 0,
        },
        {
          cityId: 341300,
          name: "宿州",
          pinyin: "suzhou",
          isHot: 0,
        },
        {
          cityId: 350400,
          name: "三明",
          pinyin: "sanming",
          isHot: 0,
        },
        {
          cityId: 361100,
          name: "上饶",
          pinyin: "shangrao",
          isHot: 0,
        },
        {
          cityId: 411200,
          name: "三门峡",
          pinyin: "sanmen",
          isHot: 0,
        },
        {
          cityId: 411400,
          name: "商丘",
          pinyin: "shangqiu",
          isHot: 0,
        },
        {
          cityId: 420300,
          name: "十堰",
          pinyin: "shiyan",
          isHot: 0,
        },
        {
          cityId: 421300,
          name: "随州",
          pinyin: "suizhou",
          isHot: 0,
        },
        {
          cityId: 430500,
          name: "邵阳",
          pinyin: "shaoyang",
          isHot: 0,
        },
        {
          cityId: 440200,
          name: "韶关",
          pinyin: "shaoguan",
          isHot: 0,
        },
        {
          cityId: 440300,
          name: "深圳",
          pinyin: "shenzhen",
          isHot: 1,
        },
        {
          cityId: 440500,
          name: "汕头",
          pinyin: "shantou",
          isHot: 0,
        },
        {
          cityId: 441500,
          name: "汕尾",
          pinyin: "shanwei",
          isHot: 0,
        },
        {
          cityId: 460200,
          name: "三亚",
          pinyin: "sanya",
          isHot: 0,
        },
        {
          cityId: 510900,
          name: "遂宁",
          pinyin: "suining",
          isHot: 0,
        },
        {
          cityId: 611000,
          name: "商洛",
          pinyin: "shangluo",
          isHot: 0,
        },
        {
          cityId: 640200,
          name: "石嘴山",
          pinyin: "shizui",
          isHot: 0,
        },
        {
          cityId: 659001,
          name: "石河子",
          pinyin: "shihe",
          isHot: 0,
        },
      ],
    },
    {
      title: "T",
      items: [
        {
          cityId: 120100,
          name: "天津",
          pinyin: "tianjin",
          isHot: 0,
        },
        {
          cityId: 130200,
          name: "唐山",
          pinyin: "tangshan",
          isHot: 0,
        },
        {
          cityId: 140100,
          name: "太原",
          pinyin: "taiyuan",
          isHot: 0,
        },
        {
          cityId: 150500,
          name: "通辽",
          pinyin: "tongliao",
          isHot: 0,
        },
        {
          cityId: 211200,
          name: "铁岭",
          pinyin: "tieling",
          isHot: 0,
        },
        {
          cityId: 220500,
          name: "通化",
          pinyin: "tonghua",
          isHot: 0,
        },
        {
          cityId: 321200,
          name: "泰州",
          pinyin: "taizhou",
          isHot: 0,
        },
        {
          cityId: 331000,
          name: "台州",
          pinyin: "taizhou",
          isHot: 0,
        },
        {
          cityId: 340700,
          name: "铜陵",
          pinyin: "tongling",
          isHot: 0,
        },
        {
          cityId: 370900,
          name: "泰安",
          pinyin: "taian",
          isHot: 0,
        },
        {
          cityId: 429006,
          name: "天门",
          pinyin: "tianmen",
          isHot: 0,
        },
        {
          cityId: 469022,
          name: "屯昌县",
          pinyin: "tunchang",
          isHot: 0,
        },
        {
          cityId: 520600,
          name: "铜仁",
          pinyin: "tongren",
          isHot: 0,
        },
        {
          cityId: 610200,
          name: "铜川",
          pinyin: "tongchuan",
          isHot: 0,
        },
        {
          cityId: 620500,
          name: "天水",
          pinyin: "tianshui",
          isHot: 0,
        },
        {
          cityId: 654200,
          name: "塔城地区",
          pinyin: "tacheng",
          isHot: 0,
        },
      ],
    },
    {
      title: "W",
      items: [
        {
          cityId: 150300,
          name: "乌海",
          pinyin: "wuhai",
          isHot: 0,
        },
        {
          cityId: 150900,
          name: "乌兰察布",
          pinyin: "wulan",
          isHot: 0,
        },
        {
          cityId: 330300,
          name: "温州",
          pinyin: "wenzhou",
          isHot: 0,
        },
        {
          cityId: 340200,
          name: "芜湖",
          pinyin: "wuhu",
          isHot: 0,
        },
        {
          cityId: 370700,
          name: "潍坊",
          pinyin: "weifang",
          isHot: 0,
        },
        {
          cityId: 371000,
          name: "威海",
          pinyin: "weihai",
          isHot: 0,
        },
        {
          cityId: 420100,
          name: "武汉",
          pinyin: "wuhan",
          isHot: 0,
        },
        {
          cityId: 450400,
          name: "梧州",
          pinyin: "wuzhou",
          isHot: 0,
        },
        {
          cityId: 469001,
          name: "五指山",
          pinyin: "wuzhi",
          isHot: 0,
        },
        {
          cityId: 469005,
          name: "文昌",
          pinyin: "wenchang",
          isHot: 0,
        },
        {
          cityId: 532600,
          name: "文山壮族苗族自治州",
          pinyin: "wenshan",
          isHot: 0,
        },
        {
          cityId: 610500,
          name: "渭南",
          pinyin: "weinan",
          isHot: 0,
        },
        {
          cityId: 620600,
          name: "武威",
          pinyin: "wuwei",
          isHot: 0,
        },
        {
          cityId: 640300,
          name: "吴忠",
          pinyin: "wuzhong",
          isHot: 0,
        },
        {
          cityId: 650100,
          name: "乌鲁木齐",
          pinyin: "wulu",
          isHot: 0,
        },
        {
          cityId: 659004,
          name: "五家渠",
          pinyin: "wujia",
          isHot: 0,
        },
        {
          cityId: 320200,
          name: "无锡",
          pinyin: "wuxi",
          isHot: 0,
        },
      ],
    },
    {
      title: "X",
      items: [
        {
          cityId: 130500,
          name: "邢台",
          pinyin: "xingtai",
          isHot: 0,
        },
        {
          cityId: 140900,
          name: "忻州",
          pinyin: "xinzhou",
          isHot: 0,
        },
        {
          cityId: 152200,
          name: "兴安盟",
          pinyin: "xingan",
          isHot: 0,
        },
        {
          cityId: 152500,
          name: "锡林郭勒盟",
          pinyin: "xilin",
          isHot: 0,
        },
        {
          cityId: 320300,
          name: "徐州",
          pinyin: "xuzhou",
          isHot: 0,
        },
        {
          cityId: 341800,
          name: "宣城",
          pinyin: "xuancheng",
          isHot: 0,
        },
        {
          cityId: 350200,
          name: "厦门",
          pinyin: "xiamen",
          isHot: 0,
        },
        {
          cityId: 360500,
          name: "新余",
          pinyin: "xinyu",
          isHot: 0,
        },
        {
          cityId: 410700,
          name: "新乡",
          pinyin: "xinxiang",
          isHot: 0,
        },
        {
          cityId: 411000,
          name: "许昌",
          pinyin: "xuchang",
          isHot: 0,
        },
        {
          cityId: 411500,
          name: "信阳",
          pinyin: "xinyang",
          isHot: 0,
        },
        {
          cityId: 420600,
          name: "襄阳",
          pinyin: "xiangyang",
          isHot: 0,
        },
        {
          cityId: 420900,
          name: "孝感",
          pinyin: "xiaogan",
          isHot: 0,
        },
        {
          cityId: 421200,
          name: "咸宁",
          pinyin: "xianning",
          isHot: 0,
        },
        {
          cityId: 429004,
          name: "仙桃",
          pinyin: "xiantao",
          isHot: 0,
        },
        {
          cityId: 430300,
          name: "湘潭",
          pinyin: "xiangtan",
          isHot: 0,
        },
        {
          cityId: 433100,
          name: "湘西土家族苗族自治州",
          pinyin: "xiangxi",
          isHot: 0,
        },
        {
          cityId: 532800,
          name: "西双版纳傣族自治州",
          pinyin: "xishuang",
          isHot: 0,
        },
        {
          cityId: 610100,
          name: "西安",
          pinyin: "xian",
          isHot: 0,
        },
        {
          cityId: 610400,
          name: "咸阳",
          pinyin: "xianyang",
          isHot: 0,
        },
        {
          cityId: 630100,
          name: "西宁",
          pinyin: "xining",
          isHot: 0,
        },
      ],
    },
    {
      title: "Y",
      items: [
        {
          cityId: 140300,
          name: "阳泉",
          pinyin: "yangquan",
          isHot: 0,
        },
        {
          cityId: 140800,
          name: "运城",
          pinyin: "yuncheng",
          isHot: 0,
        },
        {
          cityId: 210800,
          name: "营口",
          pinyin: "yingkou",
          isHot: 0,
        },
        {
          cityId: 222400,
          name: "延边朝鲜族自治州",
          pinyin: "yanbian",
          isHot: 0,
        },
        {
          cityId: 320900,
          name: "盐城",
          pinyin: "yancheng",
          isHot: 0,
        },
        {
          cityId: 321000,
          name: "扬州",
          pinyin: "yangzhou",
          isHot: 0,
        },
        {
          cityId: 360600,
          name: "鹰潭",
          pinyin: "yingtan",
          isHot: 0,
        },
        {
          cityId: 360900,
          name: "宜春",
          pinyin: "yichun",
          isHot: 0,
        },
        {
          cityId: 370600,
          name: "烟台",
          pinyin: "yantai",
          isHot: 0,
        },
        {
          cityId: 420500,
          name: "宜昌",
          pinyin: "yichang",
          isHot: 0,
        },
        {
          cityId: 430600,
          name: "岳阳",
          pinyin: "yueyang",
          isHot: 0,
        },
        {
          cityId: 430900,
          name: "益阳",
          pinyin: "yiyang",
          isHot: 0,
        },
        {
          cityId: 431100,
          name: "永州",
          pinyin: "yongzhou",
          isHot: 0,
        },
        {
          cityId: 441700,
          name: "阳江",
          pinyin: "yangjiang",
          isHot: 0,
        },
        {
          cityId: 445300,
          name: "云浮",
          pinyin: "yunfu",
          isHot: 0,
        },
        {
          cityId: 450900,
          name: "玉林",
          pinyin: "yulin",
          isHot: 0,
        },
        {
          cityId: 511500,
          name: "宜宾",
          pinyin: "yibin",
          isHot: 0,
        },
        {
          cityId: 511800,
          name: "雅安",
          pinyin: "yaan",
          isHot: 0,
        },
        {
          cityId: 530400,
          name: "玉溪",
          pinyin: "yuxi",
          isHot: 0,
        },
        {
          cityId: 610600,
          name: "延安",
          pinyin: "yanan",
          isHot: 0,
        },
        {
          cityId: 610800,
          name: "榆林",
          pinyin: "yulin",
          isHot: 0,
        },
        {
          cityId: 640100,
          name: "银川",
          pinyin: "yinchuan",
          isHot: 0,
        },
        {
          cityId: 654000,
          name: "伊犁哈萨克自治州",
          pinyin: "yili",
          isHot: 0,
        },
      ],
    },
    {
      title: "Z",
      items: [
        {
          cityId: 130700,
          name: "张家口",
          pinyin: "zhangjia",
          isHot: 0,
        },
        {
          cityId: 321100,
          name: "镇江",
          pinyin: "zhenjiang",
          isHot: 0,
        },
        {
          cityId: 330900,
          name: "舟山",
          pinyin: "zhoushan",
          isHot: 0,
        },
        {
          cityId: 350600,
          name: "漳州",
          pinyin: "zhangzhou",
          isHot: 0,
        },
        {
          cityId: 370300,
          name: "淄博",
          pinyin: "zibo",
          isHot: 0,
        },
        {
          cityId: 370400,
          name: "枣庄",
          pinyin: "zaozhuang",
          isHot: 0,
        },
        {
          cityId: 410100,
          name: "郑州",
          pinyin: "zhengzhou",
          isHot: 0,
        },
        {
          cityId: 411600,
          name: "周口",
          pinyin: "zhoukou",
          isHot: 0,
        },
        {
          cityId: 411700,
          name: "驻马店",
          pinyin: "zhuma",
          isHot: 0,
        },
        {
          cityId: 430200,
          name: "株洲",
          pinyin: "zhuzhou",
          isHot: 0,
        },
        {
          cityId: 430800,
          name: "张家界",
          pinyin: "zhangjia",
          isHot: 0,
        },
        {
          cityId: 440400,
          name: "珠海",
          pinyin: "zhuhai",
          isHot: 0,
        },
        {
          cityId: 440800,
          name: "湛江",
          pinyin: "zhanjiang",
          isHot: 0,
        },
        {
          cityId: 441200,
          name: "肇庆",
          pinyin: "zhaoqing",
          isHot: 0,
        },
        {
          cityId: 442000,
          name: "中山",
          pinyin: "zhongshan",
          isHot: 0,
        },
        {
          cityId: 510300,
          name: "自贡",
          pinyin: "zigong",
          isHot: 0,
        },
        {
          cityId: 512000,
          name: "资阳",
          pinyin: "ziyang",
          isHot: 0,
        },
        {
          cityId: 520300,
          name: "遵义",
          pinyin: "zunyi",
          isHot: 0,
        },
        {
          cityId: 530600,
          name: "昭通",
          pinyin: "zhaotong",
          isHot: 0,
        },
        {
          cityId: 620700,
          name: "张掖",
          pinyin: "zhangye",
          isHot: 0,
        },
        {
          cityId: 640500,
          name: "中卫",
          pinyin: "zhongwei",
          isHot: 0,
        },
      ],
    },
  ];

  useEffect(() => {
    dispatch(switchTabBar({ status: false }));
    return () => {
      dispatch(switchTabBar({ status: true }));
    };
  }, []);
  return (
        <div className={ styles.city_page_container }>
            <NavBar  backArrow={<CloseOutline style={{ fontSize: '19px' }} />} onBack={() => navigate('/cinema')}>
                当前城市 -
            </NavBar>
            <div className={ styles.city_index_container }>
                <div className={ styles.city_top_part }>
                    <div className={ styles.search_container }>
                        {/* <SearchBar placeholder='请输入内容' showCancelButton /> */}
                        <SearchBar
                        placeholder='请输入内容'
                        style={{ '--background': '#ffffff'}}
                        showCancelButton
                        />
                    </div>
                </div>
                <IndexBar>
                    {cityJson.map(group => {
                    const { title, items } = group
                    return (
                        <IndexBar.Panel
                        index={title}
                        title={`${title}`}
                        key={`${title}`}
                        >
                        <List>
                            {items.map((item, index) => (
                            <List.Item key={index} className={ styles.list_cityName }>{item.name}</List.Item>
                            ))}
                        </List>
                        </IndexBar.Panel>
                    )
                    })}
                </IndexBar>
            </div>
        </div>
  );
}
