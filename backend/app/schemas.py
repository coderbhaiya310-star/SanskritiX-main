from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class SignupIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)
    country: str = "India"
    preferredLanguage: str = "en"
    travelInterests: list[str] = []

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    country: str
    preferredLanguage: str
    travelInterests: list[str]
    role: str

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut

class BookingIn(BaseModel):
    tour_id: int
    travel_date: str
    people: int = Field(default=1, ge=1, le=50)
    language: str = "English"

class BookingOut(BaseModel):
    id: int
    tour_id: int
    travel_date: str
    people: int
    language: str
    total_amount: float
    status: str

class AIIn(BaseModel):
    question: str = Field(min_length=1, max_length=1000)
    city: str = "Agra"
