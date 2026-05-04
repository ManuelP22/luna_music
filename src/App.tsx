import { Route, Routes } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, ProjectAbout, Search, SongDetails, TopCharts } from './pages';

const App = () => (
  <div className="relative flex h-screen w-full flex-col overflow-hidden bg-surface-container-lowest text-on-surface select-none">

    {/* Ambient glows — decorativos, no afectan el layout */}
    <div className="pointer-events-none fixed left-[-10rem] top-[-6rem] z-0 ambient-glow" />
    <div className="pointer-events-none fixed right-[-12rem] top-[12%] z-0 h-[28rem] w-[28rem] ambient-glow-deep" />
    <div className="pointer-events-none fixed bottom-[-12rem] left-[18%] z-0 hidden xl:block ambient-glow" />

    {/* ── ZONA PRINCIPAL: sidebar + contenido ──────────────────
          flex-1 + min-h-0 garantiza que este bloque ocupa
          exactamente el espacio entre top:0 y el player inferior,
          sin desbordarse ni crear scroll en el body.
      ───────────────────────────────────────────────────────── */}
    <div className="relative z-10 flex min-h-0 flex-1 overflow-hidden">

      {/* Sidebar — 16rem fijo, alto completo */}
      <Sidebar />

      {/* Columna derecha: header + content */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">

        {/* Header / Searchbar — altura automática, no se comprime */}
        <Searchbar />

        {/* Content area — ocupa el resto de la columna derecha */}
        <div className="min-h-0 flex-1 overflow-hidden px-4 py-3 sm:px-5 sm:py-3 lg:px-6 xl:px-8">
          <div className="mx-auto grid h-full min-h-0 max-w-[1440px] grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">

            {/* Panel principal de rutas */}
            <section className="glass-panel min-w-0 overflow-hidden rounded-[28px] border border-white/5 shadow-ambient-card">
              <div className="hide-scrollbar h-full overflow-x-hidden overflow-y-auto px-4 pb-24 pt-4 sm:px-6 sm:pb-28 sm:pt-5 lg:py-5 xl:px-8">
                <Routes>
                  <Route path="/" element={<Discover />} />
                  <Route path="/top-artists" element={<TopArtists />} />
                  <Route path="/top-charts" element={<TopCharts />} />
                  <Route path="/around-you" element={<AroundYou />} />
                  <Route path="/project" element={<ProjectAbout />} />
                  <Route path="/artists/:id" element={<ArtistDetails />} />
                  <Route path="/songs/:songid" element={<SongDetails />} />
                  <Route path="/search/:searchTerm" element={<Search />} />
                </Routes>
              </div>
            </section>

            {/* Panel lateral TopPlay — oculto en mobile */}
            <aside className="glass-panel hidden min-w-0 overflow-hidden rounded-[28px] border border-white/5 shadow-ambient-card xl:block">
              <div className="hide-scrollbar h-full overflow-x-hidden overflow-y-auto px-5 py-5 xl:px-6">
                <TopPlay />
              </div>
            </aside>

          </div>
        </div>
      </div>
    </div>

    {/* ── PLAYER INFERIOR ───────────────────────────────────────
          flex-shrink-0 + h-24 fija la altura exacta.
          NO usa items-end — el contenido se centra verticalmente
          dentro del MusicPlayer con items-center.
      ───────────────────────────────────────────────────────── */}
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:px-4 sm:pb-[calc(env(safe-area-inset-bottom)+1rem)] lg:hidden">
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-[28px] border border-white/10 bg-black/45 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-glass">
        <MusicPlayer renderAudio={false} />
      </div>
    </div>

    <div className="relative z-20 hidden h-24 flex-shrink-0 border-t border-white/10 bg-black/30 shadow-player-top backdrop-blur-glass lg:block">
      <MusicPlayer />
    </div>

  </div>
);

export default App;
