
import { useState, useEffect } from "react";

function App() {
  const [descripcion, setDescripcion] = useState("");
  const [importe, setImporte] = useState("");
  const [gastos, setGastos] = useState(() => {
      const getGastos = localStorage.getItem("gastos");
      if (getGastos == null){
        return [];
      }
      try {
        return JSON.parse(getGastos);
      } catch (error) {
        console.error("Hubo un error con el parseo:", error)
        return [];
      }
    }
  );

  const [limite, setLimite] = useState("");
  const [orden, setOrden] = useState("ninguno");
  const [categoria, setCategoria] = useState("comida");
  
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos))
  }, [gastos]);

  function agregarGasto(event) {
    event.preventDefault();

    if (!descripcion.trim() || Number(importe) <= 0) {
      return;
    }

    const nuevoGasto = {
      id: crypto.randomUUID(),
      descripcion: descripcion.trim(),
      importe: Number(importe),
    };

    const gastosList = [...gastos, nuevoGasto]
    setGastos(gastosList);

    setDescripcion("");
    setImporte("");
  }

  const total = gastos.reduce(
    (suma, gasto) => suma + gasto.importe,
    0
  );

  const gastosCount = gastos.length;

  const gastosFiltrados =
    limite === ""
      ? gastos
      : gastos.filter(g => g.importe >= limite);

  const gastosOrdenados = 
    orden === "asc" ?
      [...gastosFiltrados].sort((a,b) => a.importe - b.importe)
      : orden === "desc" ?
      [...gastosFiltrados].sort((a,b) => b.importe - a.importe)
      : [...gastosFiltrados];

  function eliminarGastos() {
    const gastosList = []
    setGastos(gastosList);
  }

  function eliminarGasto(id){
    const gastosList = gastos.filter(g => g.id !== id)
    setGastos(gastosList)
  }

  return (
    <main>
      <h1>Gestor de Gastos</h1>

      <h2>
        Total:{" "}
        {total.toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN",
        })}
      </h2>

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

        <button type="submit">Agregar gasto</button>
      </form>

      <h2>Mis gastos</h2>
      <label>
        Filtro Gasto
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={limite}
          onChange={(event) =>
            setLimite(event.target.value === "" ? "" : Number(event.target.value))
          }
          placeholder="Ej. 150"
        />
      </label>

      <label>
        Orden
        <select value={orden} onChange={(event) => setOrden(event.target.value)}>
          <option value="ninguno">Ninguno</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </label>

      {gastos.length === 0 ? (
        <p>Aún no has registrado gastos.</p>
      ) : (
        <ul>
          <p>Gastos Registrados: {gastosCount}</p>
          {gastosOrdenados.map((gasto) => (
            <li key={gasto.id}>
              {gasto.descripcion} —{" "}
              {gasto.importe.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
              <button onClick={() => eliminarGasto(gasto.id)}>Eliminar</button>
            </li>
          ))}
          <button onClick={eliminarGastos}>Eliminar Gastos</button>
        </ul> 
      )}
    </main>
  );
}

export default App;
