from sqlalchemy import Column, Integer, String, DateTime, func, Enum
from .db.database import Base
import enum

class ResourceType(str, enum.Enum):
    note = "note"
    pyq = "pyq"

class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    category = Column(String, index=True)
    gdrive_link = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Pyq(Base):
    __tablename__ = "pyqs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    category = Column(String, index=True)
    gdrive_link = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Blog(Base):
    __tablename__ = "blogs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String, default="Admin")
    gdrive_link = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    image_url = Column(String)
    affiliate_link = Column(String, nullable=False)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    message = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())