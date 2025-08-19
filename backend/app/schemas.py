from pydantic import BaseModel
from datetime import datetime
from .models import ResourceType

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
        from_attributes = True

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
        from_attributes = True

class ResourceBase(BaseModel):
    title: str
    description: str | None = None
    gdrive_link: str
    resource_type: ResourceType
    category: str

class ResourceCreate(ResourceBase):
    pass

class Resource(ResourceBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class AdminCredentials(BaseModel):
    email: str
    password: str
    
#user login before contact me submit
class UserCreate(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class ContactMessageBase(BaseModel):
    name: str
    email: str
    message: str

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessage(ContactMessageBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True