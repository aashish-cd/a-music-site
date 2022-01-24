import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './music.module.css';
import YouTube from 'react-youtube';
const url = 'https://www.googleapis.com/youtube/v3/search';
const key = 'AIzaSyDIkZnXgxHLDmBMcKsjXUI9x6j4bqlaJu8';

const Music = () => {
  const [searchTerm, setSearchTerm] = useState('choo');
  const [musicToPlay, setMusicToPlay] = useState([]);
  const fetchMusic = async () => {
    const res = await axios.get(
      `${url}?part=snippet&maxResults=1&q=${searchTerm}&key=${key}`
    );
    setMusicToPlay(res.data.items);
  };

  // function playVideo() {
  //   var vidurl = $('#play-video').data('url');
  //   $('#player').html(
  //     '<iframe type="text/html" width="640" height="390" src="' +
  //       `https://www.youtube.com/embed/${musicToPlay[0]?.id.videoId}` +
  //       '" frameborder="0"></iframe>'
  //   );
  // }
  // function playVideo(element) {
  //   var vidurl = $(element).data('url');
  //   console.log(vidurl);
  //   $('#player').html(
  //     '<iframe type="text/html" width="640" height="390" src="' +
  //       `https://www.youtube.com/embed/${musicToPlay[0]?.id.videoId}` +
  //       '" frameborder="0"></iframe>'
  //   );
  // }

  const handleSubmit = () => {
    fetchMusic();
  };

  return (
    <>
      <div>
        <form>
          <label className={style.searchLabel} htmlFor='search'>
            search aweSOME song
          </label>
          <input
            className={style.searchInput}
            name='search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onSubmit={handleSubmit}>Play</button>
        </form>
      </div>
      <div className={style.container}>
        {musicToPlay.map((ss) => (
          <div>
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
