/**
 * Loon 脚本：提取并比对 Authorization
 */

const authKey = "ZZR_Token"; // 存储在本地的 Key 名称
const currentAuth = $request.headers['Authorization'] || $request.headers['authorization'];

if (currentAuth) {
    // 1. 从持久化存储中读取旧值
    const oldAuth = $persistentStore.read(authKey);

    if (currentAuth !== oldAuth) {
        // 2. 如果新旧值不同，更新存储并发送推送
        const saveSuccess = $persistentStore.write(currentAuth, authKey);
        
        if (saveSuccess) {
            $notification.post("Token 已更新", "Jerusalem API", "检测到新的 Authorization，已存入本地。");
            console.log("新 Token 已持久化: " + currentAuth);
        } else {
            $notification.post("存储失败", "Jerusalem API", "无法写入持久化存储，请检查 Loon 权限。");
        }
    } else {
        // 3. 值相同，仅记录日志，不推送
        console.log("Token 未变化，跳过推送。");
    }
} else {
    console.log("未在请求头中发现 Authorization。");
}

$done({});
