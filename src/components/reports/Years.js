import store from '../../../store';
export default class Years {
    constructor() {
        this.years = {};
        this.initialize();
    }

    initialize() {
        const years = store.getState().collections.sales.map(sale => sale.getYear());
        years.forEach(year => {
            if (!this.years[year]) {
                this.years[year] = {
                    year: year,
                    total: 0,
                    ganancias: 0,
                };
            }
        });
        this.calculateTotals();
        this.setYearSales();
    }

    setYearSales() {
        store.getState().collections.sales.forEach(sale => {
            const year = sale.getYear();
            if (!this.years[year].sales.includes(sale)) {
                this.years[year].sales.push(sale);
            }
        });
    }

    calculateTotals() {
        Object.keys(this.years).forEach(year => {
            this.years[year].total = store.getState().collections.sales.reduce((acc, sale) => {
                return acc + sale.total;
            }, 0);
            this.years[year].ganancias = store.getState().collections.sales.reduce((acc, sale) => {
                return acc + sale.ganancias;
            }, 0);
        });
    }

}