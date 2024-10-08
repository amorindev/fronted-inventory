import { useEffect, useState } from "react";

export default function ProviderView() {
  const apiURL = import.meta.env.VITE_API;
  const [providers, setProviders] = useState([]);
  const [newProvider, setNewProvider] = useState({
    prov_name: "",
    prov_address: "",
    prov_email: "",
    prov_phone: "",
    com_id: 1,
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProviders();
  }, []);

  async function fetchProviders() {
    try {
      const response = await fetch(apiURL + "/providers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch providers");
      }

      const data = await response.json();
      setProviders(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function createProvider() {
    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProvider),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create provider");
      }

      setNewProvider({
        prov_name: "",
        prov_address: "",
        prov_email: "",
        prov_phone: "",
        com_id: 1,
      }); // Resetea los campos
      setErrorMessage("");
      fetchProviders(); // Refresca la lista de proveedores
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProvider((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <br />
      <h3>Listado de Proveedores</h3>
      <br />
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Formulario para crear proveedor */}
      <div className="mb-3">
        <input
          type="text"
          name="prov_name"
          className="form-control"
          placeholder="Nombre del proveedor"
          value={newProvider.prov_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="prov_address"
          className="form-control mt-2"
          placeholder="Dirección del proveedor"
          value={newProvider.prov_address}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="prov_email"
          className="form-control mt-2"
          placeholder="Email del proveedor"
          value={newProvider.prov_email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="prov_phone"
          className="form-control mt-2"
          placeholder="Teléfono del proveedor"
          value={newProvider.prov_phone}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary mt-2" onClick={createProvider}>
          Crear Proveedor
        </button>
      </div>

      {/* Tabla de proveedores */}
      {providers.length > 0 ? (
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Email</th>
              <th>Teléfono</th>
              {/* <th>Compañía ID</th> */}
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider.prov_id}>
                <td>{provider.prov_id}</td>
                <td>{provider.prov_name}</td>
                <td>{provider.prov_address}</td>
                <td>{provider.prov_email}</td>
                <td>{provider.prov_phone}</td>
                {/* <td>{provider.com_id}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Cargando proveedores...</p>
      )}
    </div>
  );
}
