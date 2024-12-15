from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import random
import time

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# Load mock robot data
with open('fake_robot_data.json') as f:
    robots = json.load(f)

@app.get("/robots")
def get_robots():
    # Simulate real-time updates
    for robot in robots:
        robot['battery'] = max(0, robot['battery'] - random.randint(0, 5))  # Decrease battery randomly
        robot['online'] = robot['battery'] > 0  # Update online status based on battery
    return JSONResponse(content=robots)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

