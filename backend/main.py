from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from app.db import database
from app import models
from app.api import admin
from app import schemas
from .app import auth
from fastapi.security import OAuth2PasswordRequestForm

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="codecart API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # "http://localhost:5173",  # This line has been removed
        "https://codecart-frontend.onrender.com",
        "https://codecart.qzz.io"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/admin/verify", status_code=status.HTTP_200_OK)
def verify_admin_credentials(credentials: schemas.AdminCredentials):
    is_email_valid = (credentials.email == admin.ADMIN_EMAIL)
    is_password_valid = (credentials.password == admin.ADMIN_PASSWORD)

    if not all([is_email_valid, is_password_valid]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Admin Credentials.",
        )
    return {"message": "Admin verification successful"}

@app.get("/")
def read_root():
    return {"message": "Welcome to the codecart API"}

@app.get("/api/resources", response_model=List[schemas.Resource])
def get_all_resources(db: Session = Depends(database.get_db)):
    return db.query(models.Resource).order_by(models.Resource.created_at.desc()).all()

@app.get("/api/blogs", response_model=List[schemas.Blog])
def get_all_blogs(db: Session = Depends(database.get_db)):
    return db.query(models.Blog).order_by(models.Blog.created_at.desc()).all()

@app.get("/api/products", response_model=List[schemas.Product])
def get_all_products(db: Session = Depends(database.get_db)):
    return db.query(models.Product).order_by(models.Product.id.desc()).all()

@app.post("/api/resources", response_model=schemas.Resource, status_code=status.HTTP_201_CREATED)
def create_resource(
    resource: schemas.ResourceCreate,
    is_admin: bool = Depends(admin.verify_admin),
    db: Session = Depends(database.get_db)
):
    db_resource = models.Resource(**resource.dict())
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    return db_resource

@app.post("/api/blogs", response_model=schemas.Blog, status_code=status.HTTP_201_CREATED)
def create_blog(
    blog: schemas.BlogCreate,
    is_admin: bool = Depends(admin.verify_admin),
    db: Session = Depends(database.get_db)
):
    db_blog = models.Blog(**blog.dict())
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return db_blog

# --- USER AUTHENTICATION ENDPOINTS ---

@app.post("/api/users/register", response_model=schemas.UserOut, status_code=status.HTTP_201_CREATED)
def register_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/api/users/login", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/products", response_model=schemas.Product, status_code=status.HTTP_201_CREATED)
def create_product(
    product: schemas.ProductCreate,
    is_admin: bool = Depends(admin.verify_admin),
    db: Session = Depends(database.get_db)
):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product