import type { LoaderProps } from './shared.types';
import { useI18n } from '../i18n';

const Loader = ({ title }: LoaderProps) => {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center select-none">
      <div className="glass-card flex max-w-lg flex-col items-center rounded-[32px] px-8 py-10 text-center">
        <div className="loader-pill" aria-hidden="true">
          <span className="loader-pill-bar" />
          <span className="loader-pill-bar" />
          <span className="loader-pill-bar" />
          <span className="loader-pill-bar" />
          <span className="loader-pill-bar" />
        </div>
        <p className="mt-5 text-label-sm uppercase tracking-[0.24em] text-primary-fixed">{t('loader.loading')}</p>
        <h1 className="mt-3 text-headline-md text-white">{title || t('loader.fallbackTitle')}</h1>
        <p className="mt-3 text-body-md text-on-surface-variant">
          {t('loader.description')}
        </p>
      </div>
    </div>
  );
};

export default Loader;
