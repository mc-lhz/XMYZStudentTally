"""在入口 bundle 里定位 axios 实例、鉴权头、登录表单字段等关键实现。"""
import re
import sys

src = open(sys.argv[1], encoding="utf-8", errors="replace").read()


def show(pattern, label, width=260, limit=12):
    print(f"\n===== {label} =====")
    for m in list(re.finditer(pattern, src))[:limit]:
        start = max(0, m.start() - width // 2)
        end = min(len(src), m.end() + width // 2)
        print("…" + src[start:end].replace("\n", " ") + "…")


show(r'https://api\.xmyzstudent\.com/api/v2', "axios baseURL 上下文", 200, 4)
show(r'Authorization', "Authorization 头", 200, 6)
show(r'localStorage\.(getItem|setItem)\(["\']token', "token 存储", 160, 6)
show(r'/auth/login', "登录接口调用", 220, 6)
show(r'openLoginModal', "登录弹窗触发", 120, 4)
show(r'username', "username 字段", 200, 6)
show(r'v-model[^,]{0,40}(password|username|account)', "登录表单字段绑定", 200, 8)
show(r'captcha', "验证码", 160, 6)
