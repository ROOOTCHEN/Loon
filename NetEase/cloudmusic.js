#!name = 网易云音乐
#!desc = 音乐的力量不是用来看广告的。
#!author = Keywos[https://github.com/Keywos], RuCu6[https://github.com/RuCu6]
#!icon = https://raw.githubusercontent.com/ROOOTCHEN/Loon/main/Icons/app/cloudmusic.png
#!tag = 会员
#!date = 2025-03-21 21:30
#!input = Music163_Cookie
#!input = Music163_MConfigInfo
#!input = Music163_UserAgent
[Argument]
Music163_VIP_Shared = switch, true, false, tag=网易云音乐共享会员, desc=会员共享开关


[Rewrite]
# 新版加密通用
^https?:\/\/interface\d?\.music\.163\.com\/e?api\/(?:batch|v2\/resource\/comment\/floor\/get|homepage\/block\/page|link\/home\/framework\/tab|link\/page\/rcmd\/block\/resource\/multi\/refresh|link\/page\/rcmd\/resource\/show|user\/follow\/users\/mixed\/get) header-replace x-aeapi false

[Script]
# 会员解锁
# 播放会员歌曲
http-request ^https?:\/\/interface\d?\.music\.163\.com\/eapi\/(?:v1\/artist\/top\/song|v3\/discovery\/recommend\/songs) script-path = https://raw.githubusercontent.com/ROOOTCHEN/Loon/refs/heads/main/NetEase/CloudMusic.plugin, requires-body = false, binary-body-mode = false, timeout = 20, tag = 播放会员歌曲, enable={Music163_VIP_Shared}
http-request ^https?:\/\/interface\d?\.music\.163\.com\/eapi\/v3\/song\/detail script-path = https://raw.githubusercontent.com/ROOOTCHEN/Loon/refs/heads/main/NetEase/CloudMusic.plugin, requires-body = false, binary-body-mode = false, timeout = 20, tag = 播放会员歌曲, enable={Music163_VIP_Shared}
http-request ^https?:\/\/interface\d?\.music\.163\.com\/eapi\/song\/(?:chorus|enhance\/|play\/|type\/detail\/get) script-path = https://raw.githubusercontent.com/ROOOTCHEN/Loon/refs/heads/main/NetEase/CloudMusic.plugin, requires-body = false, binary-body-mode = false, timeout = 20, tag = 播放会员歌曲, enable={Music163_VIP_Shared}

# 播放器会员皮肤
http-request ^https?:\/\/interface\d?\.music\.163\.com\/eapi\/playermode\/ script-path = https://raw.githubusercontent.com/ROOOTCHEN/Loon/refs/heads/main/NetEase/CloudMusic.plugin, requires-body = false, binary-body-mode = false, timeout = 20, tag = 播放器会员皮肤, enable={Music163_VIP_Shared}

# 搜索结果会员歌曲
http-request ^https?:\/\/interface\d?\.music\.163\.com\/eapi\/search\/(?:complex\/page|complex\/rec\/song\/get|song\/list\/page) script-path = https://raw.githubusercontent.com/ROOOTCHEN/Loon/refs/heads/main/NetEase/CloudMusic.plugin, requires-body = false, binary-body-mode = false, timeout = 20, tag = 搜索结果会员歌曲, enable={Music163_VIP_Shared}

# 侧边栏会员等级
http-request ^https?:\/\/interface\d?\.music\.163\.com\/eapi\/vipnewcenter\/app\/resource\/newaccountpage script-path = https://raw.githubusercontent.com/ROOOTCHEN/Loon/refs/heads/main/NetEase/CloudMusic.plugin, requires-body = false, binary-body-mode = false, timeout = 20, tag = 侧边栏会员等级, enable={Music163_VIP_Shared}

# 歌单列表会员认证
http-request ^https?:\/\/interface\d?\.music\.163\.com\/w?e?api\/(homepage\/|v6\/)?playlist\/(?!(?:delete|subscribe|unsubscribe)) script-path = https://raw.githubusercontent.com/ROOOTCHEN/Loon/refs/heads/main/NetEase/CloudMusic.plugin, requires-body = false, binary-body-mode = false, timeout = 20, tag = 播放列表会员认证, enable={Music163_VIP_Shared}

# 会员认证
http-request ^https?:\/\/interface\d?\.music\.163\.com\/eapi\/vipauth\/app\/auth\/(soundquality\/)?query script-path = https://raw.githubusercontent.com/ROOOTCHEN/Loon/refs/heads/main/NetEase/CloudMusic.plugin, requires-body = false, binary-body-mode = false, timeout = 20, tag = 会员认证, enable={Music163_VIP_Shared}

[MITM]
hostname = interface*.music.163.com