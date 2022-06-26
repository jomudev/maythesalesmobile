import store from '../../store';
export default class CurrencyFunctions {

  static moneyFormat(number) {
          return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: store.getState().data.defaultCurrencyFormat,
          }).format(Number(number));;
      }
}