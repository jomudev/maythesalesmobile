import CurrencyFunctions from '../../utils/currencyFunctions';
import Firebase from '../../utils/firebase';

export default class Product {
    constructor(data) {
        if (!data.id) {
            this.generateID();
        } else {
            this.id = data.id;
        }
        this.barcode = data.barcode;
        this.cantidad = data.cantidad;
        this.descripcion = data.descripcion;
        this.imageURL = data.imageURL;
        this.marca = data.marca;
        this.nombre = data.nombre;
        this.precioCosto = data.precioCosto;
        this.precioVenta = data.precioVenta;
        this.proveedor = data.proveedor;
        this.ganancias = data.precioVenta - data.precioCosto;
    }

    getPrecioVenta() {
        return CurrencyFunctions.moneyFormat(this.precioVenta);
    }

    getTotal() {
        return CurrencyFunctions.moneyFormat(this.precioVenta * this.cantidad);
    }

    getGanancias() {
        return CurrencyFunctions.moneyFormat(this.ganancias);
    }

    generateID() {
        this.id = new Date.now();
    }

    updateProperty(property, value) {
        this[property] = value;
        const newGanancias = this.precioVenta - this.precioCosto;
        if (newGanancias !== this.ganancias) {
            this.ganancias = newGanancias;
        }
        this.save()
    }

    toJSON() {
        return {
            barcode: this.barcode,
            cantidad: this.cantidad,
            descripcion: this.descripcion,
            id: this.id,
            imageURL: this.imageURL,
            marca: this.marca,
            nombre: this.nombre,
            precioCosto: this.precioCosto,
            precioVenta: this.precioVenta,
            proveedor: this.proveedor,
        };
    }

    async save() {
        const productRef = Firebase.db('productos').doc(this.id);
        await productRef.set(this.toJSON());
    }
}