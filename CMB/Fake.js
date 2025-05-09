const url = $request.url;
let body = $response.body;

// 从持久化存储中读取要修改的值
const modifiedBalance = $persistentStore.read("cmb_modified_balance"); // 修改后的余额值（同时用于totalAsset和currentSumAsset）
const modifiedIncome = $persistentStore.read("cmb_modified_income");   // 修改后的收入值
const modifiedExpense = $persistentStore.read("cmb_modified_expense"); // 修改后的支出值

try {
    const data = JSON.parse(body);
    
    // 处理资产总览接口
    if (url.includes("/my-channel-total-asset/query")) {
        if (data?.bizResult?.data) {
            if (modifiedBalance) {
                // 同时修改totalAsset和currentSumAsset
                data.bizResult.data.totalAsset = modifiedBalance;
                data.bizResult.data.currentSumAsset = modifiedBalance;
                
                // 调试日志
                console.log(`已修改余额为: ${modifiedBalance}`);
            }
        }
    }
    
    // 处理收支明细接口
    if (url.includes("/sz/query")) {
        if (data?.bizResult?.data) {
            if (modifiedIncome) {
                data.bizResult.data.totalIn = Number(modifiedIncome);
                console.log(`已修改收入为: ${modifiedIncome}`);
            }
            if (modifiedExpense) {
                data.bizResult.data.totalOut = Number(modifiedExpense);
                console.log(`已修改支出为: ${modifiedExpense}`);
            }
        }
    }
    
    body = JSON.stringify(data);
} catch (e) {
    console.log(`招商银行数据修改失败: ${e}`);
    // 出错时保持原样
}

$done({body});
