export default function EmptyTrayState() {
  return (
    <div className="flex justify-center items-center w-full h-[70vh]">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-1 text-secondary-1500">
          Your tray is empty!
        </h2>
        <p className="text-sm mb-6 text-secondary-1600">
          Looks like you haven’t added any meals yet. Browse our catalogue and
          pick your favorite meals!{' '}
        </p>
      </div>
    </div>
  );
}
