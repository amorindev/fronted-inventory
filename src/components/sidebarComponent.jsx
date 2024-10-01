import { BoxSeam, Building, People, UiChecks } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import "./../style.css";

export default function SidebarComponent({ setActivePage, activePage }) {
  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <i className="bi bi-bootstrap-fill me-3 fs-4"></i>
        <span className="brand-name fs-4">Inventario</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <a
          className={`list-group-item py-2 my-1 ${activePage === "Organizacion" ? "active" : ""}`}
          onClick={() => setActivePage("Organizacion")}
        >
          <Building className="me-2" />
          <span>Organizacion</span>
        </a>

        <a
          className={`list-group-item py-2 my-1 ${activePage === "Productos" ? "active" : ""}`}
          onClick={() => setActivePage("Productos")}
        >
          <BoxSeam className="me-2" />
          <span>Productos</span>
        </a>

        <a
          className={`list-group-item py-2 my-1 ${activePage === "Kardex" ? "active" : ""}`}
          onClick={() => setActivePage("Kardex")}
        >
          <UiChecks className="me-2" />
          <span>Kardex</span>
        </a>

        <a
          className={`list-group-item py-2 my-1 ${activePage === "Clientes" ? "active" : ""}`}
          onClick={() => setActivePage("Clientes")}
        >
          <People className="me-2" />
          <span>Clientes</span>
        </a>

        <a
          className={`list-group-item py-2 my-1 ${activePage === "Proveedores" ? "active" : ""}`}
          onClick={() => setActivePage("Proveedores")}
        >
          <People className="me-2" />
          <span>Proveedores</span>
        </a>
      </div>
    </div>
  );
}

// Define las validaciones de los props
SidebarComponent.propTypes = {
  setActivePage: PropTypes.func.isRequired,
  activePage: PropTypes.string.isRequired, // Asegura que activePage es un string y es requerido
};
