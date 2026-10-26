import GastoItem from "./GastoItem";

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
      {gastosCount === 0 ? (
        <p>Aún no has registrado gastos.</p>
      ) : (
        <>
          <p>Gastos Registrados: {gastosCount}</p>
          {gastosOrdenados.length === 0 ? (
            <p>No hay registros que coincidan con el filtro.</p>
          ) : (
            <>
              <ul>
                {gastosOrdenados.map((gasto) => (
                  <GastoItem
                    key={gasto.id}
                    gasto={gasto}
                    eliminarGasto={eliminarGasto}
                    setGastoEditando={setGastoEditando}
                    setDescripcion={setDescripcion}
                    setImporte={setImporte}
                    setCategoria={setCategoria} />
                ))}
              </ul>
              <button onClick={() => {
                if (window.confirm("¿Estás seguro?")) {
                  eliminarGastos()
                }
              }}>Eliminar Gastos</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ListaGastos;