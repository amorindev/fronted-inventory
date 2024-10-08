import { useEffect, useState } from "react";

export default function CategoryView() {
  const apiURL = import.meta.env.VITE_API; // URL de la API
  const [newCategory, setNewCategory] = useState({ cat_name: "" });
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch(apiURL + "/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch categories");
      }

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function createCategory() {
    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create category");
      }

      setSuccessMessage("Categoría creada exitosamente");
      setNewCategory({ cat_name: "" }); // Resetea el campo
      fetchCategories(); // Refresca la lista de categorías
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const handleInputChange = (e) => {
    setNewCategory({ ...newCategory, cat_name: e.target.value });
  };

  return (
    <div className="container">
      <br />
      <h3>Listado de Categorías</h3>
      <br />
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {/* Formulario para crear categoría */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de la categoría"
          value={newCategory.cat_name}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary mt-2" onClick={createCategory}>
          Crear Categoría
        </button>
      </div>

      {/* Tabla de categorías */}
      {categories.length > 0 ? (
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.cat_id}>
                <td>{category.cat_id}</td>
                <td>{category.cat_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Cargando categorías...</p>
      )}
    </div>
  );
}
