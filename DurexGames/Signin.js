// Loon脚本: 自动模拟 POST 签到请求，动态读取持久化的 Access-Token

const token = $persistentStore.read('ixiliu_token');  // 动态读取持久化的 Token

if (!token) {
    console.log("❌ 未找到持久化 Access-Token，请先运行获取脚本");
    $done();
    return;
}

const url = "https://vip.ixiliu.cn/open/cgi-open/dls_game/event_change_point";

const headers = {
    "Host": "vip.ixiliu.cn",
    "Connection": "keep-alive",
    "xweb_xhr": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090c33)XWEB/11581",
    "Content-Type": "application/json",
    "Accept": "*/*",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dep": "empty",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9"
};

const body = JSON.stringify({
    "event_type": "game_share",
    "enterprise_id": "298940337935808",
    "Access-Token": token  // 用动态读取的 token 替换
});

$httpClient.post({ url, headers, body }, function (error, response, data) {
    if (error) {
        console.log("❌ 请求失败:", error);
    } else {
        console.log("✅ 请求成功，状态码:", response.status);
        console.log("📦 返回数据:", data);
    }
    $done();
});
