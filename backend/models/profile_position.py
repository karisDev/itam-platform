# from sqlalchemy import Table, Column, Integer, ForeignKey
# from backend.models import Base
#
# profile_positions = Table(
#     "profile_positions",
#     Base.metadata,
#     Column("profile_id", Integer, ForeignKey("profiles.id")),
#     Column("position_id", Integer, ForeignKey("positions.id")),
# )