// VIP 状态的 JSON 对象 (使用您提供的新结构)
const VIP_STATUS_BODY = {
    "result": {
        "products": [{
            "managed": false,
            "status": "ACTIVE",
            "startDate": 2871663447000,
            "productId": "com.photovision.camera.subscribe.plan.oneyear",
            "isTrialPeriod": true,
            "expireDate": 1763151447000
        }],
        "activated": true
    }
};

// 确保在 $request.url.includes("v1/purchase/subscription/subscriber/status") 时执行
if ($request.url.includes("v1/purchase/subscription/subscriber/status")) {
    // 直接返回伪造的 VIP 状态 JSON 字符串
    $done({
        body: JSON.stringify(VIP_STATUS_BODY)
    });
} else {
    // 如果不是匹配的 URL，则直接放行，返回原始响应
    $done({}); 
}
