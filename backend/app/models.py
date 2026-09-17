from datetime import datetime
from sqlalchemy import String, Integer, Float, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column
from .db import Base

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    country: Mapped[str] = mapped_column(String(100), default="India")
    preferred_language: Mapped[str] = mapped_column(String(10), default="en")
    interests: Mapped[list] = mapped_column(JSON, default=list)
    role: Mapped[str] = mapped_column(String(30), default="traveller")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class State(Base):
    __tablename__ = "states"
    id: Mapped[str] = mapped_column(String(80), primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    content: Mapped[dict] = mapped_column(JSON)

class Destination(Base):
    __tablename__ = "destinations"
    id: Mapped[str] = mapped_column(String(80), primary_key=True)
    state_id: Mapped[str] = mapped_column(String(80), index=True)
    name: Mapped[str] = mapped_column(String(120))
    content: Mapped[dict] = mapped_column(JSON)

class Place(Base):
    __tablename__ = "places"
    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    destination_id: Mapped[str] = mapped_column(String(80), index=True)
    name: Mapped[str] = mapped_column(String(160))
    content: Mapped[dict] = mapped_column(JSON)

class Guide(Base):
    __tablename__ = "guides"
    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    city: Mapped[str] = mapped_column(String(100), index=True)
    name: Mapped[str] = mapped_column(String(160))
    content: Mapped[dict] = mapped_column(JSON)

class Tour(Base):
    __tablename__ = "tours"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    city: Mapped[str] = mapped_column(String(100), index=True)
    title: Mapped[str] = mapped_column(String(200))
    kind: Mapped[str] = mapped_column(String(30), default="group")
    duration: Mapped[str] = mapped_column(String(50))
    price: Mapped[float] = mapped_column(Float)
    detail: Mapped[str] = mapped_column(Text)
    guide_required: Mapped[bool] = mapped_column(default=True)

class Booking(Base):
    __tablename__ = "bookings"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    tour_id: Mapped[int] = mapped_column(ForeignKey("tours.id"))
    travel_date: Mapped[str] = mapped_column(String(30))
    people: Mapped[int] = mapped_column(Integer, default=1)
    language: Mapped[str] = mapped_column(String(40), default="English")
    total_amount: Mapped[float] = mapped_column(Float)
    status: Mapped[str] = mapped_column(String(30), default="requested")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class SavedPlace(Base):
    __tablename__ = "saved_places"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    place_id: Mapped[str] = mapped_column(String(100), index=True)

class Review(Base):
    __tablename__ = "reviews"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    place_id: Mapped[str] = mapped_column(String(100), index=True)
    rating: Mapped[int] = mapped_column(Integer)
    text: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
