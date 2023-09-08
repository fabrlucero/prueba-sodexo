export class Persona {
    id!: number;
    nombre!: string;
    apellido!: string;
    telefono!: string;
    comuna!: String;


    getNombrePersona(): string{
        return `${this.nombre} ${this.apellido}`;
    }

}
