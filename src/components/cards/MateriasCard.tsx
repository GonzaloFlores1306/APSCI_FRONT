export const MateriasCard = ({ nombre }: { nombre: string }) => {
  return (
    <div className="border border-neutral-200 rounded-2xl py-1 px-4 w-fit">
      {nombre}
    </div>
  );
};
