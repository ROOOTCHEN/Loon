/**
 * @fileoverview Durex 一体脚本：提取 Access-Token、SNID，同时支持重定向 GoodsID（根据 Durex_GoodsID 输入）
 * @author ROOOT
 */

if ($request && $request.url) {
    const url = $request.url;
    const headers = $request.headers;

    // ✅ Access-Token 提取（仅限 /mp/user/info）
    if (url.includes("/mp/user/info")) {
        const accessToken = headers["Access-Token"];
        if (accessToken) {
            $notification.post(
                "获取 Access-Token",
                `Access-Token: ${accessToken}`,
                "点击复制到剪贴板",
                { clipboard: accessToken }
            );
        }
    }

    // ✅ SNID 提取（仅限 /mp/activity.lottery/getUserInfoV2?snId=xxx）
    else if (url.includes("/mp/activity.lottery/getUserInfoV2")) {
        const snIdMatch = url.match(/[?&]snId=(\d+)/);
        if (snIdMatch) {
            const snId = snIdMatch[1];
            $notification.post(
                "检测到活动 SNID",
                `SNID: ${snId}`,
                "点击复制到剪贴板",
                { clipboard: snId }
            );
        }
    }

    // ✅ GoodsID 重定向（仅限 /mp/points.goods/detailMulSpec?goodsId=*）
    else if (url.includes("/mp/points.goods/detailMulSpec?goodsId=")) {
        const goodsIdCustom = $persistentStore.read("Durex_GoodsID") || "";
        if (goodsIdCustom) {
            const newUrl = url.replace(/goodsId=\d+/, `goodsId=${goodsIdCustom}`);
            if (newUrl !== url) {
                console.log(`已重定向商品ID → ${goodsIdCustom}`);
                $done({ url: newUrl });
                return;
            }
        }
    }
}

$done({});
