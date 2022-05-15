import {db} from '../mainFunctions';


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
        this.profit = data.precioVenta - data.precioCosto;
    }

    generateID() {
        this.id = new Date.now();
    }

    updateProperty(property, value) {
        this[property] = value;
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
            precioMayoreo: this.precioMayoreo,
            proveedor: this.proveedor,
        };
    }

    async save() {
        const productRef = db('products').doc(this.id);
        await productRef.set(this.toJSON());
    }
}