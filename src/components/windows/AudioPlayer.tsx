/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  MusicIcon,
  NextSongIcon,
  PauseIcon,
  PlayIcon,
  PrevSongIcon,
} from "../Icons";

export const AudioPlayer = () => {
  type SongType = {
    id: string;
    title: string;
    artist: string;
    pathStart: string;
    path: string;
  };

  const [songsAreLoading, setSongsAreLoading] = React.useState(true);
  const [songs, setSongs] = React.useState<any>();
  const [art, setArt] = React.useState<string>();
  const [album, setAlbum] = React.useState<string>();
  const [owner, setOwner] = React.useState<string>();
  const [currentSong, setCurrentSong] = React.useState<any>();
  const [playing, setIsPlaying] = React.useState(false);

  const audioRef = React.useRef<HTMLAudioElement>(null);

  const pathStart =
    "https://res.cloudinary.com/jendowns/raw/upload/v1766211356";
  const pathEnd = "/jen.computer/jams/songs.json";

  React.useEffect(() => {
    if (!songsAreLoading) {
      return;
    }

    fetch(`${pathStart}${pathEnd}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.songs)
        setSongs(json.songs);
        setArt(json.art);
        setAlbum(json.album);
        setOwner(json.owner);
        setCurrentSong(json.songs[0]);
        setSongsAreLoading(false);
      });
  }, [songsAreLoading, setCurrentSong, setSongsAreLoading, setSongs]);

  if (!songs) {
    return (
      <span style={{ padding: "1rem", height: "100px", display: "block" }}>
        an error occurred... :(
      </span>
    );
  }

  const getSongIndex = (song: SongType): number => songs.indexOf(song);

  const findSong = (id: string): SongType => {
    const song = songs.find((o: any) => o.id === id);
    return song;
  };

  const onSongLoaded = () => {
    if (playing) {
      audioRef.current?.play();
    }
  };

  const changeSong = (id: string) => {
    const song = findSong(id);
    if (song) {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const prevSong = () => {
    const currentIndex = getSongIndex(currentSong);
    if (currentIndex === 0) {
      changeSong(songs[songs.length - 1].id);
    } else {
      changeSong(songs[currentIndex - 1].id);
    }
  };

  const nextSong = () => {
    const currentIndex = getSongIndex(currentSong);
    if (currentIndex === songs.length - 1) {
      changeSong(songs[0].id);
    } else {
      changeSong(songs[currentIndex + 1].id);
    }
  };

  const playOrPauseSong = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="audio-wrapper">
      <figure>
        <div className="audio-player-art" style={{ backgroundImage: `url(${art})`}}></div>
        <figcaption>
          <div className="song-marquee">
            <span
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <MusicIcon />
              <span id="playing">
                {`${currentSong?.title} by ${currentSong?.artist}`}
              </span>
              <MusicIcon />
            </span>
          </div>
        </figcaption>
        <audio
          ref={audioRef}
          preload="auto"
          loop
          src={`${currentSong.pathStart}${currentSong.path}`}
          onLoadedData={() => onSongLoaded()}
        ></audio>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <button
            id="prev-button"
            aria-label="previous song"
            className="audio-button audio-button-small"
            onClick={() => prevSong()}
          >
            <PrevSongIcon />
          </button>
          <button
            id="play-button"
            className="audio-button"
            onClick={() => playOrPauseSong()}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            id="next-button"
            aria-label="next song"
            className="audio-button audio-button-small"
            onClick={() => nextSong()}
          >
            <NextSongIcon />
          </button>
        </div>
      </figure>
      <ul className="song-list">
        {songs.map((song: any) => (
          <li key={song.id}>
            <button
              id={song.id}
              onClick={() => changeSong(song.id)}
              aria-current={currentSong.id == song.id}
            >
              {song.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <small
          style={{
            fontSize: "0.6rem",
            color: "#444",
            textShadow: "1px 1px white",
          }}
        >
          Music from {album}, &copy;{owner}
        </small>
      </p>
    </div>
  );
};
