import { useState, useEffect } from "react";

import { Container, Form, Row, Col, Button, Dropdown } from "react-bootstrap";

import ProductCard from "./productCard";

export default function ProductView() {
  const apiURL = import.meta.env.VITE_API;
  // get registros
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [selectCategory, setSelectCategory] = useState(0);
  const [selectCategoryName, setSelectCategoryName] =
    useState("Select category");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    getProducts();
    getCategories();
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
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      console.log(data);
      if (data == null) {
        alert("Lista de productos nulo");
      }

      setProducts(data);
    } catch (error) {
      alert(error.message);
    }
  }

  async function getCategories() {
    try {
      //http://localhost:7000/v1/categories
      const response = await fetch(apiURL + "/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      console.log(data);
      if (data == null) {
        alert("es nulo");
      }
      setCategories(data); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      alert(error.message); // Maneja el error
    }
  }

  async function createProduct() {
    console.log("test");
    console.log({
      prod_name: name.toUpperCase(),
      prod_desc: description,
      prod_discount: parseInt(discount),
      prod_price: parseFloat(price),
      prod_stk: parseInt(stock),
      cat_id: selectCategory,
    });
    try {
      const response = await fetch(apiURL + `/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prod_name: name.toUpperCase(),
          prod_desc: description,
          prod_discount: parseInt(discount),
          prod_price: parseFloat(price),
          prod_stk: parseInt(stock),
          cat_id: selectCategory,
        }), // Convertir el objeto actualizado a JSON
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(
          `POST PRODUCT ERROR: ${errorResponse} ${response.statusText}`
        );
      }
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Container>
      <Row>
        <Col xs={5} md={10}>
          <br />
          <h3>Create product</h3>

          <br />

          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />

          <Form.Label>Product Description</Form.Label>
          <Form.Control
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Form.Label>Product Stock</Form.Label>
          <Form.Control
            type="number"
            id="stock"
            onChange={(e) => setStock(e.target.value)}
          />

          <Form.Label>Product Discount %:</Form.Label>
          <Form.Control
            type="number"
            id="discount"
            onChange={(e) => setDiscount(e.target.value)}
          />
          <br />

          <Dropdown>
            <Dropdown.Toggle variant="success">
              {selectCategoryName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((category) => (
                <Dropdown.Item
                  key={category.cat_id}
                  onClick={() => {
                    setSelectCategory(category.cat_id);
                    setSelectCategoryName(category.cat_name);
                  }}
                >
                  {category.cat_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <br />

          <Form.Label>Product Price:</Form.Label>
          <Form.Control
            type="number"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
          />

          <br />
          <br />

          <Button onClick={() => createProduct()}>Create</Button>
        </Col>
      </Row>

      <br />
      <br />

      <h3>Current Products</h3>
      <br />
      <Row sm={1} md={2} lg={3} className="g-1">
        {products.map((product) => (
          <Col key={product.prod_id}>
            <ProductCard
              productId={product.prod_id}
              productName={product.prod_name}
              productDesc={product.prod_desc}
              productStk={product.prod_stk}
              productPrice={product.prod_price}
              productDiscount={product.prod_discount}
              productCatId={product.cat_id}
              //productCatName={product.cat_name}
              categories={categories}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
