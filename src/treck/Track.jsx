/* eslint-disable react/prop-types */
import Progres from "../progres/Progres";
import audio from "../util/audio";

function Track(props) {
  
  const song = props.item;
  const play = () => {
    props.handlePlay(song.id);
    setTimeout(() => {
      if(audio.aud.src === song.preview){
        audio.aud.src = '';
        props.handlePlay(null);
      }
    }, 30000);
  }
  return (
    <div className="col-3">
      <div className="card mb-3">
        <img src={song.album.cover_medium} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{song.title}</h5>
          <h5 className="card-text">{song.artist.name}</h5>
          <p className="card-text">
            {song.album.title}
          </p>
          <button onClick={() => play()} className={`btn ${audio.aud.src === song.preview? 'btn-danger':'btn-success'}`}>
            {audio.aud.src === song.preview?'Stop':'Play'}
          </button>
          <Progres song={song}/>
        </div>
      </div>
    </div>
  );
}

export default Track;
