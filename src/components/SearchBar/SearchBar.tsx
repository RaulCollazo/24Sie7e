import { useState } from "react";
import "./SearchBar.css";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
};

type SearchBarProps = {
  onSelect: (producto: Producto) => void;
  productos: Producto[];
  carrito: Producto[];
  onFinishBuying: () => void;
};

function SearchBar({
  onSelect,
  productos,
  carrito,
  onFinishBuying,
}: SearchBarProps) {
  const [busqueda, setBusqueda] = useState("");

  const resultados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <span className="search-icon">▼</span>

        <input
          type="text"
          className="search-input"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {busqueda && (
          <button className="clear-button" onClick={() => setBusqueda("")}>
            ✕
          </button>
        )}
      </div>

      {busqueda && (
        <div className="search-results">
          {resultados.length > 0 ? (
            resultados.map((producto) => (
              <div
                key={producto.id}
                className="search-item"
                onClick={() => producto.stock > 0 && onSelect(producto)}
              >
                <div className="item-title">{producto.nombre}</div>

                <div className="item-subtitle">
                  Precio: ${producto.precio} · Existencias:{" "}
                  {producto.stock > 0 ? producto.stock : "Agotado"}
                </div>
              </div>
            ))
          ) : (
            <div className="search-item">No se encontraron resultados</div>
          )}
        </div>
      )}

      <button
        className="btn-finalizar"
        disabled={carrito.length === 0}
        onClick={onFinishBuying}
      >
        Finalizar Compra
      </button>
    </div>
  );
}

export default SearchBar;
