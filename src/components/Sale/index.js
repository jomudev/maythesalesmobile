import {format} from 'date-fns';
import {db} from '../../utils/firebase';
import {es} from 'date-fns/locale';
import {formatDistanceToNow} from 'date-fns';
import Product from '../Product';
import Service from '../Service';
import CurrencyFunctions from '../../utils/currencyFunctions';

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
            this.productos = data.productos.map(product => new Product(product));
            this.servicios = data.servicios.map(service => new Service(service));
            this.timestamp = data.timestamp;
        } else {
            this.id = Date.now();
            this.timestamp = Date.now();
        }
        this.total = 0;
        this.totalProductos = 0;
        this.totalServicios = 0;
        this.ganancias = 0;

        // Inicializar los totales de la venta
        this.calculateTotals();
    }

    getTotal() {
        return CurrencyFunctions.moneyFormat(this.total);
    }

    getTotalProductos() {
        return CurrencyFunctions.moneyFormat(this.totalProductos);
    }

    getTotalServicios() {
        return CurrencyFunctions.moneyFormat(this.totalServicios);
    }

    getDate() {
        return new Date(this.timestamp.seconds * 1000);
    }

    getDateDistanceToNow() {
        return formatDistanceToNow(this.getDate(), {locale: es, addSuffix: true});
    }

    generateID() {
        this.id = Date.now();
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
        let json = {
            id: this.id,
            estado: this.estado,
            timestamp: this.timestamp,
            productos: this.productos.map(product => product.toJSON()),
            servicios: this.servicios.map(service => service.toJSON()),
            cliente: this.cliente
        };
        return json
    }


    calculateProductsTotalPurchase = (item) =>  item.precioVenta * item.cantidad;
    calculateProductsProfits = (item) =>  item.ganancias * item.cantidad;
    reducer = (acc, actualValue) => acc + actualValue;

    getPurchased() {
        const precioVentasProductos = this.productos.map(this.calculateProductsTotalPurchase);
        const precioVentasServicios = this.servicios.map(this.calculateProductsTotalPurchase);
        
        this.totalProductos = precioVentasProductos.reduce(this.reducer, 0);
        this.totalServicios = precioVentasServicios.reduce(this.reducer, 0);
        this.total = this.totalProductos + this.totalServicios;
    }

    getProfits() {  
        const gananciasProductos = this.productos.map(this.calculateProductsProfits);
        const gananciasServicios = this.servicios.map(this.calculateProductsProfits);
        this.ganancias = gananciasProductos.reduce(this.reducer, 0) + gananciasServicios.reduce(this.reducer, 0);
    }

    calculateTotals() {
        this.getPurchased();
        this.getProfits();
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
                return ` ${this.conteoDeProductos} productos`;
            } else {
                return this.conteoDeProductos === 1 ? ` ${this.conteoDeProductos} producto` : '';
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

    addTo(propertyName, element) {
        if (propertyName === 'servicios' || propertyName === 'productos') {
            if (!this[propertyName].find((item) => item.id === element.id)) {
                this[propertyName] = this[propertyName].concat(element);
                this.calculateTotals();
            }
        }
    }
    
    removeTo(propertyName, elementIdToDelete) {
        if (propertyName === 'servicios' || propertyName === "productos") {
            this[propertyName] = this[propertyName].filter((element) => element.id !== elementIdToDelete);
        }
        this.calculateTotals();
    }

    reset() {
        this.productos = [];
        this.conteoDeProductos = 0;
        this.servicios = [];
        this.conteoDeServicios = 0;
        this.cliente = null;
        this.estado = false;
        this.timestamp = null;
        this.id = Date.now();
        this.timestamp = Date.now();
        this.total = 0;
        this.totalProductos = 0;
        this.totalServicios = 0;
        this.ganancias = 0;
    }

    static save() {
        this.postSale();
    }

}