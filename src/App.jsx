import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
import Track from './treck/Track';
import audio from './util/audio'

function App(){
  const [name, setName] = useState('');
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const search = () => {
    if(name && name != ' '){

      setIsLoading(true);
      axios.get(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${name}`, {headers: {
        'X-RapidAPI-Key': '439a910f28mshce52b8eb2dd0ed6p1ca6b3jsnba1af12dd94f',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }}).then(res => {
        setSongs(res.data.data);
        setIsLoading(false);
      })
    }
  }

  const handlePlay = (id) =>{
    if(id === currentTrack || id === null){
      audio.aud.src = '';
      setCurrentTrack(null);
    }
    else{
      setCurrentTrack(songs.filter(s => s.id === id)[0].id);
      audio.aud.src = songs.filter(s => s.id === id)[0].preview;
      audio.aud.play();
    }
  }

  return (
    <div className='container'>

      <div className='row mt-5'>
        <div className='col-3'></div>
        <div className='col-5'>
          <input onKeyUp={(e) => e.key === 'Enter' && search()} value={name} onChange={(e) => {setName(e.target.value)}} type="text" placeholder='artist...' className="form-control" />
        </div>
        <div className='col-1'>
          <button onClick={() => search()} className="btn btn-success">Search</button>
        </div>
      </div>

      {isLoading ?(<div className='text-center'>
        <img src='/c7e1b7b5753737039e1bdbda578132b8.gif'/>
      </div>):
      (<div className="row mt-5">
        {songs.map(item => (
          <Track key={item.id} handlePlay={handlePlay} item={item}/>
          ))}
      </div>)
      }

    </div>
  )
}

export default App
