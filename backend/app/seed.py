import json
from pathlib import Path
from sqlalchemy.orm import Session
from .models import State, Destination, Place, Guide, Tour, User
from .security import hash_password

ROOT = Path(__file__).resolve().parents[1] / "seed_data"

def read(name):
    return json.loads((ROOT / name).read_text(encoding="utf-8"))

def seed_database(db: Session):
    states = read("states.json")
    destinations = read("destinations.json")
    places = read("places.json")
    guides = read("guides.json")

    for item in states:
        if not db.get(State, item["id"]):
            db.add(State(id=item["id"], name=item["name"], content=item))
    for item in destinations:
        if not db.get(Destination, item["id"]):
            db.add(Destination(id=item["id"], state_id=item["stateId"], name=item["name"], content=item))
    for item in places:
        if not db.get(Place, item["id"]):
            db.add(Place(id=item["id"], destination_id=item["destinationId"], name=item["name"], content=item))
    for item in guides:
        if not db.get(Guide, item["id"]):
            db.add(Guide(id=item["id"], city=item["city"], name=item["name"], content=item))

    if db.query(Tour).count() == 0:
        tours = [
            ("Agra", "Agra Heritage Group Walk", "group", "4 hours", 999, "Taj Mahal • Agra Fort • local stories"),
            ("Agra", "Old Agra & Local Culture", "group", "5 hours", 1199, "Old city • markets • crafts • local food"),
            ("Jaipur", "Jaipur Royal City Tour", "group", "5 hours", 1299, "Forts • old city • crafts & bazaars"),
            ("Varanasi", "Varanasi Culture & Ghats", "group", "5 hours", 1199, "Ghats • old lanes • local traditions"),
            ("Delhi", "Old Delhi Cultural Trail", "group", "4 hours", 999, "Heritage • markets • street food"),
            ("Agra", "Agra Heritage Essentials", "private", "4 hours", 1499, "Taj Mahal • Agra Fort • local stories"),
            ("Agra", "Private Agra Experience", "private", "7 hours", 2999, "Private guide • flexible pace • personalised route"),
        ]
        for city, title, kind, duration, price, detail in tours:
            db.add(Tour(city=city, title=title, kind=kind, duration=duration, price=price, detail=detail))

    if not db.query(User).filter(User.email == "welcome@sanskritix.app").first():
        db.add(User(name="Aanya Verma", email="welcome@sanskritix.app", password_hash=hash_password("exploreindia"), country="India", preferred_language="en", interests=["Heritage", "Food", "Hidden places"]))
    db.commit()
