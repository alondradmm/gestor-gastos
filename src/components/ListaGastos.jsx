function ListaGastos({
  gastos,
  gastosOrdenados,
  gastosCount,
  eliminarGasto,
  eliminarGastos,
  setGastoEditando,
  setDescripcion,
  setImporte,
  setCategoria }) {
  return (
    <div>
      {gastos.length === 0 ? (
        <p>Aún no has registrado gastos.</p>
      ) : (
        <ul>
          <p>Gastos Registrados: {gastosCount}</p>
          {gastosOrdenados.map((gasto) => (
            <li key={gasto.id} className="gasto-item">
              <div className="gasto-info">
                <p>{gasto.descripcion}</p>
                <p>
                  {gasto.importe.toLocaleString("es-MX", {
                    style: "currency",
                    currency: "MXN",
                  })}
                </p>
              </div>
              <div className="gasto-footer">
                <span className="categoria-etiqueta">
                  {gasto.categoria}
                </span>

                <div>
                  <button onClick={() => eliminarGasto(gasto.id)}>
                    Eliminar
                  </button>
                  <button onClick={() => {
                    setGastoEditando(gasto);
                    setDescripcion(gasto.descripcion);
                    setImporte(gasto.importe);
                    setCategoria(gasto.categoria);
                  }
                  }>
                    Editar
                  </button>
                </div>

              </div>
            </li>
          ))}
          <button onClick={eliminarGastos}>Eliminar Gastos</button>
        </ul>
      )}
    </div>
  );
}

export default ListaGastos;