import { useI18n } from '../i18n';

const highlights = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Netlify Functions',
  'Deezer',
  'Last.fm',
  'Zustand',
];

const ProjectAbout = () => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-10">
      <section className="glass-panel relative overflow-hidden rounded-[32px] border border-white/10 p-6 sm:p-8">
        <div className="ambient-glow right-[-10rem] top-[-10rem]" />

        <div className="relative z-10 max-w-3xl">
          <p className="text-label-sm uppercase tracking-[0.28em] text-primary-fixed">{t('project.label')}</p>
          <h1 className="mt-3 text-headline-lg text-white">{t('project.title')}</h1>
          <p className="mt-4 text-body-md text-on-surface-variant">
            {t('project.intro')}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <article className="glass-card rounded-[28px] p-6 sm:p-7">
          <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">{t('project.interfaceLabel')}</p>
          <h2 className="mt-3 text-headline-md text-white">{t('project.interfaceTitle')}</h2>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">
            {t('project.interfaceDescription')}
          </p>
        </article>

        <article className="glass-card rounded-[28px] p-6 sm:p-7">
          <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">{t('project.backendLabel')}</p>
          <h2 className="mt-3 text-headline-md text-white">{t('project.backendTitle')}</h2>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">
            {t('project.backendDescription')}
          </p>
        </article>

        <article className="glass-card rounded-[28px] p-6 sm:p-7">
          <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">{t('project.musicLabel')}</p>
          <h2 className="mt-3 text-headline-md text-white">{t('project.musicTitle')}</h2>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">
            {t('project.musicDescription')}
          </p>
        </article>
      </section>

      <section className="glass-card rounded-[28px] p-6 sm:p-7">
        <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">{t('project.previewLabel')}</p>
        <h2 className="mt-3 text-headline-md text-white">{t('project.previewTitle')}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-on-surface-variant">
          {t('project.previewDescription')}
        </p>
      </section>

      <section className="glass-card rounded-[28px] p-6 sm:p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">{t('project.repoLabel')}</p>
            <h2 className="mt-3 text-headline-md text-white">{t('project.repoTitle')}</h2>
            <p className="mt-4 text-sm leading-7 text-on-surface-variant">
              {t('project.repoDescription')}
            </p>
          </div>

          <a
            href="https://github.com/ManuelP22/luna_music"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            {t('project.repoCta')}
          </a>
        </div>
      </section>

      <section className="glass-panel overflow-hidden rounded-[32px] border border-white/10 p-6 sm:p-8">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">{t('project.summaryLabel')}</p>
            <h2 className="mt-3 text-headline-md text-white">{t('project.summaryTitle')}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-on-surface-variant">
              {t('project.summaryDescription')}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/80 shadow-glass-inset"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectAbout;
