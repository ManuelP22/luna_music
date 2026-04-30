import { loader } from '../assets';
import type { LoaderProps } from './shared.types';

const Loader = ({ title }: LoaderProps) => (
  <div className="flex min-h-[50vh] w-full items-center justify-center">
    <div className="glass-card flex max-w-lg flex-col items-center rounded-[32px] px-8 py-10 text-center">
      <img src={loader} alt="loader" className="h-28 w-28 object-contain" />
      <p className="mt-5 text-label-sm uppercase tracking-[0.24em] text-primary-fixed">Loading</p>
      <h1 className="mt-3 text-headline-md text-white">{title || 'Cargando...'}</h1>
      <p className="mt-3 text-body-md text-on-surface-variant">
        Preparando la siguiente capa del catalogo para mantener la experiencia fluida.
      </p>
    </div>
  </div>
);

export default Loader;
