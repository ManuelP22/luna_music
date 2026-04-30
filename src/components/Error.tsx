const Error = () => (
  <div className="flex min-h-[50vh] w-full items-center justify-center">
    <div className="glass-card max-w-xl rounded-[32px] px-8 py-10 text-center">
      <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">Connection Issue</p>
      <h1 className="mt-3 text-headline-md text-white">Algo salio mal</h1>
      <p className="mt-4 text-body-md leading-7 text-on-surface-variant">
        Intentalo de nuevo en unos segundos. Tambien es posible que tu pais no tenga disponibles estas listas o que el proveedor no haya respondido.
      </p>
    </div>
  </div>
);

export default Error;
