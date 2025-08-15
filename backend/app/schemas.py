# backend/app/schemas.py - CORRECTED

from pydantic import BaseModel
from datetime import datetime
from .models import ResourceType

# Base schema for a Product
class ProductBase(BaseModel):
    name: str
    description: str | None = None
    image_url: str | None = None
    affiliate_link: str

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    class Config:
        from_attributes = True # Changed from orm_mode

# Base schema for a Blog
class BlogBase(BaseModel):
    title: str
    author: str
    gdrive_link: str

class BlogCreate(BlogBase):
    pass

class Blog(BlogBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True # Changed from orm_mode

# Base schema for a Resource (Note/PYQ)
class ResourceBase(BaseModel):
    title: str
    description: str | None = None
    gdrive_link: str
    resource_type: ResourceType
    category: str # Add this line

class ResourceCreate(ResourceBase):
    pass

class Resource(ResourceBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True # Changed from orm_mode

# Add this new class at the end of the file
class AdminCredentials(BaseModel):
    email: str
    password: str
    secretKey: str