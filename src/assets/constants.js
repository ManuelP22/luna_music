import { HiOutlineHashtag, HiOutlineHome, HiOutlineInformationCircle, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';

export const genres = [
  { title: 'Pop', value: 'POP' },
  { title: 'Hip-Hop', value: 'HIP_HOP_RAP' },
  { title: 'Dance', value: 'DANCE' },
  { title: 'Electronic', value: 'ELECTRONIC' },
  { title: 'Soul', value: 'SOUL_RNB' },
  { title: 'Alternative', value: 'ALTERNATIVE' },
  { title: 'Rock', value: 'ROCK' },
  { title: 'Latin', value: 'LATIN' },
  { title: 'Film', value: 'FILM_TV' },
  { title: 'Country', value: 'COUNTRY' },
  { title: 'Worldwide', value: 'WORLDWIDE' },
  { title: 'Reggae', value: 'REGGAE_DANCE_HALL' },
  { title: 'House', value: 'HOUSE' },
  { title: 'K-Pop', value: 'K_POP' },
];

export const links = [
  { labelKey: 'nav.explore', to: '/', icon: HiOutlineHome },
  { labelKey: 'nav.aroundYou', to: '/around-you', icon: HiOutlinePhotograph },
  { labelKey: 'nav.topArtists', to: '/top-artists', icon: HiOutlineUserGroup },
  { labelKey: 'nav.topCharts', to: '/top-charts', icon: HiOutlineHashtag },
  { labelKey: 'nav.project', to: '/project', icon: HiOutlineInformationCircle },
];
