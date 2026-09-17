from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import or_
from .config import settings
from .db import Base, engine, get_db, SessionLocal
from .models import State, Destination, Place, Guide, Tour, User, Booking
from .schemas import SignupIn, LoginIn, TokenOut, UserOut, BookingIn, BookingOut, AIIn
from .security import hash_password, verify_password, create_token
from .auth import current_user
from .seed import seed_database

app = FastAPI(title="SanskritiX API", version="1.0.0")
origins = [x.strip() for x in settings.cors_origins.split(",") if x.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()

def user_out(u: User):
    return UserOut(id=u.id, name=u.name, email=u.email, country=u.country, preferredLanguage=u.preferred_language, travelInterests=u.interests or [], role=u.role)

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "SanskritiX API"}

@app.get("/api/states")
def states(db: Session = Depends(get_db)):
    return [s.content for s in db.query(State).order_by(State.name).all()]

@app.get("/api/destinations")
def destinations(db: Session = Depends(get_db)):
    return [d.content for d in db.query(Destination).order_by(Destination.name).all()]

@app.get("/api/destinations/{destination_id}")
def destination(destination_id: str, db: Session = Depends(get_db)):
    item = db.get(Destination, destination_id)
    if not item: raise HTTPException(404, "Destination not found")
    return item.content

@app.get("/api/places")
def places(destination_id: str | None = None, q: str | None = None, db: Session = Depends(get_db)):
    query = db.query(Place)
    if destination_id: query = query.filter(Place.destination_id == destination_id)
    if q:
        like = f"%{q}%"
        query = query.filter(Place.name.ilike(like))
    return [p.content for p in query.order_by(Place.name).all()]

@app.get("/api/guides")
def guides(city: str | None = None, db: Session = Depends(get_db)):
    query = db.query(Guide)
    if city: query = query.filter(Guide.city.ilike(city))
    return [g.content for g in query.order_by(Guide.name).all()]

@app.get("/api/tours")
def tours(city: str | None = None, kind: str | None = None, db: Session = Depends(get_db)):
    query = db.query(Tour)
    if city: query = query.filter(Tour.city.ilike(city))
    if kind: query = query.filter(Tour.kind == kind)
    return [{"id": t.id, "city": t.city, "title": t.title, "kind": t.kind, "duration": t.duration, "price": t.price, "detail": t.detail} for t in query.order_by(Tour.price).all()]

@app.get("/api/search")
def search(q: str, db: Session = Depends(get_db)):
    term = f"%{q}%"
    places_found = db.query(Place).filter(Place.name.ilike(term)).limit(12).all()
    destinations_found = db.query(Destination).filter(Destination.name.ilike(term)).limit(12).all()
    return {"places": [p.content for p in places_found], "destinations": [d.content for d in destinations_found]}

@app.post("/api/auth/signup", response_model=TokenOut)
def signup(payload: SignupIn, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == payload.email.lower()).first(): raise HTTPException(409, "An account with this email already exists")
    u = User(name=payload.name.strip(), email=payload.email.lower(), password_hash=hash_password(payload.password), country=payload.country, preferred_language=payload.preferredLanguage, interests=payload.travelInterests)
    db.add(u); db.commit(); db.refresh(u)
    return {"access_token": create_token(u.id), "user": user_out(u)}

@app.post("/api/auth/login", response_model=TokenOut)
def login(payload: LoginIn, db: Session = Depends(get_db)):
    u = db.query(User).filter(User.email == payload.email.lower()).first()
    if not u or not verify_password(payload.password, u.password_hash): raise HTTPException(401, "Invalid email or password")
    return {"access_token": create_token(u.id), "user": user_out(u)}

@app.get("/api/auth/me", response_model=UserOut)
def me(user: User = Depends(current_user)):
    return user_out(user)

@app.post("/api/bookings", response_model=BookingOut)
def create_booking(payload: BookingIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    tour = db.get(Tour, payload.tour_id)
    if not tour: raise HTTPException(404, "Tour not found")
    booking = Booking(user_id=user.id, tour_id=tour.id, travel_date=payload.travel_date, people=payload.people, language=payload.language, total_amount=tour.price * payload.people)
    db.add(booking); db.commit(); db.refresh(booking)
    return booking

@app.get("/api/bookings/me", response_model=list[BookingOut])
def my_bookings(user: User = Depends(current_user), db: Session = Depends(get_db)):
    return db.query(Booking).filter(Booking.user_id == user.id).order_by(Booking.created_at.desc()).all()

@app.post("/api/ai/ask")
def ask_ai(payload: AIIn):
    q = payload.question.lower()
    city = payload.city
    if any(x in q for x in ["food", "eat", "dish", "restaurant"]):
        answer = f"For {city}, explore local food alongside the main heritage sights. Tell me your budget and I can shape a food-focused day."
    elif any(x in q for x in ["quiet", "hidden", "less crowded", "peaceful"]):
        answer = f"For a quieter {city} experience, combine lesser-known heritage spots with an early start and local neighbourhood walks."
    elif any(x in q for x in ["guide", "tour", "group"]):
        answer = f"SanskritiX offers guided group and private experiences in {city}. Open Experiences to compare durations, prices and guide-led options."
    elif any(x in q for x in ["2-day", "two day", "plan", "itinerary"]):
        answer = f"For a 2-day {city} trip, balance major heritage sights with local food, crafts and one slower cultural experience. Open Make My Trip for a personalised plan."
    elif any(x in q for x in ["transport", "travel", "route"]):
        answer = f"Share your available hours and starting area in {city}; I can suggest a practical order of places and return-planning tips."
    else:
        answer = f"I can help with {city} places, culture, food, shopping, routes, festivals and guided experiences."
    return {"answer": answer, "city": city}
