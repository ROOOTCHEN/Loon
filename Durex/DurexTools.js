const url = $request.url;
const headers = $request.headers;

console.log("---------- [Ixiliu 监控触发] ----------");
console.log(`[URL]: ${url}`);

let isChanged = false;
let notifyContent = [];
let copyText = "";

// --- 逻辑 A: 处理 openId (来自响应体) ---
if (url.includes("/api/auth/loginByWeChat") && typeof $response !== 'undefined') {
    try {
        const obj = JSON.parse($response.body);
        if (obj && obj.openId) {
            const currentOpenId = obj.openId;
            let oldOpenId = $persistentStore.read("ixiliu_openid");
            
            console.log(`[获取 OpenID]: ${currentOpenId}`);
            
            if (currentOpenId !== oldOpenId) {
                $persistentStore.write(currentOpenId, "ixiliu_openid");
                isChanged = true;
                notifyContent.push("✅ OpenID 已更新并复制");
                copyText = currentOpenId;
            } else {
                console.log("[OpenID 无变化]: 与本地记录一致");
            }
        }
    } catch (e) {
        console.log("[错误]: 解析 OpenID 响应体失败 - " + e);
    }
}

// --- 逻辑 B: 处理 Access-Token (来自请求头) ---
const currentToken = headers['Access-Token'] || headers['access-token'];
if (currentToken) {
    let oldToken = $persistentStore.read("ixiliu_token");
    console.log(`[获取 Token]: ${currentToken}`);
    if (currentToken !== oldToken) {
        $persistentStore.write(currentToken, "ixiliu_token");
        isChanged = true;
        notifyContent.push("✅ Access-Token 已更新");
        if (!copyText) copyText = currentToken;
    }
}

// --- 逻辑 C: 处理 SNID (来自 URL) ---
const snIdReg = /snId=([^&]+)/;
const snIdMatch = url.match(snIdReg);
const currentSnId = snIdMatch ? snIdMatch[1] : null;
if (currentSnId) {
    let oldSnId = $persistentStore.read("ixiliu_snid");
    console.log(`[获取 SNID]: ${currentSnId}`);
    if (currentSnId !== oldSnId) {
        $persistentStore.write(currentSnId, "ixiliu_snid");
        isChanged = true;
        notifyContent.push("✅ SNID 已更新");
        if (!copyText) copyText = currentSnId;
    }
}

// 5. 结果反馈
if (isChanged) {
    console.log("[通知]: 检测到数据更新，发送系统通知");
    const attach = {
        "clipboard": copyText,
        "openUrl": "loon://"
    };
    $notification.post("Ixiliu 数据更新", "点击通知复制更新值", notifyContent.join("\n"), attach);
} else {
    console.log("[静默]: 未检测到数据变化，不发送通知");
}

console.log("---------- [Ixiliu 监控结束] ----------");
$done({});
