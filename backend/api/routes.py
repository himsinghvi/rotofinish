from datetime import datetime
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field

from .data import (
    ABOUT,
    BRANDS,
    CAPABILITIES,
    COMPANY,
    DOWNLOADS,
    INDUSTRIES,
    PRODUCTS,
    SLIDER,
    STATS,
    WHY_CHOOSE,
)

router = APIRouter(prefix="/api", tags=["api"])

# In-memory contact submissions (demo)
_contact_submissions: list[dict] = []


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    company: Optional[str] = Field(None, max_length=100)
    subject: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)


class QuoteRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=8, max_length=20)
    product: Optional[str] = None
    industry: Optional[str] = None
    message: str = Field(..., min_length=10, max_length=2000)


@router.get("/health")
def health_check():
    return {"status": "ok", "service": "rotofinish-api"}


@router.get("/company")
def get_company():
    return COMPANY


@router.get("/stats")
def get_stats():
    return STATS


@router.get("/why-choose")
def get_why_choose():
    return WHY_CHOOSE


@router.get("/capabilities")
def get_capabilities():
    return CAPABILITIES


@router.get("/products")
def get_products():
    return PRODUCTS


@router.get("/products/{product_id}")
def get_product(product_id: str):
    for product in PRODUCTS:
        if product["id"] == product_id:
            return product
    raise HTTPException(status_code=404, detail="Product not found")


@router.get("/industries")
def get_industries():
    return INDUSTRIES


@router.get("/industries/{industry_id}")
def get_industry(industry_id: str):
    for industry in INDUSTRIES:
        if industry["id"] == industry_id:
            return industry
    raise HTTPException(status_code=404, detail="Industry not found")


@router.get("/brands")
def get_brands():
    return BRANDS


@router.get("/slider")
def get_slider():
    return SLIDER


@router.get("/downloads")
def get_downloads():
    return DOWNLOADS


@router.get("/about")
def get_about():
    return ABOUT


@router.post("/contact")
def submit_contact(payload: ContactRequest):
    entry = {
        "id": len(_contact_submissions) + 1,
        "submitted_at": datetime.utcnow().isoformat(),
        **payload.model_dump(),
    }
    _contact_submissions.append(entry)
    return {
        "success": True,
        "message": "Thank you for contacting RotoFinish. Our team will respond within 24 hours.",
        "reference_id": entry["id"],
    }


@router.post("/quote")
def submit_quote(payload: QuoteRequest):
    entry = {
        "id": len(_contact_submissions) + 1,
        "type": "quote",
        "submitted_at": datetime.utcnow().isoformat(),
        **payload.model_dump(),
    }
    _contact_submissions.append(entry)
    return {
        "success": True,
        "message": "Quote request received. Our sales team will prepare a tailored proposal shortly.",
        "reference_id": entry["id"],
    }


@router.get("/submissions")
def list_submissions():
    """Admin endpoint for demo — lists contact submissions."""
    return _contact_submissions
