import React, { useEffect, useState } from "react";

export default function KardexView() {
  const apiURL = import.meta.env.VITE_API;
  const [products, setProducts] = useState([]);
  const [kardexData, setKardexData] = useState([]);
  const [newKardex, setNewKardex] = useState({
    kardex_description: "",
    kardex_type: "",
    kardex_products: [{ prod_id: "", pro_kar_amount: "" }],
  });

  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    getKardex();
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await fetch(apiURL + "/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json(); // O response.json() si el backend devuelve JSON
        throw new Error(errorData.message || `Failed to fectch products`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function getKardex() {
    try {
      const response = await fetch(apiURL + "/kardex", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json(); // O response.json() si el backend devuelve JSON
        throw new Error(errorData.message || `Failed to fectch kardex`);
      }

      const data = await response.json();
      setKardexData(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function createKardex() {
    try {
      // Convertir prod_id y pro_kar_amount a números
      const formattedKardex = {
        ...newKardex,
        kardex_products: newKardex.kardex_products.map((product) => ({
          ...product,
          prod_id: parseInt(product.prod_id, 10), // Convertir a número
          pro_kar_amount: parseInt(product.pro_kar_amount, 10), // Convertir a número
        })),
      };

      const response = await fetch(apiURL + "/kardex", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedKardex),
      });

      if (!response.ok) {
        const errorData = await response.json(); // O response.json() si el backend devuelve JSON
        throw new Error(errorData.message || `Failed to create kardex`);
      }

      // Refresh the list after creating a new kardex
      getKardex();
      setNewKardex({
        kardex_description: "",
        kardex_type: "",
        kardex_products: [{ prod_id: "", pro_kar_amount: "" }],
      });
      setErrorMessage(""); // Resetea el mensaje de error
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === "kardex_type" ? value.toUpperCase() : value;

    setNewKardex((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...newKardex.kardex_products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    setNewKardex((prev) => ({ ...prev, kardex_products: updatedProducts }));
  };

  const addProduct = () => {
    setNewKardex((prev) => ({
      ...prev,
      kardex_products: [
        ...prev.kardex_products,
        { prod_id: "", pro_kar_amount: "" },
      ],
    }));
  };

  const removeProduct = (index) => {
    const updatedProducts = newKardex.kardex_products.filter(
      (_, i) => i !== index
    );
    setNewKardex((prev) => ({ ...prev, kardex_products: updatedProducts }));
  };

  return (
    <div className="container">
      <br />
      <main>
        <h3>Create Kardex</h3>
      </main>
      <br />
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {/* Mostrar el mensaje de error */}

      {products && products.length > 0 ? (
        <>
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            type="text"
            id="description"
            className="form-control mb-3"
            name="kardex_description"
            placeholder="Descripción"
            value={newKardex.kardex_description}
            onChange={handleChange}
          />
          <label htmlFor="type" className="form-label">
            type:
          </label>
          <input
            type="text"
            id="type"
            className="form-control mb-3"
            name="kardex_type"
            placeholder="Tipo (ENTRADA/SALIDA)"
            value={newKardex.kardex_type}
            onChange={handleChange}
          />
          {newKardex.kardex_products.map((product, index) => (
            <div key={index} className="mb-3">
              <div className="input-group mb-3">
                <div className="form-group me-3">
                  <label htmlFor={`prod_id_${index}`} className="form-label">
                    Select the product:
                  </label>
                  <select
                    className="form-select"
                    id={`prod_id_${index}`}
                    name="prod_id"
                    value={product.prod_id}
                    onChange={(e) => handleProductChange(index, e)}
                  >
                    <option value="">Seleccione un producto</option>
                    {products.map((prod) => (
                      <option key={prod.prod_id} value={prod.prod_id}>
                        {prod.prod_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group me-3">
                  <label htmlFor={`amount_${index}`} className="form-label">
                    Amount:
                  </label>
                  <input
                    type="number"
                    id={`amount_${index}`}
                    className="form-control"
                    name="pro_kar_amount"
                    placeholder="Cantidad"
                    value={product.pro_kar_amount}
                    onChange={(e) => handleProductChange(index, e)}
                  />
                </div>

                <button
                  className="btn btn-danger align-self-end"
                  onClick={() => removeProduct(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <button className="btn btn-primary" onClick={addProduct}>
            Agregar Producto
          </button>
          <button className="btn btn-success mx-2" onClick={createKardex}>
            Crear Kardex
          </button>
        </>
      ) : (
        <div className="alert alert-warning">
          No hay productos disponibles para crear Kardex.
        </div>
      )}

      <br />
      <br />
      {kardexData && kardexData.length > 0 ? (
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Kardex ID</th>
              <th>Descripción</th>
              <th>Tipo</th>
              <th>Fecha de creación</th>
              <th>Producto</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {kardexData.map((kardex) => (
              <React.Fragment key={kardex.kardex_id}>
                <tr>
                  <td rowSpan={kardex.kardex_products.length}>
                    {kardex.kardex_id}
                  </td>
                  <td rowSpan={kardex.kardex_products.length}>
                    {kardex.kardex_description}
                  </td>
                  <td rowSpan={kardex.kardex_products.length}>
                    {kardex.kardex_type}
                  </td>
                  <td rowSpan={kardex.kardex_products.length}>
                    {new Date(kardex.kardex_created_at).toLocaleString()}
                  </td>
                  <td>{kardex.kardex_products[0].prod_name}</td>
                  <td>{kardex.kardex_products[0].pro_kar_amount}</td>
                </tr>
                {kardex.kardex_products.slice(1).map((product) => (
                  <tr key={product.prod_id}>
                    <td>{product.prod_name}</td>
                    <td>{product.pro_kar_amount}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}
