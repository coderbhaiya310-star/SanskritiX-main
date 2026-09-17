import base64, hashlib, hmac, os
from datetime import datetime, timedelta
from jose import jwt
from .config import settings

ALGORITHM = "HS256"

def hash_password(password: str) -> str:
    salt = os.urandom(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 210_000)
    return base64.b64encode(salt + digest).decode()

def verify_password(password: str, encoded: str) -> bool:
    raw = base64.b64decode(encoded.encode())
    salt, expected = raw[:16], raw[16:]
    actual = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 210_000)
    return hmac.compare_digest(actual, expected)

def create_token(user_id: int) -> str:
    exp = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    return jwt.encode({"sub": str(user_id), "exp": exp}, settings.jwt_secret, algorithm=ALGORITHM)
