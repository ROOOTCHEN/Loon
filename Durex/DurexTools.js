const url = $request.url;
const headers = $request.headers;

console.log("---------- [Ixiliu 监控触发] ----------");
console.log(`[URL]: ${url}`);

// 1. 提取当前数据
const snIdReg = /snId=([^&]+)/;
const snIdMatch = url.match(snIdReg);
const currentSnId = snIdMatch ? snIdMatch[1] : null;
const currentToken = headers['Access-Token'] || headers['access-token'];

// 2. 读取本地旧数据
let oldSnId = $persistentStore.read("ixiliu_snid");
let oldToken = $persistentStore.read("ixiliu_token");

let isChanged = false;
let notifyContent = [];
let copyText = "";

// 3. 处理 Access-Token 逻辑
if (currentToken) {
    console.log(`[获取 Token]: ${currentToken}`);
    if (currentToken !== oldToken) {
        console.log(`[Token 变化]: 旧=${oldToken} -> 新=${currentToken}`);
        $persistentStore.write(currentToken, "ixiliu_token");
        isChanged = true;
        notifyContent.push("✅ Access-Token 已更新");
        copyText = currentToken;
    } else {
        console.log("[Token 无变化]: 与本地记录一致");
    }
}

// 4. 处理 SNID 逻辑
if (currentSnId) {
    console.log(`[获取 SNID]: ${currentSnId}`);
    if (currentSnId !== oldSnId) {
        console.log(`[SNID 变化]: 旧=${oldSnId} -> 新=${currentSnId}`);
        $persistentStore.write(currentSnId, "ixiliu_snid");
        isChanged = true;
        notifyContent.push("✅ SNID 已更新");
        // 如果没有 Token 更新，则默认复制 SNID
        if (!copyText) copyText = currentSnId;
    } else {
        console.log("[SNID 无变化]: 与本地记录一致");
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
