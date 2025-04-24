// Loon 脚本: 自动签到 - 支持 mobile 与 Access-Token 判断
const token = $persistentStore.read('ixiliu_token');
const mobile = $persistentStore.read('Phone');

if (!token || !mobile) {
    let msg = [];
    if (!token) msg.push("❌ Access-Token 缺失");
    if (!mobile) msg.push("📵 Mobile 号码未设置");
    $notification.post("杜杜签到失败", "参数缺失", msg.join("\n"));
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
    "mobile": mobile,
    "enterprise_id": "298940337935808",
    "Access-Token": token
});

$httpClient.post({ url, headers, body }, function (error, response, data) {
    if (error) {
        console.log("❌ 请求失败:", error);
        $notification.post("签到失败", "网络错误", error);
    } else {
        console.log("✅ 请求成功，状态码:", response.status);
        console.log("📦 返回数据:", data);
        try {
            let obj = JSON.parse(data);
            if (obj.code === 20000 || obj.status === 20000) {
                $notification.post("🎉 签到成功", obj.msg || "成功完成任务", "");
            } else {
                $notification.post("⚠️ 签到异常", obj.msg || "未知返回", JSON.stringify(obj));
            }
        } catch (e) {
            $notification.post("⚠️ 解析失败", "返回数据不是 JSON", data);
        }
    }
    $done();
});
