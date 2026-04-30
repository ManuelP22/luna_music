import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearch = searchTerm.trim();
    if (!trimmedSearch) return;
    navigate(`/search/${trimmedSearch}`);
  };

  return (
    /* pt-3 en lugar de pt-4 — elimina el gap flotante superior */
    <header className="z-30 flex-shrink-0 px-4 py-3 sm:px-5 lg:px-6 xl:px-8">
      <div className="glass-panel mx-auto flex min-w-0 max-w-[1440px] flex-col gap-3 overflow-hidden rounded-[24px] border border-white/10 px-4 py-3 shadow-header-glow md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 md:max-w-sm lg:max-w-md">
          <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">Luna Music</p>
          <h2 className="truncate text-lg font-semibold text-white sm:text-headline-md">Discover the new liquid rhythm</h2>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off" className="min-w-0 w-full md:max-w-xl lg:max-w-2xl">
          <label htmlFor="search-field" className="sr-only">
            Buscar canciones, artistas o albumes
          </label>

          <div className="group relative">
            <div className="pointer-events-none absolute inset-0 rounded-full bg-primary-container/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="glass-search relative flex min-w-0 items-center rounded-full px-5 py-3">
              <FiSearch className="mr-3 h-5 w-5 flex-shrink-0 text-white/55" />
              <input
                name="search-field"
                autoComplete="off"
                id="search-field"
                placeholder="Buscar canciones, artistas o vibes"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="min-w-0 w-full bg-transparent p-0 text-body-md text-white outline-none placeholder:text-white/35"
              />
            </div>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Searchbar;
