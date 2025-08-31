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

# --- Note Schemas ---
class NoteBase(BaseModel):
    department: str
    course: str
    semester: int
    subject: str
    gdrive_link: str

class NoteCreate(NoteBase):
    pass

class Note(NoteBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# --- PYQ Schemas ---
class PyqBase(BaseModel):
    department: str
    course: str
    semester: int
    subject: str
    gdrive_link: str

class PyqCreate(PyqBase):
    pass

class Pyq(PyqBase):
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