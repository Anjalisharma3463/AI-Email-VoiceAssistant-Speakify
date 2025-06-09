from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Serve static files (CSS)
app.mount("/static", StaticFiles(directory="frontend"), name="static")

# Allow requests from webview
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route to serve the main HTML file
@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("frontend/index.html", "r") as file:
        html_content = file.read()
    return HTMLResponse(content=html_content, status_code=200) 