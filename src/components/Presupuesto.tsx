import { FC } from 'react';
import { MdEdit, MdDelete  } from "react-icons/md";
import {PresupuestoType} from "../../types";

interface PresupuestoProps {
  presupuesto: PresupuestoType;
  onToggle: () => void;
  onEliminar: () => void;
  onEditar: () => void;
}

const Presupuesto: FC<PresupuestoProps> = ({ presupuesto, onEliminar, onToggle, onEditar }) => {
  return (
    <li className="relative flex items-center justify-between p-2 border-b border-gray-300 hover:bg-gray-400">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={presupuesto.completado}
          onChange={onToggle}
          className="mr-2 form-checkbox"
        />
        <span className={presupuesto.completado ? 'line-through' : ''}>
          {presupuesto.titulo}
        </span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onEditar}
          className="px-3 py-1 text-gray-200 rounded-lg bg-amber-600 ">
          <MdEdit />
        </button>
        <button
          onClick={onEliminar}
          className="px-3 py-1 text-gray-200 rounded-lg bg-rose-600 ">
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default Presupuesto;
