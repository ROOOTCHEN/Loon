const url = $request.url;
const header = $request.headers;
const isDurex = url.includes("/mp") && url.includes("vip.ixiliu.cn/");

if (isDurex) {
	if (
		$persistentStore.read("Durex_Token") === undefined ||
		$persistentStore.read("Durex_Token") === null
	) {
		$notification.post("杜杜遇到问题", "参数缺失", "请在插件内填入会话数据");
		$done({});
	} else {
		header["Access-Token"] = $persistentStore.read("Durex_Token");
	}

	$done({
		headers: header
	});
} else {
	$done({});
}
