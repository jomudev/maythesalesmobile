import store from '../../../store';
export default class Reports {
    constructor() {
        this.salesLength = store.getState().collections.sales.length;
        this.reports = {}
        this.init();
    }

    init() {
        store.getState().collections.sales.forEach(sale => {
            const year = sale.getYear();
            const month = sale.getMonth();
            if (!this.reports[year]) {
                const reportMonths = {
                    [month]: {
                        total: sale.total,
                        ganancias: sale.ganancias,
                        quantity: 1,
                        products: sale.getProductsQuantity(),
                        services: sale.getServicesQuantity()
                    }
                };
                this.reports[year] = {
                    year,
                    months: reportMonths,
                    total: sale.total,
                    ganancias: sale.ganancias,
                    quantity: 1,
                    products: sale.getProductsQuantity(),
                    services: sale.getServicesQuantity()
                };
            } else {
                this.reports[year].months[month] = {
                    total: this.reports[year].months[month] ? this.reports[year].months[month].total + sale.total : sale.total,
                    ganancias: this.reports[year].months[month] ? this.reports[year].months[month].ganancias + sale.ganancias : sale.ganancias,
                    quantity: this.reports[year].months[month] ? this.reports[year].months[month].quantity + 1 : 1,
                    products: this.reports[year].months[month] ? this.reports[year].months[month].products + sale.getProductsQuantity() : sale.getProductsQuantity(),
                    services: this.reports[year].months[month] ? this.reports[year].months[month].services + sale.getServicesQuantity() : sale.getServicesQuantity()
                };

                this.reports[year].total = this.reports[year].total + sale.total;
                this.reports[year].ganancias = this.reports[year].ganancias + sale.ganancias;
                this.reports[year].quantity = this.reports[year].quantity + 1;
                this.reports[year].products = this.reports[year].products + sale.getProductsQuantity();
                this.reports[year].services = this.reports[year].services + sale.getServicesQuantity();

            }
        });
    }

    getMonths(year) {
        return this.reports[year].months;
    }

    getSales(year, month) {
        return this.reports[year].months[month];
    }
}