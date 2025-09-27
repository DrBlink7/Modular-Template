from pydantic import BaseModel, ConfigDict

class UserBase(BaseModel):
    id: str
    model_config = ConfigDict(from_attributes=True)

class UserCreate(UserBase):
    pass

class User(UserBase):
    pass
