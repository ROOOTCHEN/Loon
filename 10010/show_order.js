(function() {
    let body = $response.body;
    try {
        let jsonData = JSON.parse(body);

        // 递归遍历 JSON 数据，将 "已包含" 替换为空
        function modifyDingDesc(obj) {
            if (obj && typeof obj === 'object') {
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (key === 'ding_desc' && obj[key] === "已包含") {
                            obj[key] = ""; // 替换为空
                        } else if (typeof obj[key] === 'object') {
                            modifyDingDesc(obj[key]); // 递归处理嵌套对象
                        }
                    }
                }
            }
        }

        // 从根开始遍历
        modifyDingDesc(jsonData);

        // 返回修改后的响应体
        $done({ body: JSON.stringify(jsonData) });
    } catch (e) {
        console.log("脚本执行出错: " + e);
        $done({});
    }
})();
