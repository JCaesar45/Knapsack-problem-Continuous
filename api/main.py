from __future__ import annotations

from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


class Item(BaseModel):
    name: str
    weight: float = Field(gt=0)
    value: float = Field(ge=0)


class AllocationRequest(BaseModel):
    items: List[Item]
    capacity: float = Field(ge=0)


class Selection(BaseModel):
    name: str
    weight: float
    value: float
    fraction: float


class AllocationResponse(BaseModel):
    total_value: float
    total_weight: float
    selections: List[Selection]


def optimize_continuous_knapsack(items: List[Item], capacity: float) -> AllocationResponse:
    remaining = capacity
    total_value = 0.0
    total_weight = 0.0
    selections: List[Selection] = []

    ordered = sorted(items, key=lambda item: item.value / item.weight, reverse=True)

    for item in ordered:
        if remaining <= 0:
            break

        take_weight = min(item.weight, remaining)
        fraction = take_weight / item.weight
        take_value = item.value * fraction

        selections.append(
            Selection(
                name=item.name,
                weight=take_weight,
                value=take_value,
                fraction=fraction
            )
        )

        total_weight += take_weight
        total_value += take_value
        remaining -= take_weight

    return AllocationResponse(
        total_value=total_value,
        total_weight=total_weight,
        selections=selections
    )


app = FastAPI(title="Aurum Revenue Atlas API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"]
)


@app.get("/")
def read_root():
    return {
        "service": "Aurum Revenue Atlas API",
        "status": "operational"
    }


@app.post("/api/optimize", response_model=AllocationResponse)
def optimize(request: AllocationRequest):
    return optimize_continuous_knapsack(request.items, request.capacity)
