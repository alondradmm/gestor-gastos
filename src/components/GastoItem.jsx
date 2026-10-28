function GastoItem({ 
  gasto,
  eliminarGasto,
  setGastoEditando,
  setNewGasto, obtenerDatosFormulario
}) {
  return (
    <li className="gasto-item">
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
            setNewGasto(obtenerDatosFormulario(gasto));
          }
          }>
            Editar
          </button>
        </div>

      </div>
    </li>
  )
};

export default GastoItem;