(function() {
	// 🔧 读取插件参数
	let modifiedBalance = $argument.cmb_modified_balance;
	let modifiedExpense = $argument.cmb_modified_expense;
	let modifiedIncome = $argument.cmb_modified_income;

	// 🌐 获取请求 URL 和响应体
	let url = $request.url;
	let body = $response.body;

	// 📋 打印基础参数信息
	console.log(`📥 [CMB插件] 请求地址: ${url}`);
	console.log(`🧾 [CMB插件] 参数值 => 💰余额: ${modifiedBalance} | 📈收入: ${modifiedIncome} | 📉支出: ${modifiedExpense}`);

	try {
		// 📦 尝试将响应体解析为对象
		let obj = JSON.parse(body);
		console.log("✅ [CMB插件] 响应体成功解析为 JSON 对象");

		// 💼 判断是否为“资产总览”接口
		if (url.includes("my-channel-total-asset/query")) {
			console.log("🔍 [CMB插件] 命中接口: 📊 资产总览");

			if (obj.bizResult && obj.bizResult.data) {
				obj.bizResult.data.totalAsset = modifiedBalance;
				obj.bizResult.data.currentSumAsset = modifiedBalance;
				console.log(`✅ [CMB插件] 已修改 💰余额为: ${modifiedBalance}`);
			} else {
				console.log("⚠️ [CMB插件] ❌ 响应缺少 bizResult.data，余额未被修改");
			}
		}

		// 💰 判断是否为“收支明细”接口
		else if (url.includes("sz/query")) {
			console.log("🔍 [CMB插件] 命中接口: 📑 收支明细");

			if (obj.bizResult && obj.bizResult.data) {
				obj.bizResult.data.totalOut = parseFloat(modifiedExpense);
				obj.bizResult.data.totalIn = parseFloat(modifiedIncome);
				console.log(`✅ [CMB插件] 已修改 📈收入为: ${modifiedIncome}，📉支出为: ${modifiedExpense}`);
			} else {
				console.log("⚠️ [CMB插件] ❌ 响应缺少 bizResult.data，收支未被修改");
			}
		}

		// 🚀 输出修改后的 JSON 响应体
		$done({
			body: JSON.stringify(obj)
		});

	} catch (e) {
		// ❌ JSON 解析或处理异常，记录错误
		console.log(`💥 [CMB插件] ❌ 响应处理失败: ${e}`);
		$done({});
	}
})();
