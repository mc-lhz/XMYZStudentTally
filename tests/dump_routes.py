"""打印实际注册的路由表，用于核对接口是否真的挂上。"""
import os
import sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.join(HERE, ".pylibs"))

import main as app_module  # noqa: E402

app = app_module.build_app(os.path.join(HERE, "tally.json"))
print("=" * 72)
for rule in sorted(app.url_map.iter_rules(), key=lambda r: str(r)):
    print(f"{str(rule):<58} {sorted(rule.methods - {'HEAD', 'OPTIONS'})}")
print("=" * 72)
print("路由总数：", len(list(app.url_map.iter_rules())))
