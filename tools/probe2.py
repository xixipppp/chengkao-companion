# -*- coding: utf-8 -*-
"""摸清三份考点汇编的『考点 / 章节』标题骨架，评估结构化解析可行性。"""
import sys, io, os, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
import pdfplumber

BASE = r"C:\Users\PC\Documents\xwechat_files\wxid_8nztxiuayz4d22_5de2\msg\file\2026-09"
FILES = [
    ("eng", "成考专升本英语-黄金考点汇编.pdf"),
    ("pol", "成考专升本政治-黄金考点汇编.pdf"),
    ("mat", "成考专升本高等数学（二）-黄金考点汇编.pdf"),
]

for tag, fn in FILES:
    path = os.path.join(BASE, fn)
    print("=" * 72)
    print(f"[{tag}] {fn}")
    with pdfplumber.open(path) as pdf:
        lines_all = []
        for pg in pdf.pages:
            t = pg.extract_text() or ""
            for ln in t.split("\n"):
                ln = ln.strip()
                if ln:
                    lines_all.append(ln)
        # 页眉噪声
        HEAD = re.compile(r'^黄金考点汇编\s*2026年成考专升本')
        heads = [l for l in lines_all if re.search(r'考点\s*\d+\s*[.：:]', l)]
        chaps = [l for l in lines_all if re.match(r'^第[一二三四五六七八九十]+[部分章节]', l)]
        print(f"  总行数={len(lines_all)}  考点命中={len(heads)}  章节命中={len(chaps)}")
        print("  --- 考点标题（前 40）---")
        for h in heads[:40]:
            print("   ", h[:60])
        print("  --- 章节标题 ---")
        for c in chaps[:25]:
            print("   ", c[:60])
