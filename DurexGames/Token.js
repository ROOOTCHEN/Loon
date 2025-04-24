// Loon script-response-body

let body = $response.body;
let obj = JSON.parse(body);

if (obj?.data?.['Access-Token']) {
    let token = obj.data['Access-Token'];
    $persistentStore.write(token, 'ixiliu_token');
    console.log(`🎉 成功获取 Access-Token: ${token}`);
} else {
    console.log('❌ 未找到 Access-Token');
}

$done({});
