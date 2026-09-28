"""
Edge TTS 桥接服务 —— 给「成考随身学」App 的「云端朗读兜底」用。

为什么需要它：
  部分手机浏览器（尤其微信/X5 WebView）没有系统朗读(speechSynthesis)，
  App 会 fallback 到「云端 TTS」。把本服务部署后拿到一个网址，
  在 App「我的 → 🔊 语音与音效 → 云端朗读」里粘贴即可，所有题目都能真出声。

支持的调用方式（与 App 的 cloudSpeak 契约完全对齐）：
  1) GET  https://<你的域名>/tts?text={text}&lang={lang}
        —— 地址里含 {text} 时 App 走 GET，最简单，推荐。
  2) POST https://<你的域名>/tts   body: {"text":"...","lang":"zh-CN"}
        —— 返回音频二进制；若想返回 JSON 也可改成 {audio:base64,mime}。

音色映射：en-US->Aria, en-GB->Sonia, zh-CN->Xiaoxiao, zh-TW->HsiaoChen。
底层用 edge-tts（微软免费在线语音，无需任何 API Key）。
"""
import os
import edge_tts
from fastapi import FastAPI, Query, Request
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Edge TTS Bridge")

# 关键：App 在 chengkao.xixipp.cloud 跨域请求，必须放行 CORS，否则浏览器直接拦掉。
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# 语种 -> Edge 神经音色
VOICES = {
    "en": "en-US-AriaNeural",
    "en-US": "en-US-AriaNeural",
    "en-GB": "en-GB-SoniaNeural",
    "zh": "zh-CN-XiaoxiaoNeural",
    "zh-CN": "zh-CN-XiaoxiaoNeural",
    "zh-TW": "zh-TW-HsiaoChenNeural",
}


def voice_for(lang: str) -> str:
    lang = (lang or "zh-CN")
    return VOICES.get(lang) or VOICES.get(lang.split("-")[0].lower()) or "zh-CN-XiaoxiaoNeural"


async def synth(text: str, lang: str) -> bytes:
    """调用 edge-tts 合成音频，返回 mp3 字节。"""
    voice = voice_for(lang)
    comm = edge_tts.Communicate(text, voice)
    buf = bytearray()
    async for chunk in comm.stream():
        if chunk.get("type") == "audio":
            buf.extend(chunk["data"])
    return bytes(buf)


@app.get("/tts")
async def tts_get(text: str = Query(..., description="要朗读的文本"),
                  lang: str = Query("zh-CN")):
    audio = await synth(text, lang)
    return Response(content=audio, media_type="audio/mpeg",
                    headers={"Cache-Control": "no-store"})


@app.post("/tts")
async def tts_post(request: Request):
    body = await request.json()
    text = body.get("text", "")
    lang = body.get("lang", "zh-CN")
    audio = await synth(text, lang)
    # App 的 cloudSpeak 对非 JSON 响应直接 blob() 播放，这里返回二进制即可。
    return Response(content=audio, media_type="audio/mpeg")


@app.get("/healthz")
async def health():
    return {"ok": True}


@app.get("/")
async def index():
    return Response(
        content=(
            "<h2>Edge TTS Bridge 运行中 ✅</h2>"
            "<p>把下面这个地址（把 HOST 换成你的实际域名）粘贴进 App 的「云端朗读」即可：</p>"
            "<pre style='background:#f3f3f3;padding:10px'>https://&lt;你的域名&gt;/tts?text={text}&amp;lang={lang}</pre>"
            "<p>本地试听： <a href='/tts?text=hello%20world&lang=en-US'>/tts?text=hello world&lang=en-US</a></p>"
        ),
        media_type="text/html",
    )


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
