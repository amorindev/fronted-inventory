import { useEffect, useState } from "react";

export default function OrganizationView() {
  const apiURL = import.meta.env.VITE_API;
  const [company, setCompany] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const companyId = 1; // Cambia esto al ID que desees obtener
    getCompany(companyId);
  }, []);

  async function getCompany(companyId) {
    try {
      const response = await fetch(`${apiURL}/companies/${companyId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch company`);
      }

      const data = await response.json();

      setCompany(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Organización</h3> {/* Título en la parte superior */}
      <div className="d-flex justify-content-center">
        <div className="row">
          <div className="col-md-40">
            {" "}
            {/* Columna para la información de la empresa */}
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            {company ? (
              <div className="card">
                <div className="card-body text-center">
                  {" "}
                  {/* Centrado solo en el contenido de la tarjeta */}
                  <h4 className="card-title">{company.com_name}</h4>
                  <div className="d-flex justify-content-center my-4">
                    {" "}
                    {/* Contenedor para centrar la imagen */}
                    <img
                      src="/inventory_img.jpg" // La ruta de la imagen
                      alt="Inventario"
                      className="img-fluid" // Añade clases de Bootstrap para que sea responsiva
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }} // Ajusta el tamaño y mantiene proporciones
                    />
                  </div>
                  <p className="card-text">
                    <strong>Sitio web: </strong>
                    <a
                      href={company.com_website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.com_website}
                    </a>
                  </p>
                  <p className="card-text">
                    <strong>Dirección:</strong> {company.com_address}
                  </p>
                  <p className="card-text">
                    <strong>Teléfono:</strong> {company.com_phone}
                  </p>
                  <p className="card-text">
                    <strong>Email:</strong> {company.com_email}
                  </p>
                </div>
              </div>
            ) : (
              <p>Cargando información de la organización...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
