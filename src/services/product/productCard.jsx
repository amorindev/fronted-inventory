import { Card, Button, Form, Dropdown } from "react-bootstrap";
import { useState } from "react";
import PropTypes from "prop-types";

export default function ProductCard({
  productId,
  productName,
  productDesc,
  productStk,
  productPrice,
  productDiscount,
  productCatId,
  //productCatName,
  categories,
  getProducts,
}) {
  const apiURL = import.meta.env.VITE_API;
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(productName);
  const [description, setDescription] = useState(productDesc);
  const [stock, setStock] = useState(productStk);
  const [selectCategory, setSelectCategory] = useState(productCatId);
  //const [selectCategoryName, setSelectCategoryName] = useState(productCatName);
  const [selectCategoryName, setSelectCategoryName] =
    useState("Select category");
  const [price, setPrice] = useState(productPrice);
  const [discount, setDiscount] = useState(productDiscount);

  async function updateProduct() {
    try {
      const response = await fetch(apiURL + `/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prod_name: name,
          prod_desc: description,
          prod_discount: parseInt(discount),
          prod_price: parseFloat(price),
          prod_stk: parseInt(stock),
          cat_id: selectCategory,
        }), // Convertir el objeto actualizado a JSON
      });

      if (!response.ok) {
        throw new Error("Select category");
      }

      //const data = await response.json();
      console.log("llegoooooooooooooooooo1");

      setEditing(false);
      getProducts();
      console.log("llegoooooooooooooooooo2");
    } catch (error) {
      alert(error.message);
    }
  }

  async function deleteProduct() {
    try {
      const response = await fetch(apiURL + `/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error delete category");
      }
      getProducts();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        {!editing ? (
          <>
            <Card.Title>{productName}</Card.Title>
            <Card.Text>Description: {productDesc}</Card.Text>
            <Card.Text>Stock: {productStk}</Card.Text>
            <Card.Text>Discount: {productDiscount}</Card.Text>
            {/* <Card.Text>Category: {productCatName}</Card.Text> */}
            <Card.Text>Price: {productPrice}</Card.Text>

            <Button variant="danger" onClick={() => deleteProduct()}>
              Delete Product
            </Button>

            <Button
              className="px-3"
              variant="secondary"
              onClick={() => setEditing(true)}
            >
              Edit Product
            </Button>
          </>
        ) : (
          <>
            <h4>Editing Product</h4>
            <br />
            <Button size="sm" onClick={() => setEditing(false)}>
              Go back
            </Button>
            <br />

            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              defaultValue={productName}
              onChange={(e) => setName(e.target.value)}
            />

            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              id="description"
              defaultValue={productDesc}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Form.Label>Product Stock</Form.Label>
            <Form.Control
              type="number"
              id="stock"
              defaultValue={productStk}
              onChange={(e) => setStock(e.target.value)}
            />

            <Form.Label>Product Discount %:</Form.Label>
            <Form.Control
              type="number"
              id="discount"
              defaultValue={productDiscount}
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
              defaultValue={productPrice}
              onChange={(e) => setPrice(e.target.value)}
            />

            <br />
            <br />

            <Button size="sm" onClick={() => updateProduct()}>
              Update
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  productId: PropTypes.number,
  productName: PropTypes.string,
  productDesc: PropTypes.string,
  productStk: PropTypes.number,
  productPrice: PropTypes.number,
  productDiscount: PropTypes.number,
  productCatId: PropTypes.number,
  productCatName: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      cat_id: PropTypes.number,
      cat_name: PropTypes.string,
    })
  ),
  getProducts: PropTypes.func.isRequired,
};
