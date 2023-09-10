from fastapi import APIRouter, Depends

from backend.dependencies.role_checker import RoleChecker

allow_create_resource = RoleChecker(["ADMIN"])
router = APIRouter(prefix="/admin", tags=["admin"])
# router.dependencies = Depends(allow_create_resource)


@router.get("/is_admin", response_model=bool)
def is_admin():
    return True



