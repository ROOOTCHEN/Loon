/*

脚本功能：i武汉 武汉战疫 微信小程序 伪装接种疫苗三次
脚本作者：RootChen
更新时间：2022-06-04
使用声明：️此脚本仅供学习与交流

***************************
QuantumultX:

[rewrite_local]
^https:?\/\/whhb\.tgovcloud\.com\/epidemicbg\/vaccine\/info\/v2\?qrcCode\=.+  url script-response-body https://raw.githubusercontent.com/ROOOTCHEN/QuantumultX/main/Bypass_Vaccines.js

[mitm]
hostname = whhw.tgovcloud.com
**************************/

if ($response.body) {
	$done({
	"msg": "执行成功",
	"code": 0,
	"data": [{
		"JZSJ": "2021-12-04",
		"ADDRESS": "关东街第二社区卫生服务中心",
		"MILL": "成都生物",
		"JZJC": "3"
	}, {
		"JZSJ": "2021-05-16",
		"ADDRESS": "关东街第二社区服务中心（新冠疫苗临时预防接种点）\n",
		"MILL": "北京生物",
		"JZJC": "2"
	}, {
		"JZSJ": "2021-03-21",
		"ADDRESS": "关东街第二社区卫生服务中心",
		"MILL": "武汉生物",
		"JZJC": "1"
	}]
}
);
} else {
	$done({});
}
