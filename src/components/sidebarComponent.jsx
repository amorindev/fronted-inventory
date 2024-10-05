import {
  Boxes,
  BoxSeam,
  Building,
  People,
  UiChecks,
} from "react-bootstrap-icons";
import PropTypes from "prop-types";
import "./../style.css";
import SidebarItem from "./sidebarItem";

export default function SidebarComponent({ setActivePage, activePage }) {
  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <i className="bi bi-bootstrap-fill me-3 fs-4"></i>
        <span className="brand-name fs-4">Inventario</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <SidebarItem
          label="Organización"
          icon={Building}
          isActive={activePage === "Organizacion"}
          onClick={() => setActivePage("Organizacion")}
        />

        <SidebarItem
          label="Categorias"
          icon={Boxes}
          isActive={activePage === "Categorias"}
          onClick={() => setActivePage("Categorias")}
        />

        <SidebarItem
          label="Productos"
          icon={BoxSeam}
          isActive={activePage === "Productos"}
          onClick={() => setActivePage("Productos")}
        />

        <SidebarItem
          label="Kardex"
          icon={UiChecks}
          isActive={activePage === "Kardex"}
          onClick={() => setActivePage("Kardex")}
        />

        <SidebarItem
          label="Proveedores"
          icon={People}
          isActive={activePage === "Proveedores"}
          onClick={() => setActivePage("Proveedores")}
        />
      </div>
    </div>
  );
}

// Define las validaciones de los props
SidebarComponent.propTypes = {
  setActivePage: PropTypes.func.isRequired,
  activePage: PropTypes.string.isRequired, // Asegura que activePage es un string y es requerido
};
