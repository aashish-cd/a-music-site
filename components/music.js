import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './music.module.css';
import YouTube from 'react-youtube';
const url = 'https://www.googleapis.com/youtube/v3/search';
const key = 'AIzaSyB4sGKNYZtaIIpPKYXbDn7IjKlyOGfl55Y';
// const key = 'AIzaSyCfuWiUInW0YdBKiK8qwVE1zO5WiDO9yj8';
const Music = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [musicToPlay, setMusicToPlay] = useState([]);
  const [showPlaying, setShowPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
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
    await fetchMusic();
    setShowPlaying(true);

    // console.log('initial');
  }, []);
  const handleSubmit = async () => {
    setShowPlaying(false);
    if (setShowVideo == true) {
      setShowVideo(false);
      setTimeout(() => {
        setShowVideo(true);
      }, 1200);
    }
    await fetchMusic(searchTerm);
    setTimeout(() => {
      setShowPlaying(true);
    }, 1000);
  };

  return (
    <>
      {showPlaying ? (
        <>
          <img src='/giphy.gif' alt='background' className='background-image' />
          <img
            src='/ss.gif'
            alt='background'
            className='background-image-mob'
          />
        </>
      ) : (
        <>
          <img src='/bg.jpg' alt='background' className='background-image' />
          <img
            src='/bg.jpg'
            alt='background'
            className='background-image-mob'
          />
        </>
      )}

      <div className={style.container}>
        {/* <h1>not AweSOME music app</h1> */}

        <div>
          <label className={style.searchLabel} htmlFor='search'>
            search aweSOME song and we will play it for you
          </label>
          <input
            className={style.searchInput}
            name='search'
            placeholder='enter your song'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={style.searchBtn} onClick={handleSubmit}>
            Play
          </button>
          {showPlaying ? <p>now Playing: {searchTerm}</p> : ''}
        </div>
      </div>
      <div>
        <button onClick={() => setShowVideo(!showVideo)}>
          {showVideo ? 'hide Video' : 'show Video'}
        </button>
        {musicToPlay.map((ss, index) => (
          <div
            className={showVideo ? style.videoShow : style.video}
            key={index}
          >
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
                height: '500',
                width: '1000',
                playerVars: {
                  autoplay: 1,
                  loop: 1,
                },
              }}
            />
            <span>AutoPlay doesn&apos;t works on phone, play from here</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Music;
