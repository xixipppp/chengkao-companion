FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# HF Spaces / Render 都会注入 PORT 环境变量；HF 默认 7860
EXPOSE 7860
CMD uvicorn tts_server:app --host 0.0.0.0 --port ${PORT:-7860}
