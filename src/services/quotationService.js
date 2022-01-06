import http from "./httpService";

const quotationApi = "https://ptv-pms.herokuapp.com/api/quotation";

export const getAllQuotations = async () => {
  return await http.get(`${quotationApi}`);
};
export const getPaginatedQuotations = async (page, limit) => {
  return await http.get(
    `${quotationApi}/paginated/?page=${page}&limit=${limit}`
  );
};
export const deleteQuotation = async (quotation) => {
  try {
    // const quotations = this.state.quotations.filter((p) => p._id !== quotation._id);
    await http.delete(`${quotationApi}/${quotation._id}`);
    // return quotations;
  } catch (error) {
    console.log(error);
  }
};

export const saveQuotation = async (quotation) => {
  try {
    const body = { ...quotation };
    delete body._id;
    delete body.__v;
    delete body.createdAt;
    delete body.updatedAt;
    if (quotation._id) {
      return http.put(`${quotationApi}/${quotation._id}`, body);
    } else {
      return http.post(`${quotationApi}/create`, body);
    }
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const getQuotation = async (id) => {
  return await http.get(`${quotationApi}/${id}`);
};
