if ($request && $request.url) {
    const url = $request.url;

    // 处理 Access-Token 只针对 /mp/user/info
    if (url.includes("/mp/user/info")) {
        const accessToken = $request.headers['Access-Token'];
        if (accessToken) {
            $notification.post(
                "获取 Access-Token",
                `Access-Token: ${accessToken}`,
                "点击复制到剪贴板",
                { "clipboard": accessToken }
            );
        }
    }

    // 处理 SNID 只针对 /mp/activity.lottery/getUserInfoV2
    else if (url.includes("/mp/activity.lottery.getUserInfoV2")) {
        let snIdMatch = url.match(/[?&]snId=(\d+)/);
        if (snIdMatch) {
            let snId = snIdMatch[1];
            $notification.post(
                "检测到活动 SNID",
                `SNID: ${snId}`,
                "点击复制到剪贴板",
                { "clipboard": snId }
            );
        }
    }
}

$done({});
