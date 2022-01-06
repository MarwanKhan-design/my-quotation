import React, { Component } from "react";
import QuotationForm from "../components/QuotationForm";
import QuotationTable from "../components/QuotationTable";
import {
  getAllQuotations,
  getPaginatedQuotations,
  saveQuotation,
} from "../services/quotationService";

export class Quotation1 extends Component {
  state = {
    quotations: [],
    page: 1,
    limit: 6,
    data: {
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
    },
  };
  loadAllQuotations = async () => {
    const { page, limit } = this.state;
    const quotations = await getPaginatedQuotations(page, limit);
    this.setState({ quotations: quotations.data.results });
  };
  componentDidMount() {
    this.loadAllQuotations();
  }

  updateBid = async () => {
    const { products } = this.state.data;
    let myBids = [];
    for (let p = 0; p < products.length; p++) {
      myBids = [
        ...myBids,
        {
          product: products[p].product._id,
          price: 0,
        },
      ];
    }
    this.setState({ data: { ...this.state.data, myBids } });
  };
  getUpdateData = async (quotation) => {
    const data = this.state.quotations.find((q) => q._id === quotation._id);
    await this.setState({ data });
    // this.updateBid();
  };
  handlePriceChange = (product, price) => {
    const myBids = this.state.data.myBids;
    const bid = this.state.data.myBids.find(
      (b) => b.product === product.product._id
    );
    bid.price = parseInt(price);
    const index = myBids.findIndex((b) => b.product === product.product._id);
    myBids[index] = bid;
    this.setState({ data: { ...this.state.data, myBids } });
  };

  createQuotation = async (e) => {
    e.preventDefault();
    const data = this.state.data;
    for (let i = 0; i < data.products.length; i++) {
      data.products[i] = {
        product: data.products[i].product._id,
        quantity: data.products[i].quantity,
      };
    }
    for (let i = 0; i < data.companies.length; i++) {
      data.companies[i] = data.companies[i]._id;
    }

    let quotations = this.state.quotations;
    try {
      this.setState({ formLoading: true });

      const quotation = await saveQuotation(data);
      Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
      var date = new Date();

      if (this.state.data._id) {
        const pToUpdate = quotations.results.find(
          (p) => p._id === this.state.data._id
        );
        const index = quotations.results.findIndex((e) => e === pToUpdate);
        quotations.results[index] = quotation.data;
      } else {
        quotations.results = [quotation.data.quotation, ...quotations.results];
        // this.setState({ quotations });
      }
      this.setState({
        data: {
          products: [],
          companies: [],
          bids: [],
          myBids: [],
          qtype: "normal",
          lastDate: date.addDays(7),
          refNo: "PTV-P/PS/1110/21-22",
          from: "",
          _id: false,
        },
      });
    } catch (error) {
      return;

      // this.setState({ error });
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-6">
            <QuotationTable
              quotations={this.state.quotations}
              getUpdateData={this.getUpdateData}
            />
          </div>
          <div className="col-6">
            {" "}
            <QuotationForm
              data={this.state.data}
              handlePriceChange={this.handlePriceChange}
              createQuotation={this.createQuotation}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Quotation1;
