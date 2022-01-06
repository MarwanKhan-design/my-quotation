import moment from "moment";
import React from "react";
import { Fragment } from "react";

const QuotationForm = ({
  createQuotation,
  handlePriceChange,
  data: formData,
  loading,
}) => {
  const findPriceValue = (p) => {
    const price = formData.myBids.find((b) => b.product === p.product._id);
    if (price !== undefined) {
      return price.price;
    } else {
      return;
    }
  };

  return (
    <div>
      <form autoComplete="off">
        {formData._id && (
          <div className="row mt-5">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header fw-bold fs-4 ">
                Marwan EnterPrices
              </div>
              <div className="card-body">
                <div className="col-6">
                  {formData.products.map((p) => (
                    <Fragment key={p._id}>
                      <div className="form-group">
                        <label htmlFor={p.name}>{p.product.name}</label>
                        <input
                          type="number"
                          id={p.name}
                          value={findPriceValue(p)}
                          className="form-control"
                          onChange={(e) => handlePriceChange(p, e.target.value)}
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <button
          className="btn btn-primary mt-3"
          onClick={(e) => createQuotation(e)}
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <> {formData._id ? "Update" : "Create"} </>
          )}
        </button>
      </form>
    </div>
  );
};

export default QuotationForm;
