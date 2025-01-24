// /latest?apikey=&currencies=EUR
// &EUR
import axios from "axios";
const BASE_URL = "https://api.freecurrencyapi.com/v1";
const API_KEY = "fca_live_bZ3YxAH1Ve4UFOOHxmhyKBvqNSORrapNlyZPRrF5";

const CurrencyAPI = {
    latest: (baseCurrency: string, toCurrency: string) =>
        axios.get(`${BASE_URL}/latest`, { params: {
            apikey: API_KEY,
            base_currency: baseCurrency,
            currencies: toCurrency
        }
    })
};


export default CurrencyAPI;