import moment from "moment";
import React, { useState, Component, useRef, useEffect } from "react";
import HeaderPurchaseOrder from "../components/HeaderPurchaseOrder";
import ReactToPrint from "react-to-print";

const Invoice = ({ findTotalPrice, quotation, findQuantity }) => {
  const [taxPercent, setTaxPercent] = useState(17);
  const printRef = useRef();
  const pageStyle = `@page { size: portrait }`;
  return (
    <>
      <center>
        <ReactToPrint
          trigger={() => (
            <button className="btn btn-success mt-4">Print Invoice</button>
          )}
          pageStyle={pageStyle}
          content={() => printRef.current}
        />
        <div className="form-group">
          <label htmlFor="taxPercent">Tax Percent</label>
          <input
            type="number"
            id="taxPercent"
            value={taxPercent}
            onChange={(e) => setTaxPercent(e.target.value)}
            className="form-control w-25"
          />
        </div>
      </center>
      <InvoiceToPrint
        ref={printRef}
        companyBids={quotation.myBids}
        findQuantity={findQuantity}
        findTotalPrice={findTotalPrice}
        quotation={quotation}
        taxPercent={taxPercent}
      />
    </>
  );
};

export class InvoiceToPrint extends Component {
  render() {
    const { companyBids, findQuantity, findTotalPrice, quotation, taxPercent } =
      this.props;
    const total = (findTotalPrice()[1] * 100) / (100 + parseInt(taxPercent));
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
                  <td>{Math.round(bid.price)}</td>
                  <td>{quantity}</td>
                  <td>{Math.round(bid.price * parseInt(quantity))}</td>
                </tr>
              );
            })}

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-end fw-bold fs-6">Total</td>
              <td className="text-end fw-bold fs-6">{Math.round(total)}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-end fw-bold fs-6">
                Sale Tax ({taxPercent}%)
              </td>
              <td className="text-end fw-bold fs-6">
                {Math.round((total * taxPercent) / 100)}
              </td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-end fw-bold fs-6">Grand Total</td>
              <td className="text-end fw-bold fs-6">
                <span className="text-start">PKR </span>
                {Math.round(findTotalPrice()[1])}
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

export default Invoice;
