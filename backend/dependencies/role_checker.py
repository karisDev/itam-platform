from typing import Annotated

from fastapi import Depends, HTTPException

from backend.core.security import oauth2_scheme
from backend.services.auth import AuthService, get_auth_service


class RoleChecker:
    def __init__(self, allowed_roles: list):
        self.allowed_roles = allowed_roles

    def __call__(self, token: Annotated[str, Depends(oauth2_scheme)],
                       auth_service: AuthService = Depends(get_auth_service)):
        user = auth_service.get_current_user(token)
        if user.role not in self.allowed_roles:
            # logger.debug(f"User with role {user.role} not in {self.allowed_roles}")
            raise HTTPException(status_code=403, detail="Operation not permitted")
