import { FC } from 'react';
import Presupuesto from './Presupuesto.tsx';
import {TablaProps} from "../../types";

const Tabla: FC<TablaProps> = ({
  presupuestos,
  onEliminarPresupuesto,
  onTogglePresupuesto,
  onEditarPresupuesto,
}) => {
  return (
    <ul className="mt-4">
      {presupuestos.map((presupuesto) => (
        <Presupuesto
          key={presupuesto.id}
          presupuesto={presupuesto}
          onToggle={() => onTogglePresupuesto(presupuesto.id)}
          onEliminar={() => onEliminarPresupuesto(presupuesto.id)}
          onEditar={() => onEditarPresupuesto(presupuesto.id)}
        />
      ))}
    </ul>
  );
};

export default Tabla;
