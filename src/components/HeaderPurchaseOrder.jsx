import React from "react";
import moment from "moment";

const HeaderPurchaseOrder = () => {
  const date = new Date();
  return (
    <div>
      <div className="row">
        <div className="col-4">
          <table>
            <tbody>
              <tr>
                <td>
                  Ref. No. : QT/2022/{date.getMonth() + 1}
                  {date.getDate()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-4"></div>
        <div className="col-4">
          <table>
            <tbody>
              <tr>
                <td>Date: {moment(new Date()).format("DD/MM/YYYY")}</td>
              </tr>
              <tr>
                <td>
                  NTN: <span className="fw-bold">4342876-2</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HeaderPurchaseOrder;
