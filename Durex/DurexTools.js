if ($request && $request.headers) {
    const accessToken = $request.headers['Access-Token'];
    if (accessToken) {
        $notification.post("获取 Access-Token", `Access-Token: ${accessToken}`, "点击复制到剪贴板", {
            "clipboard": accessToken
        });
    }
}

if ($request && $request.method !== 'OPTIONS') {
    let url = $request.url;
    let snIdMatch = url.match(/[?&]snId=(\d+)/);
    if (snIdMatch) {
        let snId = snIdMatch[1];
        $notification.post("检测到活动 SNID", `SNID: ${snId}`, "点击复制到剪贴板", {
            "clipboard": snId
        });
    }
}

$done({});
