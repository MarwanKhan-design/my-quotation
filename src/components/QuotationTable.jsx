import moment from "moment";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const QuotationTable = ({ quotations, getUpdateData }) => {
  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>Products</td>
            <td>Last Date</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {quotations &&
            quotations.map((quotation) => (
              <Fragment key={quotation._id}>
                <tr>
                  <td>
                    {quotation.products.map((product) => (
                      <>{product.product.name} || </>
                    ))}
                  </td>
                  <td>{moment(quotation.lastDate).format("DD/MM/YYYY")}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => getUpdateData(quotation)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <Link to={`/purchase/order/${quotation._id}`}>
                      Purchase Order
                    </Link>
                  </td>
                </tr>
              </Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuotationTable;
