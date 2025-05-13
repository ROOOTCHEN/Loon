// 招商银行资产信息修改脚本 By ROOOTCHEN
// 使用 Loon 的 $argument 正确方式进行参数注入

const url = $request.url;
let body = $response.body;

// 🧪调试日志：打印参数对象
console.log("传入参数：", JSON.stringify($argument));

// 参数安全读取（官方推荐用法）
const modifiedBalance = $argument["cmb_modified_balance"] || null;
const modifiedIncome = $argument["cmb_modified_income"] || null;
const modifiedExpense = $argument["cmb_modified_expense"] || null;

try {
    const data = JSON.parse(body);

    // 👀 处理总资产接口
    if (url.includes("/my-channel-total-asset/query")) {
        if (data?.bizResult?.data) {
            if (modifiedBalance !== null) {
                data.bizResult.data.totalAsset = modifiedBalance;
                data.bizResult.data.currentSumAsset = modifiedBalance;
                console.log(`[资产] 已注入余额：${modifiedBalance}`);
            } else {
                console.log("[资产] 未注入余额参数");
            }
        }
    }

    // 👀 处理收支明细接口
    else if (url.includes("/sz/query")) {
        if (data?.bizResult?.data) {
            if (modifiedIncome !== null) {
                data.bizResult.data.totalIn = Number(modifiedIncome);
                console.log(`[收支] 已注入收入：${modifiedIncome}`);
            } else {
                console.log("[收支] 未注入收入参数");
            }

            if (modifiedExpense !== null) {
                data.bizResult.data.totalOut = Number(modifiedExpense);
                console.log(`[收支] 已注入支出：${modifiedExpense}`);
            } else {
                console.log("[收支] 未注入支出参数");
            }
        }
    }

    body = JSON.stringify(data);
} catch (e) {
    console.log(`❌ 招商银行数据修改失败：${e}`);
    // 出错时保持原始内容返回
}

$done({ body });
