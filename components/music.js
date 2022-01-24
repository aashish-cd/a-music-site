import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './music.module.css';
import YouTube from 'react-youtube';
const url = 'https://www.googleapis.com/youtube/v3/search';
const key = 'AIzaSyB4sGKNYZtaIIpPKYXbDn7IjKlyOGfl55Y';

const Music = () => {
  const [searchTerm, setSearchTerm] = useState('choo lo');
  const [musicToPlay, setMusicToPlay] = useState([]);
  const fetchMusic = async () => {
    const res = await axios.get(
      `${url}?part=snippet&maxResults=1&q=${searchTerm}&key=${key}`
    );
    setMusicToPlay(res.data.items);
    console.log(res);
    console.log(musicToPlay);
  };

  useEffect(async () => {
    if (musicToPlay.length == 0) {
      // fetchMusic();
      console.log('initial');
    } else {
      setTimeout(() => {
        // fetchMusic();
        console.log('searched');
      }, 1000);
    }
  }, [searchTerm]);

  return (
    <>
      <div className={style.container}>
        {/* <h1>not AweSOME music app</h1> */}

        <form>
          <label className={style.searchLabel} htmlFor='search'>
            type aweSOME song
          </label>
          <input
            className={style.searchInput}
            name='search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={style.searchBtn}>
            wait! we will auto play for you
          </button>
        </form>
      </div>
      <div>
        {musicToPlay.map((ss) => (
          <div style={{ display: 'none' }}>
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
