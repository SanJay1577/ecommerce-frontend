import React, { useEffect, useState } from "react";
import { GoBack } from "./Addcategory";
import { isAccesed } from "../authentication/auth";
import Base from "../core/Base";
import { getAllOrders, updateOrder } from "./helper/adminApiRequest";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [stock, setStock] = useState("");
  const { user, token } = isAccesed();

  useEffect(() => {
    getAllOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  }, [token, user._id, orders]);

  const handleEdit = (event) => {
    event.preventDefault();
    updateOrder(user._id, token, orderId, stock).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        const index = orders.findIndex((order) => order._id === orderId);
        let editedOrders = [...orders];
        editedOrders[index] = data;
        setOrders(editedOrders);
      }
    });
  };

  return (
    <div>
      <Base title="Manage Orders" description="Manage your orders here">
        <div className="row user-box">
          <div className="col-12">
            <h1 className="text-info text-center">All Orders</h1>
            <table className="table">
              <thead className="text-warning">
                <tr>
                  <th>User</th>
                  <th>Product</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>
              {orders && (
                <tbody>
                  {orders &&
                    orders?.map((order, index) => (
                      <tr key={index} className="text-success">
                        <td>{order?.user?.name}</td>
                        <td>{order?.name}</td>
                        <td>{order?.status}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-toggle="modal"
                            data-target=".bd-example-modal-sm"
                            onClick={() => setOrderId(order?._id)}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>

        <GoBack />

        <div
          className="modal fade bd-example-modal-sm"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-sm">
            <div className="modal-content text-dark user-box">
              <div className="modal-header">
                <h5>Update Your Order Status</h5>
              </div>

              <div className="modal-body">
                <select
                  className="custom-select"
                  onChange={(event) => setStock(event.target.value)}
                >
                  <option defaultValue="Ordered">Ordered</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Deliverd">Deliverd</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEdit}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
};

export default ManageOrders;
