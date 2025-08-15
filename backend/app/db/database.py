import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# Use the DATABASE_URL from environment variables for production
# Fallback to the local SQLite DB for development
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///../database/codecart.db")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
# The check_same_thread arg is only for SQLite, so it's removed from the engine for production

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()