import { useState } from "react";

import SidebarComponent from "./sidebarComponent";
import KardexView from "./kardexView";
import ClientView from "./clientView";
import ProviderView from "./providerView";
import OrganizationView from "./organizationView";
import ProductView from "./productView";

export default function DashboardPage() {
  const [activePage, setActivePage] = useState("Organizacion"); // Página inicial

  const renderPage = () => {
    switch (activePage) {
      case "Productos":
        return <ProductView />;
      case "Kardex":
        return <KardexView />;
      case "Clientes":
        return <ClientView />;
      case "Proveedores":
        return <ProviderView />;
      case "Organizacion":
        return <OrganizationView />;
      default:
        return <ProviderView />;
    }
  };

  return (
    <div className="container-fluid min-vh-100">
      <div className="row">
        <div className="col-2 vh-100">
          <SidebarComponent
            setActivePage={setActivePage}
            activePage={activePage}
          ></SidebarComponent>
        </div>
        <div className="col-10  ">{renderPage()}</div>
      </div>
    </div>
  );
}
