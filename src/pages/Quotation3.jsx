import moment from "moment";
import React, { useState, Component, useRef, useEffect } from "react";
import HeaderPurchaseOrder from "../components/HeaderPurchaseOrder";
import ReactToPrint from "react-to-print";
import {
  getPaginatedQuotations,
  getQuotation,
} from "../services/quotationService";
import { useParams } from "react-router-dom";

const PurchaseOrder = ({ leastCompany }) => {
  const [quotation, setQuotation] = useState({
    products: [],
    _id: false,
    companies: [],
    bids: [],
    myBids: [],
    lastDate: new Date(),
    qtype: "normal",
    refNo: "PTV-P/PS/1110/21-22",
    from: "",
    demandDate: "",
    demandNumber: "",
  });
  const { id } = useParams();

  const findTotalPrice = () => {
    let price = { withQ: 0, withoutQ: 0 };
    quotation.myBids.map((bid) => {
      const product = quotation.products.find(
        (p) => p.product._id === bid.product._id
      );
      price.withQ += bid.price;
      price.withoutQ += bid.price * product.quantity;
    });
    return [price.withQ, price.withoutQ];
  };

  const loadAllQuotations = async () => {
    const quotations = await getQuotation(id);
    setQuotation(quotations.data);
  };
  useEffect(() => {
    loadAllQuotations();
  }, []);

  const findQuantity = (b) => {
    const result = quotation.products.find(
      (p) => p.product._id === b.product._id
    );
    if (result !== undefined) {
      return result.quantity;
    } else {
      return;
    }
  };

  const printRef = useRef();
  const pageStyle = `@page { size: portrait }`;
  return (
    <>
      <center>
        <ReactToPrint
          trigger={() => (
            <button className="btn btn-success mt-4">Print My Quotation</button>
          )}
          pageStyle={pageStyle}
          content={() => printRef.current}
        />
      </center>
      <PurchaseOrderToPrint
        ref={printRef}
        companyBids={quotation.myBids}
        findQuantity={findQuantity}
        findTotalPrice={findTotalPrice}
        quotation={quotation}
      />
    </>
  );
};

export class PurchaseOrderToPrint extends Component {
  render() {
    const { companyBids, findQuantity, findTotalPrice, quotation } = this.props;
    return (
      <div className="container text-start portrait invert">
        <HeaderPurchaseOrder />
        <p>Dear sir,</p>
        <p>
          Reference to your purchase enquiry for{" "}
          {quotation.products[0] && quotation.products[0].product.name},{" "}
          {quotation.products[1] && quotation.products[1].product.name + " etc"}{" "}
          following are our prices of the same products
        </p>
        <p className="fs-3 text-center fw-bold">QUOTATION</p>
        <table className="table table-bordered">
          <thead>
            <tr>
              <td>S. No.</td>
              <td>Description & Specifications of Materials</td>
              <td>Unit Price</td>
              <td>Qty</td>
              <td>TOTAL</td>
            </tr>
          </thead>
          <tbody>
            {companyBids.map((bid, i) => {
              const quantity = findQuantity(bid);
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{bid.product.name}</td>
                  <td>{bid.price}</td>
                  <td>{quantity}</td>
                  <td>{bid.price * parseInt(quantity)}</td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-end fw-bold fs-6">Grand Total</td>
              <td className="text-end fw-bold fs-6">
                <span className="text-start">PKR </span>
                {findTotalPrice()[1]}
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <p className="fw-bold">
          The Purchase Order is subjected to the following terms and conditions
        </p>
        <ul
          style={{ listStyle: "decimal", fontSize: "13px" }}
          className="fw-bold"
        >
          <li>
            The corporation reserves the right to cancel this order if the
            delivery cannot be made by <br /> the date as promised
          </li>
          <li>Goods must be properly insured and packed and</li>
          <li>All goods are subjected to inspection before final acceptance</li>
          <li>
            Please mention our purchase order No. and date on your invoice and
            send your
          </li>
          <li>invoice in duplicate. This is most important</li>
        </ul>
      </div>
    );
  }
}

export default PurchaseOrder;
