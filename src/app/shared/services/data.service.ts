import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RespData} from "../main-layout/interfaces/interfaces";

@Injectable({providedIn: 'root'})
export class DataService {
  constructor(private http: HttpClient) {
  }

  getData(): Observable<RespData[]> {
    return this.http.get<RespData[]>('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
  }

  getExchangeRate(currencies: RespData[],firstCurrency: string, secondCurrency: string): number {
    if (firstCurrency === secondCurrency) {
      return 1;
    }

    const currency = currencies.find(c => (c.ccy === firstCurrency && c.base_ccy === secondCurrency) || (c.ccy === secondCurrency && c.base_ccy === firstCurrency));
    if (currency) {
      if (currency.ccy === firstCurrency) {
        return Number(currency.buy);
      } else {
        return 1 / Number(currency.buy);
      }
    }

    const baseCurrency = 'UAH';
    const baseToFirstCurrency = this.getExchangeRate(currencies, baseCurrency, secondCurrency);
    const baseToSecondCurrency = this.getExchangeRate(currencies, baseCurrency, firstCurrency);

    if (baseToFirstCurrency !== 0 && baseToSecondCurrency !== 0) {
      return baseToFirstCurrency / baseToSecondCurrency;
    }
    return 1;
  }
}

