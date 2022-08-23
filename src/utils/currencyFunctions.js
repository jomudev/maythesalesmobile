import store from '../../store';
export default class CurrencyFunctions {

  constructor() {
    this.defaultCurrencyFormat = store.getState().data.defaultCurrencyFormat;
  }

  static moneyFormat(number) {
    console.log(this.defaultCurrencyFormat);
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: store.getState().data.defaultCurrencyFormat,
    }).format(Number(number));
  }
}