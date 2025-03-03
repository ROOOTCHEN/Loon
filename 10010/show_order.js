(function() {
    let body = $response.body;
    try {
        let jsonData = JSON.parse(body);

        // 遍历 JSON 数据，将 "已包含" 替换为空
        if (jsonData.data && Array.isArray(jsonData.data)) {
            jsonData.data.forEach(service => {
                if (service.list && Array.isArray(service.list)) {
                    service.list.forEach(item => {
                        if (item.ding_desc === "已包含") {
                            item.ding_desc = ""; // 替换为空
                        }
                    });
                }
            });
        }

        $done({ body: JSON.stringify(jsonData) });
    } catch (e) {
        console.log("脚本执行出错: " + e);
        $done({});
    }
})();