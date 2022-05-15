import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import {formatDistanceToNow} from 'date-fns';

const configuredFormat = (date, dateType) => format(date, dateType, {locale: es});

export default class Sale {
    constructor(data) {
        this.productos = [];
        this.conteoDeProductos = 0;
        this.servicios = [];
        this.conteoDeServicios = 0;
        this.cliente = null;
        this.estado = false;
        this.timestamp = null;
        this.id = null;
        if (data) {
            this.cliente = data.cliente;
            this.estado = data.estado;
            this.id = data.id;
            this.productos = data.productos.map(product => product.id);
            this.servicios = data.servicios.map(service => service.id);
            this.timestamp = data.timestamp;
        } else {
            this.generateID();
            this.timestamp = new Date.now();
        }
        this.total = 0;
        this.ganancias = 0;

        // Inicializar los datos de la venta
        this.calculateTotals();
    }

    getDate() {
        return new Date(this.timestamp.seconds * 1000);
    }

    getDateDistanceToNow() {
        return formatDistanceToNow(this.getDate(), {locale: es, addSuffix: true});
    }

    generateID() {
        this.id = new Date.now();
    }

    
    updateSale() {
        this.calculateTotals();
        this.save();
    }

    updateProperty(property, value) {
        this[property] = value;
        this.updateSale();
    }

    toJSON() {
        return {
            cliente: this.cliente,
            estado: this.estado,
            id: this.id,
            mayorista: this.mayorista,
            productos: this.productos,
            servicios: this.servicios,
            timestamp: this.timestamp,
            total: this.total,
            ganancias: this.ganancias,
        };
    }

    calculateProfit() {
        this.ganancias = this.total - this.productos.reduce((acc, item) => {
            if (this.estado) {
                return acc + item.precioCosto * item.cantidad;
            } else {
                return acc;
            }
        }, 0);

        this.ganancias = this.total - this.servicios.reduce((acc, item) => {
            if (this.estado) {
                return acc + item.precioCosto * item.cantidad;
            } else {
                return acc;
            }
        }, 0);
    }

    calculatePurchased() {
        this.total = this.productos.reduce((acc, item) => {
            if (this.estado) {
                return acc + item.precioVenta * item.cantidad;
            } else {
                return acc;
            }
        }, 0);

        this.total = this.total + this.servicios.reduce((acc, item) => {
            if (this.estado) {
                return acc + item.precioVenta * item.cantidad;
            } else {
                return acc;
            }
        }, 0);

    }

    calculateTotals() {
        this.calculatePurchased();
        this.calculateProfit();
        this.quantify();
    }

    quantify() {
        this.conteoDeProductos = this.productos.reduce((acc, item) => {
            return acc + item.cantidad;
        }, 0);

        this.conteoDeServicios = this.servicios.reduce((acc, item) => {
            return acc + item.cantidad;
        }, 0);
    }

    getProductsQuantity(type) {
        if (type === 'text') {
            if (this.conteoDeProductos > 1) {
                return ` ${this.conteoDeProductos} servicios`;
            } else {
                return this.conteoDeProductos === 1 ? ` ${this.conteoDeProductos} servicio` : '';
            }
        } else {
            return this.conteoDeProductos;
        }
    }

    getServicesQuantity(type) {
        if (type === 'text') {
            if (this.conteoDeServicios > 1) {
                return ` ${this.conteoDeServicios} servicios`;
            } else {
                return this.conteoDeServicios === 1 ? ` ${this.conteoDeProductos} servicio` : '';
            }
        } else {
            return this.conteoDeServicios;
        }
    }

    getYear() {
        return configuredFormat(this.getDate(), 'yyyy');
    }

    getMonth() {
        return configuredFormat(this.getDate(), 'MMMM');
    }

    formattedDate(type) {
        return configuredFormat(this.getDate(), type);
    }

    async postSale() {
        try {
            if (this.productos.length < 1 && this.servicios.length < 1) {
              throw "No se puede efectuar el registro sin productos ni servicios";
            }

            let productos = this.productos.map(product => product.toJSON());
            let servicios = this.servicios.map(service => service.toJSON());

            return await db('ventas')
              .doc(`${this.id}`)
              .set({
                id: this.id,
                estado: this.estado,
                timestamp: this.timestamp,
                productos: productos,
                servicios: servicios,
                cliente: this.cliente ? this.cliente.getIdentifiers() : null,
              });
          } catch (err) {
            console.warn('error al intentar realizar el registro, ', err);
          }
    }

    addProduct(product) {
        this.productos.push(product);
        this.calculateTotals();
    }

    addService(service) {
        this.servicios.push(service);
        this.calculateTotals();
    }

    save() {
        this.postSale();
    }

}