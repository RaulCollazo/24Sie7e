from pydantic import BaseModel

class ProductoOut(BaseModel):
    id: int
    nombre: str
    precio: float
    stock: int

class VentaItem(BaseModel):
    id: int
    nombre: str
    precio: float
    stock: int

class VentaRequest(BaseModel):
    items: list[VentaItem]
    total: float

VentaRequest.model_rebuild()