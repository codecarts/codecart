import os
from fastapi import Header, HTTPException, status
from dotenv import load_dotenv

load_dotenv()

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

def verify_admin(
    x_admin_email: str = Header(...),
    x_admin_password: str = Header(...)
):
    is_email_valid = (x_admin_email == ADMIN_EMAIL)
    is_password_valid = (x_admin_password == ADMIN_PASSWORD)

    if not all([is_email_valid, is_password_valid]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Admin Credentials.",
        )
    return True