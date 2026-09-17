from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_url: str = "sqlite:///./sanskritix.db"
    jwt_secret: str = "dev-only-change-me"
    access_token_expire_minutes: int = 1440
    cors_origins: str = "http://localhost:5173"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()

@property
def cors_list():
    return [x.strip() for x in settings.cors_origins.split(",") if x.strip()]
