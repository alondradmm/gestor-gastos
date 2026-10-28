

function FormularioGasto({
  newGasto, setNewGasto, defaultGasto,
  gastoEditando, setGastoEditando,
  agregarGasto, handleChange
}) {
  return (
    <form onSubmit={agregarGasto}>
      <label>
        Descripción
        <input
          name="descripcion"
          value={newGasto.descripcion}
          onChange={handleChange}
          placeholder="Ej. Comida"
        />
      </label>

      <label>
        Importe
        <input
          name="importe"
          type="number"
          min="0.01"
          step="0.01"
          value={newGasto.importe}
          onChange={handleChange}
          placeholder="Ej. 150"
        />
      </label>

      <select value={newGasto.categoria} name="categoria" onChange={handleChange}>
        <option value="comida">Comida</option>
        <option value="transporte">Transporte</option>
        <option value="entretenimiento">Entretenimiento</option>
      </select>

      <button type="submit">{gastoEditando ? 'Guardar cambios' : 'Agregar gasto'}</button>
      {gastoEditando && (
        <button type="button"
          onClick={() => {
          setGastoEditando(null);
          setNewGasto(defaultGasto)
        }}>Cancelar</button>
      )}
    </form>
  )
}

export default FormularioGasto