from dataclasses import dataclass
from typing import Optional

from bson.objectid import ObjectId
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel

router = APIRouter()


@router.post("/chat", response_model=dict)
async def chatapi():
    return {}
