const isNoticeEnabled = $argument.Notice === true || $argument.Notice === "true";
const selectedName = $persistentStore.read("iPhone机型选择");

let finalModelName;
if (!selectedName || selectedName === "不显示") {
	finalModelName = "恢复默认状态";
} else {
	finalModelName = selectedName;
}

// --- 4. 发送通知 ---
$notification.post(
	"QQ在线设备修改成功",
	`设备已更新`,
	`当前设备: ${finalModelName}`
);
// 结束脚本 (通常用于仅通知的脚本)
$done({});
