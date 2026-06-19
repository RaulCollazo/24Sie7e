import { useState, useEffect } from "react";
import "./App.css";

import Logo from "./components/Logo/Logo";
import SearchBar from "./components/SearchBar/SearchBar";
import Carrito from "./components/Carrito/Carrito";

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
};

function App() {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    fetch("/api/productos")
      .then((r) => r.json())
      .then(setProductos);
  }, []);

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const finalizarCompra = async () => {
    const total = carrito.reduce((s, i) => s + i.precio, 0);
    const res = await fetch("/api/ventas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: carrito, total }),
    });
    if (res.ok) {
      setCarrito([]);
      alert("Venta registrada");
    }
  };

  return (
    <>
      <header className="header">
        <Logo />
      </header>

      <div className="content-row">
        <div className="carrito">
          <Carrito items={carrito} />
        </div>

        <div className="searchbar-wrapper">
          <SearchBar
            onSelect={agregarAlCarrito}
            productos={productos}
            carrito={carrito}
            onFinishBuying={finalizarCompra}
          />
        </div>
      </div>
    </>
  );
}

export default App;
