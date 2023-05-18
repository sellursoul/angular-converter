import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DataService} from "../shared/services/data.service";
import {RespData} from "../shared/main-layout/interfaces/interfaces";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  convertForm: FormGroup
  currencies: RespData[]

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe(resp => {
      this.currencies = resp
    })
    this.convertForm = new FormGroup({
      firstAmount: new FormControl(''),
      secondAmount: new FormControl(''),
      firstCurrency: new FormControl('UAH'),
      secondCurrency: new FormControl('USD')
    })
  }

  convert() {
    const firstAmountControl = this.convertForm.get('firstAmount');
    const secondAmountControl = this.convertForm.get('secondAmount');
    const firstCurrencyControl = this.convertForm.get('firstCurrency');
    const secondCurrencyControl = this.convertForm.get('secondCurrency');

    const firstCurrency = firstCurrencyControl?.value;
    const secondCurrency = secondCurrencyControl?.value;
    const rate = this.dataService.getExchangeRate(this.currencies, firstCurrency, secondCurrency);
    const convertedAmount = firstAmountControl?.value * rate;
    secondAmountControl?.setValue(convertedAmount, { emitEvent: false });

    firstAmountControl?.valueChanges.subscribe((value: number) => {
      const firstCurrency = firstCurrencyControl?.value;
      const secondCurrency = secondCurrencyControl?.value;
      const rate = this.dataService.getExchangeRate(this.currencies, firstCurrency, secondCurrency);
      const convertedAmount = value * rate;
      secondAmountControl?.setValue(convertedAmount, { emitEvent: false });
    });

    secondAmountControl?.valueChanges.subscribe((value: number) => {
      const firstCurrency = firstCurrencyControl?.value;
      const secondCurrency = secondCurrencyControl?.value;
      const rate = this.dataService.getExchangeRate(this.currencies, secondCurrency, firstCurrency);
      const convertedAmount = value * rate;
      firstAmountControl?.setValue(convertedAmount, { emitEvent: false });
    });
  }
}
