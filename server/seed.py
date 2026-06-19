from database import get_connection, init_db

def seed():
    init_db()
    conn = get_connection()
    productos = [         ("Yerba Taragüi x kg", 2000, 2),
        ("Yerba Playadito x kg", 2200, 3),
        ("Yerba THC x g", 20000, 0),
    ]
    conn.executemany("INSERT OR IGNORE INTO productos (nombre, precio, stock) VALUES (?, ?, ?)",
        [(n, p, s) for n, p, s in productos],
    )
    conn.commit()
    conn.close()
if __name__ == "__main__":
    seed()