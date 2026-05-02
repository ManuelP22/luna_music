import { Error, Loader, SongCard } from '../components';
import { useI18n } from '../i18n';
import { lunaApi } from '../services/lunaApi';
import { useApiQuery } from '../hooks/useApiQuery';
import { usePlayerStore } from '../store/playerStore';

const AroundYou = () => {
  const { geoCountry, geoError, isResolvingLocale, t, formatCountryName } = useI18n();
  const activeSong = usePlayerStore((state) => state.activeSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const countryCode = geoCountry?.countryCode ?? '';
  const songsQuery = useApiQuery(
    () => lunaApi.getCountryCharts(countryCode),
    [countryCode],
    { enabled: Boolean(countryCode) },
  );

  if (isResolvingLocale || songsQuery.isLoading) return <Loader title={t('aroundYou.loadingTitle')} />;
  if (geoError || songsQuery.error) return <Error />;

  const tracks = songsQuery.data?.tracks ?? [];
  const countryName = formatCountryName(countryCode, geoCountry?.countryName) || t('aroundYou.regionFallback');

  return (
    <div className="flex flex-col gap-10">
      <section className="glass-panel overflow-hidden rounded-[32px] border border-white/10 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-label-sm uppercase tracking-[0.28em] text-primary-fixed">{t('aroundYou.label')}</p>
            <h1 className="mt-3 text-headline-lg text-white">
              {t('aroundYou.titlePrefix')} <span className="text-gradient-blue">{countryName}</span>
            </h1>
            <p className="mt-4 text-body-md text-on-surface-variant">
              {t('aroundYou.description')}
            </p>
          </div>

          <div className="glass-card rounded-[24px] px-5 py-4">
            <p className="text-label-sm uppercase tracking-[0.24em] text-white/45">{t('aroundYou.detected')}</p>
            <p className="mt-2 text-headline-md text-white">{countryCode}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">{t('aroundYou.localPicks')}</p>
            <h2 className="mt-2 text-headline-lg text-white">{t('aroundYou.localTitle')}</h2>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
          {tracks.map((song, i) => (
            <SongCard
              key={song.id}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={tracks}
              i={i}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AroundYou;
