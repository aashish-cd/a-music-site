import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './music.module.css';
import YouTube from 'react-youtube';
const url = 'https://www.googleapis.com/youtube/v3/search';
// const key = 'AIzaSyB4sGKNYZtaIIpPKYXbDn7IjKlyOGfl55Y';
const key = 'AIzaSyCfuWiUInW0YdBKiK8qwVE1zO5WiDO9yj8';
const Music = () => {
  const [searchTerm, setSearchTerm] = useState('mero aanshu');
  const [musicToPlay, setMusicToPlay] = useState([]);
  const fetchMusic = async (query) => {
    const res = await axios.get(
      `${url}?part=snippet&maxResults=1&q=${
        query ? query : 'mero aanshu'
      }&key=${key}`
    );
    setMusicToPlay(res.data.items);
    // console.log(res);
    // console.log(musicToPlay);
  };

  useEffect(async () => {
    // if (musicToPlay.length === 0) {
    fetchMusic();
    // console.log('initial');
  }, []);
  const handleSubmit = async () => {
    await fetchMusic(searchTerm);
    console.log('llalal');
  };

  return (
    <>
      <div className={style.container}>
        {/* <h1>not AweSOME music app</h1> */}

        <div>
          <label className={style.searchLabel} htmlFor='search'>
            search aweSOME song and we will play it for you
          </label>
          <input
            className={style.searchInput}
            name='search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={style.searchBtn} onClick={handleSubmit}>
            Play
          </button>
          <p>now Playing: {musicToPlay[0]?.snippet.title.slice(0, 70)}</p>
        </div>
      </div>
      <div>
        {musicToPlay.map((ss, index) => (
          <div style={{ display: 'none' }} key={index}>
            {/* <iframe
              width='424'
              height='267'
              className='iframe'
              src={`https://www.youtube.com/embed/${ss.id.videoId}`}
              title='YouTube video player'
              frameborder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowfullscreen
            ></iframe> */}
            <YouTube
              videoId={ss.id.videoId}
              opts={{
                height: '390',
                width: '640',
                playerVars: {
                  autoplay: 1,
                  loop: 1,
                },
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Music;
