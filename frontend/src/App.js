import "./App.css";
import { React, useState, useEffect } from "react";

import Axios from "axios";

function App() {
  const [OrderID, setOrderID] = useState("");
  const [CustomerID, setCustomerID] = useState("");

  const [orderData, setOrderData] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  //used to display read result
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      //console.log(response.data);
      setOrderData(response.data);
    });
  }, []);

  const submit = () => {
    console.log(`orderID`, OrderID);
    Axios.post("http://localhost:3001/api/insert", {
      OrderID: OrderID,
      CustomerID: CustomerID,
    }).then(() => {
      // alert("success for insertation");
      setOrderData([
        ...orderData,
        { ORDER_ID: OrderID, CUSTOMER_ID: CustomerID },
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Acme Filter Products DB Management Tool </h1>
      </header>
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
        <button onClick={submit}>submit</button>
        <div className="data_list">
          {orderData.map((val) => {
            return (
              <div>
                <li key={val.ORDER_ID}>
                  OrderId: {val.ORDER_ID} CUSTOMERID:{val.CUSTOMER_ID}
                </li>
                <button
                  onClick={() => {
                    delteData(val.ORDER_ID);
                  }}
                >
                  Delete
                </button>
                <input
                  type="text"
                  onChange={(e) => {
                    setNewDescription(e.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    {
                      updateDescription(val.ORDER_ID);
                    }
                  }}
                >
                  Update
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
