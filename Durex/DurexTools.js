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
				"点击复制到剪贴板", {
					clipboard: accessToken
				}
			);
		}
	}


	}

	// ✅ GoodsID 重定向（仅限 /mp/points.goods/detailMulSpec?goodsId=*）
	else if (url.includes("/mp/points.goods/detailMulSpec?goodsId=")) {
		const goodsIdCustom = $persistentStore.read("Durex_GoodsID") || "";
		if (goodsIdCustom) {
			const newUrl = url.replace(/goodsId=\d+/, `goodsId=${goodsIdCustom}`);
			if (newUrl !== url) {
				console.log(`已重定向商品ID → ${goodsIdCustom}`);
				$done({
					url: newUrl
				});
				return;
			}
		}
	}
}

$done({});
