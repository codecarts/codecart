import os
from fastapi import Header, HTTPException, status
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

# Get all three credentials from the environment
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
ADMIN_SECRET = os.getenv("ADMIN_SECRET_KEY")

def verify_admin(
    x_admin_email: str = Header(...),
    x_admin_password: str = Header(...),
    x_admin_secret: str = Header(...)
):
    # Check if all three submitted credentials match the ones in the .env file
    is_email_valid = (x_admin_email == ADMIN_EMAIL)
    is_password_valid = (x_admin_password == ADMIN_PASSWORD)
    is_secret_valid = (x_admin_secret == ADMIN_SECRET)

    if not all([is_email_valid, is_password_valid, is_secret_valid]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Admin Credentials.",
        )
    return True