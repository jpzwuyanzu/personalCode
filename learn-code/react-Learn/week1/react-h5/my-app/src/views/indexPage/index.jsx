import React from 'react';
import './index.scss'
import { SearchBar, Icon} from 'antd-mobile'
import MayLike from './MayLike'
const IndexPage = () => {
    return (
        <div className="homePage">
            <div className="navBar">
                <div className="leftPart">
                    <span>香港</span>
                </div>
                <div className="searchInput">
                <SearchBar placeholder="请输入商家名、品类或者商圈..." maxLength={8} />
                </div>
                <div className="rightPart">
                    <span>
                        <img src="https://p0.meituan.net/travelcube/641521461179df7cfb88738dd1ea11ec1031.png" alt=""/>
                    </span>
                </div>
            </div>
            <div className="banner-download">
                <div className="banneritem">
                    <img src="https://p1.meituan.net/travelcube/7264ce9c25de2e464e3acd996fe8ad362803.png" alt=""/>
                    <div className="logo-theme">
                        <p className="logo-tit">省钱利器 购物超划算</p>
                        <p className="logo-desc">吃喝玩乐尽在美团</p>
                    </div>
                </div>
                <div className="bannerBtn">
                    去APP
                </div>
            </div>
            <div className="categoryContainer">
                <div className="categoryItem">
                    <div className="iconCon color1">
                        <Icon size="xs" color="#fff" type="check-circle-o"/>
                    </div>
                    <span className="categorytit">美食</span>
                </div>
                <div className="categoryItem">
                    <div className="iconCon color2">
                        <Icon size="xs" color="#fff" type="check-circle-o"/>
                    </div>
                    <span className="categorytit">猫眼电影</span>
                </div>
                <div className="categoryItem">
                    <div className="iconCon color3">
                        <Icon size="xs" color="#fff" type="check-circle-o"/>
                    </div>
                    <span className="categorytit">酒店</span>
                </div>
                <div className="categoryItem">
                    <div className="iconCon color4">
                        <Icon size="xs" color="#fff" type="check-circle-o"/>
                    </div>
                    <span className="categorytit">休闲娱乐</span>
                </div>
                <div className="categoryItem">
                    <div className="iconCon color5">
                        <Icon size="xs" color="#fff" type="check-circle-o"/>
                    </div>
                    <span className="categorytit">外卖</span>
                </div>
                <div className="categoryItem">
                    <div className="iconCon color6">
                        <Icon size="xs" color="#fff" type="check-circle-o"/>
                    </div>
                    <span className="categorytit">KTV</span>
                </div>
                <div className="categoryItem">
                    <div className="iconCon color7">
                        <Icon size="xs" color="#fff" type="check-circle-o"/>
                    </div>
                    <span className="categorytit">周边游</span>
                </div>
                <div className="categoryItem">
                    <div className="iconCon color8">
                        <Icon size="xs" color="#fff" type="check-circle-o"/>
                    </div>
                    <span className="categorytit">丽人</span>
                </div>
                <div className="categoryItem">
                    <div className="iconCon color9">
                        <Icon size="xs" color="#fff" type="check-circle-o"/>
                    </div>
                    <span className="categorytit">母婴亲子</span>
                </div>
                <div className="categoryItem">
                    <div className="iconCon color10">
                        <Icon size="xs" color="#fff" type="check-circle-o"/>
                    </div>
                    <span className="categorytit">全部分类</span>
                </div>
            </div>
            <div className="productList">
                <div className="proTitleLine">猜你喜欢</div>
                <div className="mayLike">
                   <MayLike/>
                </div>
            </div>
        </div>
    );
}

export default IndexPage;
