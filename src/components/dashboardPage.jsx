import { useState } from "react";

import SidebarComponent from "./sidebarComponent";

import KardexView from "./../services/kardex/kardexView";
import CategoryView from "./../services/category/categoryView";
import ProviderView from "./../services/provider/providerView";
import OrganizationView from "./../services/organization/organizationView";
import ProductView from "./../services/product/productView";

export default function DashboardPage() {
  const [activePage, setActivePage] = useState("Organizacion"); // Página inicial

  const renderPage = () => {
    switch (activePage) {
      case "Productos":
        return <ProductView />;
      case "Kardex":
        return <KardexView />;
      case "Categorias":
        return <CategoryView />;
      case "Proveedores":
        return <ProviderView />;
      case "Organizacion":
        return <OrganizationView />;
      default:
        return <OrganizationView />;
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
