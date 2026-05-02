import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard } from '../components';
import { useI18n } from '../i18n';
import { lunaApi } from '../services/lunaApi';
import { useApiQuery } from '../hooks/useApiQuery';
import { usePlayerStore } from '../store/playerStore';

const Search = () => {
  const { t } = useI18n();
  const { searchTerm = '' } = useParams();
  const activeSong = usePlayerStore((state) => state.activeSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const { data, isLoading, error } = useApiQuery(
    () => lunaApi.getSearchResults(searchTerm),
    [searchTerm],
    { enabled: Boolean(searchTerm) },
  );

  if (isLoading) return <Loader title={t('search.loadingTitle', { term: searchTerm })} />;
  if (error) return <Error />;

  const songs = data?.tracks ?? [];
  const artists = data?.artists ?? [];
  const displaySearchTerm = decodeURIComponent(searchTerm);

  return (
    <div className="relative flex flex-col gap-10">
      <div className="ambient-glow right-[-12rem] top-[6rem]" />
      <div className="ambient-glow-deep bottom-[-10rem] left-[-8rem] h-[24rem] w-[24rem]" />

      <section className="glass-panel relative z-10 overflow-hidden rounded-[32px] border border-white/10 p-6 sm:p-8">
        <p className="text-label-sm uppercase tracking-[0.28em] text-primary-fixed">{t('search.label')}</p>
        <h1 className="mt-3 text-headline-lg text-white">
          {t('search.titlePrefix')} <span className="text-gradient-blue">{displaySearchTerm}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-body-md text-on-surface-variant">
          {t('search.summary', { songs: songs.length, artists: artists.length })}
        </p>
      </section>

      {songs.length > 0 ? (
        <section className="glass-panel overflow-hidden rounded-[32px] border border-white/10 p-6 sm:p-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">{t('search.tracksLabel')}</p>
              <h2 className="mt-2 text-headline-lg text-white">{t('search.topMatches')}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {songs.map((song, i) => (
              <SongCard
                key={song.id}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={songs}
                i={i}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="glass-card rounded-[28px] p-6">
          <h2 className="text-headline-md text-white">{t('search.emptyTitle')}</h2>
          <p className="mt-3 text-body-md text-on-surface-variant">
            {t('search.emptyDescription')}
          </p>
        </section>
      )}
    </div>
  );
};

export default Search;
