import { ArtistCard, Error, Loader } from '../components';
import { useI18n } from '../i18n';
import { lunaApi } from '../services/lunaApi';
import { useApiQuery } from '../hooks/useApiQuery';

const TopArtists = () => {
  const { t } = useI18n();
  const { data, isLoading, error } = useApiQuery(() => lunaApi.getTopArtists(), []);

  if (isLoading) return <Loader title={t('topArtists.loadingTitle')} />;
  if (error) return <Error />;

  const artists = data?.artists ?? [];

  return (
    <div className="flex flex-col gap-10">
      <section className="glass-panel rounded-[32px] border border-white/10 p-6 sm:p-8">
        <p className="text-label-sm uppercase tracking-[0.28em] text-primary-fixed">{t('topArtists.label')}</p>
        <h1 className="mt-3 text-headline-lg text-white">{t('topArtists.title')}</h1>
        <p className="mt-4 max-w-2xl text-body-md text-on-surface-variant">
          {t('topArtists.description')}
        </p>
      </section>

      <section className="glass-panel overflow-hidden rounded-[32px] border border-white/10 p-6 sm:p-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">{t('topArtists.sectionLabel')}</p>
            <h2 className="mt-2 text-headline-lg text-white">{t('topArtists.sectionTitle')}</h2>
          </div>
          <p className="hidden text-sm text-on-surface-variant md:block">
            {t('topArtists.count', { count: artists.length })}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {artists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TopArtists;
