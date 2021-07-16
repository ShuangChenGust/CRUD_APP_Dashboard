import "./App.css";
import { React, useState, useEffect } from "react";

import Axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [OrderID, setOrderID] = useState("");
  const [CustomerID, setCustomerID] = useState("");

  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [shipDate, setShipDate] = useState("");
  const [description, setDescription] = useState("");

  const [orderData, setOrderData] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  //set the page number:
  const [page, setPage] = useState(5);

  //used to display read result
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response.data);
      setOrderData(response.data);
    });
  }, []);

  const submit = () => {
    console.log(`orderID Description`, OrderID, description);
    Axios.post("http://localhost:3001/api/insert", {
      OrderID: OrderID,
      CustomerID: CustomerID,
      productID: productID,
      productName: productName,
      shipDate: shipDate,
      description: description,
    }).then(() => {
      // alert("success for insertation");
      setOrderData([
        ...orderData,
        {
          ORDER_ID: OrderID,
          CUSTOMER_ID: CustomerID,
          PRODUCT_ID: productID,
          PRODUCT_NAME: productName,
          SHIP_DATE: shipDate,
          description: description,
        },
      ]);
    });
  };

  const delteData = (deleteID) => {
    Axios.delete(`http://localhost:3001/api/delete/${deleteID}`);
  };

  const updateDescription = (OrderID) => {
    Axios.put("http://localhost:3001/api/update", {
      OrderID: OrderID,
      description: newDescription,
    });
    setNewDescription("");
  };

  const loadMore = () => {
    setPage((page) => page + 5);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Acme Filter Products DB Management Tool </h1>
      </header>
      <div>
        {" "}
        <Container>
          <Row>
            <Col>
              <div className="insertContainer">
                <h1>Insert a new data into databse</h1>
                <div className="form">
                  <label>Order ID</label>
                  <input
                    type="text"
                    name="ORDER_ID"
                    onChange={(e) => {
                      setOrderID(e.target.value);
                    }}
                  ></input>
                  <label>Customer ID</label>
                  <input
                    type="text"
                    name="CUSTOMER_ID"
                    onChange={(e) => {
                      setCustomerID(e.target.value);
                    }}
                  ></input>

                  <label>Product ID</label>
                  <input
                    type="text"
                    name="Product_ID"
                    onChange={(e) => {
                      setProductID(e.target.value);
                    }}
                  ></input>

                  <label>Product Name</label>
                  <input
                    type="text"
                    name="Product_Name"
                    onChange={(e) => {
                      setProductName(e.target.value);
                    }}
                  ></input>

                  <label>Ship Date</label>
                  <input
                    type="text"
                    name="Ship_Date"
                    onChange={(e) => {
                      setShipDate(e.target.value);
                    }}
                  ></input>

                  <label>Description</label>
                  <input
                    type="text"
                    name="Description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></input>
                  <button onClick={submit}>Insert</button>
                </div>
              </div>
            </Col>

            <Col>
              <div className="data_list">
                <h1>Update/ Delete in Database</h1>
                {orderData.slice(0, page).map((val) => {
                  return (
                    <div>
                      <li key={val.ORDER_ID}>
                        OrderId: {val.ORDER_ID}{" "}
                        <button
                          style={{ backgroundColor: "red" }}
                          onClick={() => {
                            delteData(val.ORDER_ID);
                          }}
                        >
                          Delete
                        </button>
                        <br></br> Product description:
                        <br></br>
                        {val.DESCRIPTION}
                        <br></br>
                      </li>
                      <input
                        type="text"
                        id="updateInput"
                        placeholder="-- change description here --"
                        onChange={(e) => {
                          setNewDescription(e.target.value);
                        }}
                      ></input>
                      <button
                        onClick={() => {
                          {
                            updateDescription(val.ORDER_ID);
                          }
                          alert("The description has been updated");
                          window.location.reload();
                        }}
                      >
                        Update
                      </button>
                    </div>
                  );
                })}
                <button
                  onClick={loadMore}
                  style={{ backgroundColor: "lightblue" }}
                  className="btn-grad"
                  id="loadmore"
                >
                  Load More
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
