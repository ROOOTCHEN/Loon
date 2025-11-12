const DEVICE_MAP = {
	// === 设备映射表 (仅 show 和 model) ===
	"iPad Pro": { model: "iPad16,6", show: "iPad Pro" },
	"iPhone 15": { model: "iPhone15,4", show: "iPhone 15" },
	"iPhone 15 Plus": { model: "iPhone15,5", show: "iPhone 15 Plus" },
	"iPhone 15 Pro": { model: "iPhone16,1", show: "iPhone 15 Pro" },
	"iPhone 15 Pro Max": { model: "iPhone16,2", show: "iPhone 15 Pro Max" },
	"iPhone 16": { model: "iPhone17,3", show: "iPhone 16" },
	"iPhone 16 Plus": { model: "iPhone17,4", show: "iPhone 16 Plus" },
	"iPhone 16e": { model: "iPhone17,5", show: "iPhone 16e" },
	"iPhone 16 Pro": { model: "iPhone17,1", show: "iPhone 16 Pro" },
	"iPhone 16 Pro Max": { model: "iPhone17,2", show: "iPhone 16 Pro Max" },
	"iPhone 17": { model: "iPhone18,3", show: "iPhone 17" },
	"iPhone 17 Pro": { model: "iPhone18,1", show: "iPhone 17 Pro" },
	"iPhone 17 Pro Max": { model: "iPhone18,2", show: "iPhone 17 Pro Max" },
	"iPhone Air": { model: "iPhone18,4", show: "iPhone Air" }
};

console.log("--- 🚀 [QQ在线状态] 脚本开始执行 🚀 ---");

// 预处理配置和请求
const selectedName = $persistentStore.read("iPhone机型选择"); 
// 移除：const noticeEnabled = $persistentStore.read("Notice") === "true"; 
const isRecovery = !selectedName || selectedName === "不显示";
const newInfo = DEVICE_MAP[selectedName]; 
let body = $request.body;

if (!isRecovery && !newInfo) {
	console.error(`❌ 错误：配置项 [${selectedName}] 未知且非恢复模式，终止脚本。`);
	$done({});
	return;
}

try {
	let data = JSON.parse(body);
	let args = data.args && data.args[0];

	if (!args) {
		console.error("❌ 错误：请求 JSON 结构不符合预期，终止替换。");
		$done({});
		return;
	}

	// 记录原始值
	const oldModel = args.sModel;
	const oldShow = args.sModelShow;
	const operation = isRecovery ? "恢复默认状态" : selectedName; // 确定最终操作名称

	console.log(`📱 目标操作: ${operation}`);
	console.log(`⚙️ 当前设备: ${oldShow || oldModel}`);
	console.log("--------------------------------------");

	// ===============================================
	// ⭐ 核心逻辑: 恢复模式或自定义模式 ⭐
	// ===============================================
    if (isRecovery) {
        // --- 恢复默认状态逻辑 ---
        args.bRecoverDefault = true; 
        
        console.log("✅ 状态恢复: 设置 bRecoverDefault: true。");
        
    } else {
        // --- 自定义状态逻辑 ---
        
        args.bShowInfo = true; 

        // 1. 核心替换 sModel 和 sModelShow (2处)
        args.sModel = newInfo.model;
        args.sModelShow = newInfo.show;

        console.log(`✅ [sModel] 替换: ${oldModel} -> ${args.sModel}`);
        console.log(`✅ [sModelShow] 替换: ${oldShow} -> ${args.sModelShow}`);
    }

	// 结束处理
	$done({
		body: JSON.stringify(data)
	});
	console.log("\n✨ 脚本执行完毕，请求体已成功修改！✨");

} catch (e) {
	console.error(`❌ 致命错误：脚本执行异常: ${e.toString()}`);
	// 移除失败时的通知逻辑
	$done({});
}
