// Loon script-response-body

let body = $response.body;
let obj = JSON.parse(body);

if (obj?.data?.['Access-Token']) {
    let newToken = obj.data['Access-Token'];
    let oldToken = $persistentStore.read('ixiliu_token');

    if (oldToken === newToken) {
        console.log("✅ Access-Token 未变化，无需更新");
    } else {
        let success = $persistentStore.write(newToken, 'ixiliu_token');

        if (success) {
            console.log(`🎉 Access-Token 已更新: ${newToken}`);
            $notification.post("✅ 令牌已更新", "ixiliu_token 发生变化", newToken);
        } else {
            console.log("⚠️ 写入 Access-Token 失败");
            $notification.post("❌ 写入失败", "无法保存新的 ixiliu_token", "");
        }
    }
} else {
    console.log("❌ 未找到 Access-Token");
    $notification.post("❌ 获取失败", "未能解析 Access-Token", "");
}

$done({});
