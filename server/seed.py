from database import get_connection, init_db

def seed():
    init_db()
    conn = get_connection()
    productos = [
        # --- Yerbas ---
        ("Yerba Taragüi x kg", 2000, 2),
        ("Yerba Playadito x kg", 2200, 3),
        ("Yerba Amanda x kg", 2100, 5),
        ("Yerba La Merced x kg", 2500, 0),
        ("Yerba Canarias x kg", 1900, 4),
        ("Yerba Rosamonte x kg", 1800, 10),
        ("Yerba Cruz de Malta x kg", 2300, 0),
        ("Yerba Unión x kg", 2150, 6),
        ("Yerba Mañanita x kg", 1950, 3),
        ("Yerba Nobleza Gaucha x kg", 1700, 8),
        ("Yerba CBSe x kg", 2050, 0),
        ("Yerba Verdeflor x kg", 1850, 4),
        # --- Mates ---
        ("Mate Imperial", 5000, 2),
        ("Mate Camionero", 3500, 3),
        ("Mate Torpedo", 4200, 0),
        ("Mate Pintado", 3800, 4),
        ("Mate de Vidrio", 1500, 10),
        ("Mate de Silicona", 2500, 5),
        ("Mate de Calabaza", 3000, 0),
        ("Mate Automático", 6000, 2),
        # --- Termos ---
        ("Termo Stanley 1L", 15000, 1),
        ("Termo Stanley 500ml", 12000, 0),
        ("Termo Lumilagro 1L", 8000, 3),
        ("Termo Termolar 1L", 7000, 4),
        # --- Bombillas ---
        ("Bombilla Pico de Loro", 2500, 0),
        ("Bombilla Cuchara", 2000, 5),
        ("Bombilla Resorte", 1500, 3),
        ("Bombilla de Acero x3", 1000, 8),
        ("Bombilla de Vidrio x3", 1200, 0),
        # --- Accesorios ---
        ("Portatermo de Cuero", 4500, 2),
        ("Morral Matero", 3500, 4),
        ("Azucarera de Algarrobo", 1800, 0),
        ("Matera de Cuero x3", 5500, 1),
        ("Paquete de Repuestos x10", 800, 10),
    ]
    conn.executemany("INSERT OR IGNORE INTO productos (nombre, precio, stock) VALUES (?, ?, ?)",
        [(n, p, s) for n, p, s in productos],
    )
    conn.commit()
    conn.close()
if __name__ == "__main__":
    seed()