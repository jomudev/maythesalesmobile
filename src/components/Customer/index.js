export default class Customer {
    constructor(data) {
        this.id = null;
        this.nombre = null;
        this.apellido = null;
        this.telefono = null;
        this.direccion = null;
        this.email = null;
        if (data) {
            this.id = data.id;
            this.nombre = data.nombre;
            this.telefono = data.telefono;
            this.descripcion = data.descripcion;
            this.email = data.email;
        } else {
            this.generateID();
        }
    }

    generateID() {
        this.id = new Date.now();
    }

    static updateProperty(property, value) {
        this[property] = value;
    }

    static toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            telefono: this.telefono,
            descripcion: this.descripcion,
            email: this.email,
        };
    }

    static getIdentifiers () {
        return {
            id: this.id,
            nombre: this.nombre,
        };
    }

}