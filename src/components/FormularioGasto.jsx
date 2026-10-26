function FormularioGasto({
  descripcion, setDescripcion,
  importe, setImporte,
  categoria, setCategoria,
  gastoEditando, setGastoEditando,
  agregarGasto
}) {
  return (
    <form onSubmit={agregarGasto}>
      <label>
        Descripción
        <input
          value={descripcion}
          onChange={(event) =>
            setDescripcion(event.target.value)
          }
          placeholder="Ej. Comida"
        />
      </label>

      <label>
        Importe
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={importe}
          onChange={(event) =>
            setImporte(event.target.value)
          }
          placeholder="Ej. 150"
        />
      </label>

      <select value={categoria} onChange={(event) => setCategoria(event.target.value)}>
        <option value="comida">Comida</option>
        <option value="transporte">Transporte</option>
        <option value="entretenimiento">Entretenimiento</option>
      </select>

      <button type="submit">{gastoEditando ? 'Guardar cambios' : 'Agregar gasto'}</button>
      {gastoEditando && (
        <button type="button"
          onClick={() => {
          setGastoEditando(null);
          setDescripcion("");
          setImporte("")
        }}>Cancelar</button>
      )}
    </form>
  )
}

export default FormularioGasto