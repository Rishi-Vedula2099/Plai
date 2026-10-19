from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import json
import asyncio

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket)
    try:
        while True:
            # Wait for any messages from client
            data = await websocket.receive_text()
            print(f"Received from {client_id}: {data}")
            
            # Send mock real-time updates for processing
            if json.loads(data).get("action") == "subscribe_analysis":
                # Mock a stream of processing updates
                for i in range(10, 101, 10):
                    await asyncio.sleep(1)
                    await manager.send_personal_message(
                        json.dumps({"type": "progress", "progress": i, "status": f"Analyzing frame {i * 100}..."}),
                        websocket
                    )
                await manager.send_personal_message(
                    json.dumps({"type": "complete", "message": "Analysis finished!"}),
                    websocket
                )
    except WebSocketDisconnect:
        manager.disconnect(websocket)
