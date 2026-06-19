from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import get_connection, init_db
from schemas import ProductoOut, VentaRequest
from datetime import datetime
from schemas import VentaRequest
from fastapi.staticfiles import StaticFiles
import os

VentaRequest.model_rebuild()  # after import

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

@app.get("/api/productos", response_model=list[ProductoOut])
def get_productos():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM productos").fetchall()
    conn.close()
    return [dict(r) for r in rows]

@app.post("/api/ventas")
def crear_venta(data: VentaRequest):
    conn = get_connection()
    try:
        fecha = datetime.now().isoformat()
        cur = conn.execute(
            "INSERT INTO ventas (fecha, total) VALUES (?, ?)",
            (fecha, data.total),
        )
        venta_id = cur.lastrowid

        for item in data.items:
            conn.execute(
                "INSERT INTO venta_detalle (venta_id, producto_id, producto_nombre, precio) VALUES (?, ?, ?, ?)",
                (venta_id, item.id, item.nombre, item.precio),
            )
            conn.execute(
                "UPDATE productos SET stock = stock - 1 WHERE id = ? AND stock > 0",
                (item.id,),
            )

        conn.commit()
        return {"ok": True, "venta_id": venta_id}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dist_dir = os.path.join(ROOT, "dist")
if os.path.exists(dist_dir):
    app.mount("/", StaticFiles(directory=dist_dir, html=True), name="frontend")