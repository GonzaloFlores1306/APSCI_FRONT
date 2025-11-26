import { Building2 } from 'lucide-react';
import { Button } from '../ui/button';
import { SedeDialog } from '../dialogs/SedeDialog';
import { useSede } from '../../context/Mantenimiento/SedeContext';

interface propCardSede {
	nombre: string;
	desc: string;
	data: any;
}

const CardSede = ({ nombre, desc, data }: propCardSede) => {
	const { activarSede, desactivarSede } = useSede();

	const handleState = (estado: string, id: number) => {
		if (estado === 'ACTIVO') {
			desactivarSede(id);
		} else {
			activarSede(id);
		}
	};
	return (
		<div className="cardSede rounded-2xl flex flex-col  px-4 py-3 hover:scale-101">
			<div className="flex items-center py-3 px-2 relative">
				<div
					className={`img-avatar w-[80px] h-[80px] rounded-full flex items-center justify-center ${
						data.estate === 'ACTIVO' ? 'bg-[var(--primary-color)]' : 'bg-neutral-200'
					}`}>
					<Building2
						size={35}
						className={`${data.estate === 'ACTIVO' ? 'text-[var(--font-black)]' : 'text-neutral-400'}`}
					/>
				</div>
				<div className="ml-5 flex  flex-1 flex-col justify-center">
					<div className=" flex flex-col">
						<span className="font-bold">{nombre}</span>
						<span className="font-medium"> {desc}</span>
					</div>
					<span
						className={`absolute top-0 right-0 rounded-2xl px-5 text-sm ${
							data.estate === 'ACTIVO' ? 'bg-[var(--primary-color)]' : 'border border-neutral-200'
						} `}>
						{data.estate.charAt(0).toUpperCase() + data.estate.slice(1).toLowerCase()}
					</span>
				</div>
			</div>

			<div className="flex justify-end gap-2">
				<SedeDialog type="edit" data={data} />
				<Button
					onClick={() => handleState(data.estate, data.id)}
					size={'sm'}
					variant={'outline'}
					className="px-3 py-1 rounded-md cursor-pointer">
					{data.estate === 'ACTIVO' ? 'Desactivar' : 'Activar'}
				</Button>
			</div>
		</div>
	);
};

export default CardSede;
