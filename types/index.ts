export interface PresupuestoType {
    id: number;
    titulo: string;
    completado: boolean;
}

export interface TablaProps {
    presupuestos: PresupuestoType[];
    onTogglePresupuesto: (id: number) => void;
    onEliminarPresupuesto: (id: number) => void;
    onEditarPresupuesto: (id: number) => void;
}
