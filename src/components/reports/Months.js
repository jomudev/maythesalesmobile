export default class Months {
    constructor(sales, year) {
        this.year = year;
        this.months = {};
        this.sales = sales.filter(sale => sale.getYear() === this.year);
        this.initialize();
    }

    initialize() {
        const months = this.sales.map(sale => sale.getMonth());
        months.forEach(month => {
            if (!this.months[month]) {
                this.months[month] = {
                    month,
                    sales: [],
                    total: 0,
                    ganancias: 0,
                };
            }
        });
        this.calculateTotals();
        this.setMonthSales();
    }

    setMonthSales() {
        this.sales.forEach(sale => {
            const month = sale.getMonth();
            if (!this.months[month].sales.includes(sale)) {
                this.months[month].sales.push(sale);
            }
        });
    }

    setMonthSales() {
        this.sales.forEach(sale => {
            const month = sale.getMonth();
            if (!this.months[month].sales.includes(sale)) {
                this.months[month].sales.push(sale);
            }
        });
    }

    calculateTotals() {
        Object.keys(this.months).forEach(month => {
            this.months[month].total = this.sales.filter(sale => sale.getMonth() === month).reduce((acc, sale) => {
                return acc + sale.total;
            }, 0);
            this.months[month].ganancias = this.sales.filter(sale => sale.getMonth() === month).reduce((acc, sale) => {
                return acc + sale.ganancias;
            }, 0);
        });
    }
}