import { useI18n } from '../i18n';

const Error = () => {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <div className="glass-card max-w-xl rounded-[32px] px-8 py-10 text-center">
        <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">{t('error.label')}</p>
        <h1 className="mt-3 text-headline-md text-white">{t('error.title')}</h1>
        <p className="mt-4 text-body-md leading-7 text-on-surface-variant">
          {t('error.description')}
        </p>
      </div>
    </div>
  );
};

export default Error;
