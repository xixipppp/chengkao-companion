# Edge TTS 云端朗读服务（一键部署）

给「成考随身学」App 的「云端朗读兜底」用。基于微软 **edge-tts**（免费、无需密钥、和 Win/Edge 同款音色）。

> ⚠️ **大陆网络重要提示**：`huggingface.co` / `*.hf.space` 在**中国大陆被直接阻断**，手机连不上 → 不要用 HF Spaces。
> 下面首选 **Render / Fly.io**，这俩在大陆一般可直连（仅比国内慢），能正常出声。

## 一、本地先跑通（可选，验证用）

```bash
cd tts-server
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python tts_server.py
# 浏览器打开 http://localhost:8000/tts?text=hello&lang=en-US 应能听到英文
```

## 二、部署（任选其一，拿到网址后粘贴进 App）

### 方案 A（推荐·大陆可直连）：Render
免费、Web 界面连仓库即部署、无需本地工具。
1. 把本目录推到你的 **GitHub 公开仓库**（4 个文件：tts_server.py / requirements.txt / Dockerfile / README.md）。
2. 打开 render.com → **New → Web Service** → 连该仓库。
3. Render 会自动识别 `Dockerfile`；若用 Buildpack：Build `pip install -r requirements.txt`，Start `uvicorn tts_server:app --host 0.0.0.0 --port $PORT`。
4. 部署完得到 `https://xxx.onrender.com`，App 里粘贴：
   ```
   https://xxx.onrender.com/tts?text={text}&lang={lang}
   ```
- 免费版 15 分钟无访问会休眠，首次唤醒约 30~60 秒（之后正常）；介意可升 $7/月常驻。

### 方案 B（更低延迟·大陆更近）：Fly.io（香港 / 新加坡节点）
离大陆近、延迟明显低于美国 Render。
1. 安装 `flyctl` 并登录（`fly auth signup`）。
2. 在本目录执行 `fly launch`（选 region `hkg` 或 `sin`，不立即部署先 `fly deploy`）。
3. 部署完得到 `https://<app>.fly.dev`，App 粘贴：
   ```
   https://<app>.fly.dev/tts?text={text}&lang={lang}
   ```
- 需绑定支付方式（有免费额度）；免费应用长时间无流量会停，访问时自动起。

### 方案 C（最佳·同域名零跨域）：你自己的服务器 / 国内主机
如果你有服务器（阿里云/腾讯云等国内主机），把服务跑起来并用 **`tts.你的域名`** 反代 HTTPS：
- 放在和 App 同一个域名下（如 `tts.xixipp.cloud`）→ **同源、无需 CORS、国内最快最稳**，是终极方案。
```bash
pip install -r requirements.txt
uvicorn tts_server:app --host 0.0.0.0 --port 8000
# nginx 反代到 https://tts.你的域名 ，App 粘贴：https://tts.你的域名/tts?text={text}&lang={lang}
```

### 方案 D（仅海外/特殊网络可用）：Hugging Face Spaces
⚠️ **大陆直连被阻断，手机用不了**，仅当你在境外网络时才考虑。
- 新建 Space → SDK 选 **Docker** → 传这 4 个文件 → 得 `https://<用户名>-<空间名>.hf.space`。

## 三、在 App 里启用
1. 打开「成考随身学」→「我的」→ 🔊 **语音与音效** → 点「☁️ 云端朗读关」变成「开」。
2. 在「TTS 接口地址」框粘贴上面那个**带 `{text}`** 的地址，点「保存」。
3. 点「试听」测试；之后所有题目朗读、动画讲解、答对话语都会走这个云端服务出声。

## 四、注意
- 服务端必须能访问微软语音接口（境外网络），Render / Fly / 自建境外主机默认满足；**纯国内主机可能连不上微软 TTS**，需用支持外联的节点。
- 此服务是**个人兜底**用途，建议不要公开给陌生人滥用；如需加密码可在 `tts_server.py` 里校验请求头 token。
- 语种自动按 `lang` 选择音色：en-US→Aria、en-GB→Sonia、zh-CN→Xiaoxiao、zh-TW→HsiaoChen。
