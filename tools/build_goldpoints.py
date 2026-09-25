# -*- coding: utf-8 -*-
"""
把三份《2026 成考专升本 · 黄金考点汇编》PDF 解析为结构化考点数据。

输出：data/goldpoints.js  →  window.GOLD_POINTS = { pol:[...], mat:[...], eng:[...] }
每个考点：{ i, part, chap, t(标题), b(正文) }

注意：PDF 数学字体（Symbol/MT）在提取时会落到 Unicode 私用区，
     下面 SYM 表做常见还原，避免正文里出现   这类乱码。
"""
import sys, io, os, re, json, datetime
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
import pdfplumber

BASE = r"C:\Users\PC\Documents\xwechat_files\wxid_8nztxiuayz4d22_5de2\msg\file\2026-09"
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "goldpoints.js")

# ---- PDF 私用区数学符号还原表 ----
SYM = {
    '\uf03d': '=', '\uf00e': '∈', '\uf03f': '∉', '\uf0cc': '⊂', '\uf0ae': '→',
    '\uf0a5': '∞', '\uf0a3': '≤', '\uf0b3': '≥', '\uf0b9': '≠', '\uf0b1': '±',
    '\uf0b4': '×', '\uf0b7': '÷', '\uf0f2': '∫', '\uf0b6': '∂', '\uf0ec': '{',
    '\uf0ed': '{', '\uf0ee': '}', '\uf0ef': '|', '\uf0f0': '}', '\uf070': 'π',
    '\uf061': 'α', '\uf062': 'β', '\uf067': 'γ', '\uf064': 'δ', '\uf065': 'ε',
    '\uf071': 'θ', '\uf06c': 'λ', '\uf06d': 'μ', '\uf073': 'σ', '\uf077': 'ω',
    '\uf072': 'ρ', '\uf074': 'τ', '\uf066': 'φ', '\uf066': 'φ', '\uf02d': '−',
    '\uf02b': '+', '\uf0d7': '·', '\uf0a9': '⌈', '\uf0d1': '√', '\uf0e0': '∑',
    '\uf0e1': '∏', '\uf0df': '∆', '\uf0da': 'Ω', '\uf0d4': '≈', '\uf0cf': '∝',
}

def fix_sym(s):
    for k, v in SYM.items():
        s = s.replace(k, v)
    # 兜底：仍在私用区的字符直接丢弃
    return re.sub(r'[\ue000-\uf8ff]', '', s)

HEADER_RE = re.compile(r'^黄金考点汇编\s*2026年成考专升本')
# 章节：第一部分 / 第一章 / 一、xxx
PART_RE = re.compile(r'^第[一二三四五六七八九十]+部分\s*(.*)$')
CHAP_RE = re.compile(r'^第[一二三四五六七八九十]+章\s*(.*)$')
# 考点：政治「考点1.xxx」 高数「考点1：xxx」 英语「考点1xxx」/「考点1 xxx」
POINT_RE = re.compile(r'^考点\s*(\d+)\s*[.：:、]?\s*(.*)$')

def read_lines(path):
    with pdfplumber.open(path) as pdf:
        out = []
        for pg in pdf.pages:
            t = pg.extract_text() or ""
            for ln in t.split("\n"):
                ln = ln.strip()
                if not ln:
                    continue
                if HEADER_RE.match(ln):
                    continue
                out.append(fix_sym(ln))
        return out

def parse(path, subj):
    lines = read_lines(path)
    part, chap = "", ""
    pts, cur = [], None
    for ln in lines:
        m = POINT_RE.match(ln)
        if m:
            if cur:
                pts.append(cur)
            cur = {"i": int(m.group(1)), "part": part, "chap": chap,
                   "t": m.group(2).strip().rstrip('：:'), "b": []}
            continue
        if PART_RE.match(ln):
            if cur:
                pts.append(cur); cur = None
            part = ln
            chap = ""
            continue
        if CHAP_RE.match(ln):
            if cur:
                pts.append(cur); cur = None
            chap = ln
            continue
        if cur is not None:
            cur["b"].append(ln)
    if cur:
        pts.append(cur)
    for p in pts:
        p["b"] = "\n".join(p["b"]).strip()
    return pts

def main():
    jobs = [
        ("pol", "政治", "成考专升本政治-黄金考点汇编.pdf"),
        ("mat", "高等数学（二）", "成考专升本高等数学（二）-黄金考点汇编.pdf"),
        ("eng", "英语", "成考专升本英语-黄金考点汇编.pdf"),
    ]
    data, stat = {}, []
    for tag, name, fn in jobs:
        path = os.path.join(BASE, fn)
        if not os.path.exists(path):
            print("!! 缺失:", fn); continue
        pts = parse(path, tag)
        # 丢弃空正文考点
        pts = [p for p in pts if p["b"] or p["t"]]
        data[tag] = pts
        chars = sum(len(p["b"]) for p in pts)
        stat.append((name, len(pts), chars))
        print(f"[{tag}] {name}: {len(pts)} 个考点, 正文 {chars} 字")

    payload = {"ver": "2026", "built": datetime.date.today().isoformat(),
               "src": "黄金考点汇编", "data": data}
    js = ("/* 自动生成：2026 成考专升本《黄金考点汇编》结构化考点 —— 勿手改，改后重跑 tools/build_goldpoints.py */\n"
          "window.GOLD_POINTS = " + json.dumps(payload, ensure_ascii=False, separators=(',', ':')) + ";\n")
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(js)
    print("\n输出:", OUT, f"({os.path.getsize(OUT)/1024:.0f} KB)")
    print("汇总:", " | ".join(f"{n} {c}考点" for n, c, _ in stat))

if __name__ == "__main__":
    main()
