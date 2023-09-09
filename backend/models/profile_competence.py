# from sqlalchemy import Table, Column, Integer, ForeignKey
# from backend.models import Base
#
# profile_competence = Table(
#     "profile_competences",
#     Base.metadata,
#     Column("profile_id", Integer, ForeignKey("profiles.id")),
#     Column("competence_id", Integer, ForeignKey("competences.id")),
# )