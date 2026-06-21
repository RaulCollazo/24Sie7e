import "./Carrito.css";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
};

type CarritoProps = {
  items: Producto[];
};

function Carrito({ items }: CarritoProps) {
  const total = items.reduce((sum, item) => sum + item.precio, 0);

  return (
    <div className="left-panel">
      <h3> Precio</h3>

      {items.map((item, index) => (
        <div key={index}>
          {item.nombre} - ${item.precio}
        </div>
      ))}

      <hr />

      <h3>Total: ${total}</h3>
    </div>
  );
}

export default Carrito;
