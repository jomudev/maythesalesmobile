import store from '../../../store';
export default class Reports {
    constructor() {
        this.salesLength = store.getState().collections.ventas.length;
        this.reports = {}
        this.init();
    }

    init() {
        store.getState().collections.ventas.forEach(sale => {
            const year = sale.getYear();
            const month = sale.getMonth();
            if (!this.reports[year]) {
                const reportMonths = {
                    [month]: {
                        total: sale.total,
                        ventas: [sale.id],
                        ganancias: sale.ganancias,
                        cantidad: 1,
                        productos: sale.getProductsQuantity(),
                        servicios: sale.getServicesQuantity()
                    }
                };
                this.reports[year] = {
                    year,
                    months: reportMonths,
                    total: sale.total,
                    ganancias: sale.ganancias,
                    cantidad: 1,
                    productos: sale.getProductsQuantity(),
                    servicios: sale.getServicesQuantity()
                };
            } else {
                this.reports[year].months[month] = {
                    total: this.reports[year].months[month].total + sale.total,
                    ventas: this.reports[year].months[month].ventas.concat(sale.id),
                    ganancias: this.reports[year].months[month].ganancias + sale.ganancias,
                    cantidad: this.reports[year].months[month].cantidad + 1,
                    productos: this.reports[year].months[month].productos + sale.getProductsQuantity(),
                    servicios: this.reports[year].months[month].servicios + sale.getServicesQuantity(),
            };

                this.reports[year].total = this.reports[year].total + sale.total;
                this.reports[year].ganancias = this.reports[year].ganancias + sale.ganancias;
                this.reports[year].cantidad = this.reports[year].cantidad + 1;
                this.reports[year].productos = this.reports[year].productos + sale.getProductsQuantity();
                this.reports[year].servicios = this.reports[year].servicios + sale.getServicesQuantity();

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