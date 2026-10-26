
import { useState, useEffect } from "react";
import ListaGastos from "./components/ListaGastos";
import ResumenCategorias from "./components/ResumenCategorias";
import FormularioGasto from "./components/FormularioGasto";

function App() {
  const [descripcion, setDescripcion] = useState("");
  const [importe, setImporte] = useState("");
  const [gastos, setGastos] = useState(() => {
    const getGastos = localStorage.getItem("gastos");
    if (getGastos == null) {
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

  const [gastoEditando, setGastoEditando] = useState(null);

  const [limitePresupuesto, setLimitePresupuesto] = useState(() => {
    const getLimitePresupuesto = localStorage.getItem("limitePresupuesto");
    if (getLimitePresupuesto == null){
      return 5000
    }
    try {
      return Number(JSON.parse(getLimitePresupuesto))
    } catch (error) {
      console.error("Hubo un error con el parseo:", error)
      return 5000
    }
  });

  const categorias = [
    "comida", "transporte", "entretenimiento"
  ]

  const obtenerGastosPorCategoria = (categoria) => {
    return gastos.filter(g => g.categoria === categoria);
  };

  const resumenCategorias = categorias.map(categoria => {
    return {
      categoria: categoria,
      cantidad: obtenerGastosPorCategoria(categoria).length,
      total: obtenerGastosPorCategoria(categoria).reduce((suma, gasto) => suma + gasto.importe, 0)
    };
  });

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos))
  }, [gastos]);

  useEffect(() => {
    localStorage.setItem("limitePresupuesto", String(limitePresupuesto))
  }, [limitePresupuesto]);

  function agregarGasto(event) {
    event.preventDefault();
    if (!descripcion.trim() || Number(importe) <= 0) {
      return;
    }

    const datosGasto = {
      descripcion: descripcion.trim(),
      importe: Number(importe),
      categoria: categoria
    }

    if (gastoEditando) {
      const gastosActualizados = gastos.map(g => {
        if (g.id === gastoEditando.id) {
          return {
            id: g.id,
            ...datosGasto
          };
        }
        return g;
      });

      setGastos(gastosActualizados);
      setGastoEditando(null);

    } else {

      const nuevoGasto = {
        id: crypto.randomUUID(),
        ...datosGasto
      };

      const gastosList = [...gastos, nuevoGasto]
      setGastos(gastosList);
    }

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
      [...gastosFiltrados].sort((a, b) => a.importe - b.importe)
      : orden === "desc" ?
        [...gastosFiltrados].sort((a, b) => b.importe - a.importe)
        : [...gastosFiltrados];

  function eliminarGastos() {
    const gastosList = []
    setGastos(gastosList);
  }

  function eliminarGasto(id) {
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
      <label>
        Presupuesto:
        <input 
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Ej. 150"
          value={limitePresupuesto}
          onChange={(event) => {
            setLimitePresupuesto(event.target.value == "" ? "" : Number(event.target.value))}
          }
          />
      </label>
      {limitePresupuesto > 0 && 
        total > limitePresupuesto && (
          <p>
            Superaste el límite de {limitePresupuesto.toLocaleString("es-MX", {
              style: "currency",
              currency: "MXN"
            })}!
          </p>
        )
      }

      <ResumenCategorias resumenCategorias={resumenCategorias} />

      <FormularioGasto
        descripcion={descripcion}
        setDescripcion={setDescripcion}
        importe={importe}
        setImporte={setImporte}
        categoria={categoria}
        setCategoria={setCategoria}
        gastoEditando={gastoEditando}
        agregarGasto={agregarGasto} />

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

      <ListaGastos
        gastos={gastos}
        gastosOrdenados={gastosOrdenados}
        gastosCount={gastosCount}
        eliminarGasto={eliminarGasto}
        eliminarGastos={eliminarGastos}
        gastoEditando={gastoEditando}
        setGastoEditando={setGastoEditando}
        setDescripcion={setDescripcion}
        setImporte={setImporte}
        setCategoria={setCategoria} />
    </main>
  );
}

export default App;
