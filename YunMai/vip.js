// 好轻会员解锁脚本
// 功能：修改会员状态和有效期

(function() {
    'use strict';
    
    const url = $request.url;
    let body = $response.body;
    
    if (!body) {
        console.log("[$response.body] 为空，跳过处理");
        $done({});
        return;
    }
    
    try {
        let obj = JSON.parse(body);
        
        /* 处理 myAllFellow.json 接口 */
        if (url.includes('/fellow/myAllFellow.json')) {
            if (obj.data?.haoqingPlus) {
                // 强制开启自动续费
                obj.data.haoqingPlus.autoRenewStatus = 2; // 2表示已开启
                // 设置VIP长期有效 (2033-11-20)
                obj.data.haoqingPlus.endTime = 2014646400;
                // 确保卡类型为高级会员
                obj.data.haoqingPlus.cardType = 3;
                console.log("已修改 myAllFellow 会员数据");
            }
        } 
        /* 处理 getWaitReceiveFreeDays.json 接口 */
        else if (url.includes('/order/getWaitReceiveFreeDays.json')) {
            if (obj.data) {
                // 修改剩余天数为最大值
                if (typeof obj.data.freeDays !== 'undefined') {
                    obj.data.freeDays = 0;
                }
                // 设置VIP长期有效 (2033-11-20)
                if (typeof obj.data.fellowEndTime !== 'undefined') {
                    obj.data.fellowEndTime = 2014646400;
                }
                console.log("已修改 getWaitReceiveFreeDays 数据");
            }
        }
        
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        console.log(`脚本执行出错: ${e.message}`);
        $done({});
    }
})();
