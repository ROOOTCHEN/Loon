// Loon script-response-body

let body = $response.body;
let obj = JSON.parse(body);

if (obj?.data?.['Access-Token']) {
    let token = obj.data['Access-Token'];
    let success = $persistentStore.write(token, 'ixiliu_token');

    if (success) {
        console.log(`🎉 成功获取 Access-Token: ${token}`);
        $notification.post("✅ 令牌获取成功", "ixiliu_token 已更新", token);
    } else {
        console.log("⚠️ 写入 Access-Token 失败");
        $notification.post("❌ 写入失败", "无法保存 ixiliu_token", "");
    }
} else {
    console.log("❌ 未找到 Access-Token");
    $notification.post("❌ 获取失败", "未能解析 Access-Token", "");
}

$done({});
