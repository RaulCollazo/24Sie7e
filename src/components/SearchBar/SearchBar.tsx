import { useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const productos = [
    { nombre: "Yerba Taragüi x kg", precio: 2000, stock: 2 },
    { nombre: "Yerba Playadito x kg", precio: 2200, stock: 3 },
    { nombre: "Yerba THC x g", precio: 20000, stock: 0 },
  ];

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
              <div key={producto.nombre} className="search-item">
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
    </div>
  );
}

export default SearchBar;
