function ResumenCategorias (
  {resumenCategorias}
){
  return(
    <div>
      <ul>
        {resumenCategorias.map(resumen => (
          <li className="gasto-item" key={resumen.categoria}>
            <p>Gastos de {resumen.categoria}: {resumen.cantidad}</p>
            <p>Total: {resumen.total.toLocaleString("es-MX", { style: "currency", currency: "MXN" })}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ResumenCategorias;