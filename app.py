import webview
import threading
import uvicorn
import time
import requests


def start_fastapi():
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=False)


def wait_for_server(url, timeout=10):
    start_time = time.time()
    while time.time() - start_time < timeout:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                return True
        except requests.exceptions.ConnectionError:
            pass
        time.sleep(0.3)
    return False


if __name__ == "__main__":
    # Start FastAPI in background
    threading.Thread(target=start_fastapi, daemon=True).start()

    # Wait until server is ready
    print("🔄 Waiting for FastAPI to start...")
    if wait_for_server("http://127.0.0.1:8000"):
        print("✅ Server is ready. Launching app...")
        webview.create_window("AI Voice Email Assistant", "http://127.0.0.1:8000", width=620, height=700)
        webview.start()
    else:
        print("❌ Server failed to start within timeout.")
