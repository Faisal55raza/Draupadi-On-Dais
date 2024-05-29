from fastapi import FastAPI

# from routers import chat
from src.agent_models import OutreachTarget
from src.vaani import outreach
import src.test_chat as org_chat
import src.test_chat2 as event_chat

from pydantic import BaseModel


class Chat(BaseModel):
    msg: str


app = FastAPI()

# app.include_router(chat.router)


@app.post("/suggest-speaker", response_model=dict)
async def outreach_start(target: OutreachTarget):
    outreach(target, send_mail=True)
    return {}


@app.post("/org-chat/{id}", response_model=dict)
async def outreach_start(id: str, msg: Chat):
    return {"reply": org_chat.main(id, msg.msg)}


@app.post("/speaker-chat/{id}", response_model=dict)
async def outreach_start(id: str, msg: Chat):
    return {"reply": event_chat.main(id, msg.msg)}
