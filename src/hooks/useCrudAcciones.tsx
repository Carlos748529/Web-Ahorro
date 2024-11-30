import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import {PresupuestoType} from "../../types";

const API_URL = 'http://localhost:3000/presupuestos';

const useCrudAcciones = () => {
    const [presupuestos, setPresupuestos] = useState<PresupuestoType[]>([]);
    const [presupuesto, setPresupuesto] = useState<PresupuestoType | null>(null);

    useEffect(() => {
        cargarPresupuestos();
    }, []);

    const getMaxId = () => {
        return presupuestos.reduce((max, t) => (t.id > max ? t.id : max), 0) + 1;
    };

    const cargarPresupuestos = async () => {
        const response = await axios.get(API_URL);
        setPresupuestos(response.data);
    };

    const agregarPresupuesto = async (titulo: string, presupuesto?: PresupuestoType) => {
        if (presupuesto) {
            await axios.put(`${API_URL}/${presupuesto.id}`, { ...presupuesto, titulo });
            setPresupuestos(
                presupuestos.map((t) => (t.id === presupuesto.id ? { ...t, titulo } : t))
            );
            setPresupuesto(null);

            //Mostrar una alerta de éxito sencilla
            alerta('Presupuesto actualizado');

            return;
        }

        await axios.post(API_URL, { titulo, completado: false });
        setPresupuestos([...presupuestos, { id: getMaxId(), titulo, completado: false }]);

        //Mostrar una alerta de éxito sencilla
        alerta('Presupuesto agregado');
    };

    const editarPresupuesto = (id: number) => {
        const presupuesto = presupuestos.find((t) => t.id === id);
        if (presupuesto) {
            setPresupuesto(presupuesto);
        }
    };

    const togglePresupuesto = async (id: number) => {
        const presupuesto = presupuestos.find((t) => t.id === id);
        if (presupuesto) {
            const estado = !presupuesto.completado;
            await axios.put(`${API_URL}/${id}`, { ...presupuesto, completado: estado });
            setPresupuestos(
                presupuestos.map((t) => (t.id === id ? { ...t, completado: estado } : t))
            );
        }
    };

    const eliminarPresupuesto = async (id: number) => {
        // Obtenemos la presupuesto a eliminar
        const presupuesto = presupuestos.find((t) => t.id === id);
        // Usamos sweetalert2 para confirmar la eliminación
        const result = await Swal.fire({
            title: presupuesto?.titulo,
            text: '¿Estás seguro de eliminar este presupuesto?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#f56565',
            cancelButtonColor: '#718096'
        });

        if (!result.isConfirmed) {
            return;
        }
        await axios.delete(`${API_URL}/${id}`);
        setPresupuestos(presupuestos.filter((t) => t.id !== id));
    };

    const alerta = (title: string) => {
        Swal.fire({
            icon: 'success',
            title,
            showConfirmButton: false,
            timer: 1500,
            position: 'top-end',
        });
    }

    return {
        presupuestos,
        agregarPresupuesto,
        editarPresupuesto,
        togglePresupuesto,
        eliminarPresupuesto
    };
};

export default useCrudAcciones;
