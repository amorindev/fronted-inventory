import PropTypes from "prop-types";

export default function SidebarItem({ label, icon: Icon, isActive, onClick }) {
  return (
    <a
      className={`list-group-item py-2 my-1 ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <Icon className="me-2" />
      <span>{label}</span>
    </a>
  );
}

SidebarItem.propTypes = {
  label: PropTypes.string.isRequired, // Texto a mostrar
  icon: PropTypes.elementType.isRequired, // Icono a mostrar, usando la prop "icon"
  isActive: PropTypes.bool.isRequired, // Para marcar si es la página activa
  onClick: PropTypes.func.isRequired, // Función a ejecutar cuando se clickea
};
