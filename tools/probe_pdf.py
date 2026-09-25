# -*- coding: utf-8 -*-
"""探查三份『黄金考点汇编』PDF 的文本形态，为后续结构化解析做准备。"""
import sys, io, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
import pdfplumber

BASE = r"C:\Users\PC\Documents\xwechat_files\wxid_8nztxiuayz4d22_5de2\msg\file\2026-09"
FILES = [
    "成考专升本英语-黄金考点汇编.pdf",
    "成考专升本政治-黄金考点汇编.pdf",
    "成考专升本高等数学（二）-黄金考点汇编.pdf",
]

for fn in FILES:
    path = os.path.join(BASE, fn)
    print("=" * 70)
    print("FILE:", fn)
    if not os.path.exists(path):
        print("  !! 不存在")
        continue
    with pdfplumber.open(path) as pdf:
        print("  页数:", len(pdf.pages))
        # 前 3 页样本
        for i, pg in enumerate(pdf.pages[:3]):
            txt = pg.extract_text() or ""
            print(f"  ---- page {i+1} (chars={len(txt)}) ----")
            print("\n".join("    " + ln for ln in txt.split("\n")[:25]))
