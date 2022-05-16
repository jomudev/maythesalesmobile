export default class Years {
    constructor(sales) {
        this.years = {};
        this.sales = sales;
        this.initialize(sales);
    }

    initialize(sales) {
        const years = sales.map(sale => sale.getYear());
        years.forEach(year => {
            if (!this.years[year]) {
                this.years[year] = {
                    year: year,
                    sales: [],
                    total: 0,
                    ganancias: 0,
                };
            }
        });
        this.calculateTotals(sales);
        this.setYearSales();
    }

    setYearSales() {
        this.sales.forEach(sale => {
            const year = sale.getYear();
            if (!this.years[year].sales.includes(sale)) {
                this.years[year].sales.push(sale);
            }
        });
    }

    calculateTotals(sales) {
        Object.keys(this.years).forEach(year => {
            this.years[year].total = sales.reduce((acc, sale) => {
                return acc + sale.total;
            }, 0);
            this.years[year].ganancias = sales.reduce((acc, sale) => {
                return acc + sale.ganancias;
            }, 0);
        });
    }

}