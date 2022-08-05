import React, { useEffect, useState, useRefresh } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faArrowCircleRight,
  faArrowCircleLeft,
} from "@fortawesome/fontawesome-free-solid";
import { faCircleMinus, faCirclePlus,faCircleArrowDown,faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import Slider from "infinite-react-carousel";
import { useRecoilState,useRecoilValue } from "recoil";
import { Datasearch,GetDatasearch } from "./Datasearch";
import moment from "moment";
const Formdata = (props) => {
  const BASE_URL = "https://api.themoviedb.org/3";
  const api_key = "648e247ec9d10de146e6dca3652a6715";
  const getImage = (path) => `https://image.tmdb.org/t/p/w500/${path}`;
  const [Alldata, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [infodirector, SetInfodirector] = useState("");
  const [infocast, setInfocas] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [isShow, setShow] = useState(false);
  const [isShowsimi, setShowsimi] = useState(false);
  const [generes, setGeneres] = useState([]);
  const [valuegene, SetValueGene] = useState([]);
  const [genre, setGenre] = useState([]);
  const api = axios.create({ baseURL: BASE_URL });
  const getupcoming = api.get(props.flim, {
    params: { api_key },
  });
  const getdirector = (movie_id) =>
    api.get(`/movie/${movie_id}/credits`, {
      params: { api_key },
    });
  const gettrailer = (movie_id) =>
    api.get(`/movie/${movie_id}/videos`, {
      params: { api_key },
    });
  const getgenre = api.get("genre/movie/list", {
    params: { api_key },
  });
  useEffect(() => {
    getupcoming.then((response) => {
      var random = Math.floor(Math.random() * response.data.results.length);
      setData([...data, response.data.results[random]]);
      const defaul = response.data.results;
      const GetOneMovie = defaul.splice(random, 1);
      setAllData([...Alldata, defaul]);
      SetValueGene([...valuegene, GetOneMovie[0].genre_ids]);
      const movieID= GetOneMovie[0].id
      getdirector(movieID).then((response) => {
        const createdirector = response.data.crew;
        const searchdirector = createdirector.find(
          (item) => item.job === "Director"
        );
        const createcast = response.data.cast;
        const searchcast = createcast.map((item) => item.name);
        setInfocas(searchcast);
        SetInfodirector(searchdirector.name);
      });
      gettrailer(movieID).then((response) => {
        setTrailer([...trailer,response.data.results[response.data.results.length - 1].key]);
      });
      getgenre.then((response) => {
        const dataGene = response.data.genres;
        setGeneres([...generes, dataGene]);
      });
    });
  }, []);
  const showgenre = () => {
    setShow(!isShow);
    const arr = [];
    valuegene[0].forEach((itemm, index) => {
      const result = generes[0].find((item) => item.id === itemm);
      arr.push(result);
    });
    console.log(arr);
    setGenre([...genre, arr]);
  };
  const Changedata = (e) =>{
    const getdata = Alldata[0][e.target.className]
    Alldata[0][e.target.className] = data[0]
    data.length = 0
    setData([...data,getdata])
    valuegene.length=0
    genre.length=0
    SetValueGene([...valuegene, getdata.genre_ids]);
    trailer.length=0
    gettrailer(getdata.id).then((response) => {
      setTrailer([...trailer,response.data.results[response.data.results.length - 1].key]);
    });
    getdirector(getdata.id).then((response) => {
      const createdirector = response.data.crew;
      const searchdirector = createdirector.find(
        (item) => item.job === "Director"
      );
      const createcast = response.data.cast;
      const searchcast = createcast.map((item) => item.name);
      setInfocas(searchcast);
      SetInfodirector(searchdirector.name);
    });
    setShow(false)
    setAllData([...Alldata])
    
  }
  const render = (valuedata,auto) =>{
    return(
      <Slider
        slidesToShow={5}
        dots
        duration={100}
        autoplay={auto}
      >
        {Array.from(valuedata).map((index, i) => {
          const setVote = (vote)=>{
            const voted = (convert) => convert.toString().replace('.', '')
            if(vote >=7){
               return (
                "#21d07a"
               )
            }else if (vote >=5){
              return (

                "#d2d531"
               )
            }else {
              return (
                "#db2360"
               )
            }
          }
          return(
          <div className="container_image" >
            <div
              className="image_item" 
              key={i}
              value={i}
            >
              <img src={index.poster_path === null ? 'https://static.thenounproject.com/png/741653-200.png' :  getImage(index.poster_path)} alt="" className={i} onClick={Changedata}/>
              <div className="votecirle"><div className="vote" style={{color: setVote(index.vote_average)}}><h1>{index.vote_average.toString().replace('.','')}<b style={{fontSize:"1rem",position:"absolute"}}>%</b></h1></div>
                <div className="infordetail">
                  <div className="infotittle"><h1 style={{fontSize:"1.6rem"}}>{index.original_title}</h1></div>
                  <p style={{fontSize:"1.6rem",color: "rgba(0,0,0,0.6)"}}>{moment(index.release_date).format("MMMM DD, YYYY")}</p>
                </div>
              </div>
            </div>
          </div>
        )})}
      </Slider>
    )
  }
  const showrender = (valuedata,auto) =>{
    return(
      <Slider
        slidesToShow={5}
        dots
        duration={100}
        autoplay={auto}
      >
        {Array.from(valuedata).map((index, i) => {
          const setVote = (vote)=>{
            const voted = (convert) => convert.toString().replace('.', '')
            if(vote >=7){
               return (
                "#21d07a"
               )
            }else if (vote >=5){
              return (

                "#d2d531"
               )
            }else {
              return (
                "#db2360"
               )
            }
          }
          return(
          <div className="container_image" >
            <div
              className="image_item" 
              key={i}
              value={i}
            >
              <img src={index.poster_path === null ? 'https://static.thenounproject.com/png/741653-200.png' :  getImage(index.poster_path)} alt="" className={i} onClick={transferdata}/>
              <div className="votecirle"><div className="vote" style={{color: setVote(index.vote_average)}}><h1>{index.vote_average.toString().replace('.','')}<b style={{fontSize:"1rem",position:"absolute"}}>%</b></h1></div>
                <div className="infordetail">
                  <div className="infotittle"><h1 style={{fontSize:"1.6rem"}}>{index.original_title}</h1></div>
                  <p style={{fontSize:"1.6rem",color: "rgba(0,0,0,0.6)"}}>{moment(index.release_date).format("MMMM DD, YYYY")}</p>
                </div>
              </div>
            </div>
          </div>
        )})}
      </Slider>
    )
  }
  const showsimi = ()=>{
    setShowsimi(!isShowsimi)
  }
  const [enter,setEnter] = useRecoilState(Datasearch);
  const [dataSearch,SetdataSearch] = useRecoilState(GetDatasearch)
  const [resultSearch,setResultSearch] = useState([])
  const seachResult = () =>{
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${dataSearch}`)
    .then((res) => {
      setResultSearch(res.data.results)
    })
    return(
      <div className="ShowSearch" 
      style={
            enter
              ? {
                  transform: "translate(-50%,-50%)",
                  opacity: "1",
                  transition: "all 1s ease-out",
                }
              : { opacity: "0", transform: "translate(-50%,-1000%)", }
          }
     >
          <div className="Closesearch" onClick={()=>setEnter(!enter)}><h1>X</h1></div>
          <div className="showTop"><h1>top results</h1></div>
          <div className="showimage">
            {resultSearch.length === 0 ? <h1 style={{fontSize:'2rem'}}>{"No Result"}</h1> :showrender (resultSearch,true)}
          </div>

      </div>
    )
  }
  const transferdata = (e) =>{
    setEnter(!enter)
    setShow(false)
    const getdata = resultSearch[e.target.className]
    setData([getdata])
    valuegene.length=0
    genre.length=0
    SetValueGene([...valuegene, getdata.genre_ids]);
    gettrailer(getdata.id).then((response) => {
      setTrailer([response.data.results[response.data.results.length - 1].key]);
    });
    getdirector(getdata.id).then((response) => {
      const createdirector = response.data.crew;
      const searchdirector = createdirector.find(
        (item) => item.job === "Director"
      );
      const createcast = response.data.cast;
      const searchcast = createcast.map((item) => item.name);
      setInfocas(searchcast);
      SetInfodirector(searchdirector.name);
    });
  }
  return (
    <div>
      {data.map((movie, index) => {
        return (
          <div className="content" key={index}>
            <div className="conent_poster">
              <img src={getImage(movie.poster_path)} alt="" onClick={()=>console.log(resultSearch)} />
            </div>
            <div className="content_introduction">
              <div className="content_moviename">
                <div>
                  <h1>{movie.original_title}</h1>
                </div>
              </div>
              <div className="content_director">
                <p>director: {infodirector}</p>
              </div>
              <div className="content_story">
                <p>
                  <b>Story: </b>
                  {movie.overview}
                </p>
              </div>
              <div className="content_cats">
                <p>
                  <b>Cast: </b>
                  {infocast.map((cast) => `${cast}, `)}
                </p>
              </div>
              <div className="content_rating">
                <div className="content_popularity">
                  <p>
                    <b>Popularity: </b>
                    {movie.popularity}
                  </p>
                </div>
                <div className="content_release">
                  <p>
                    <b>Release Date: </b>
                    {movie.release_date}
                  </p>
                </div>
              </div>
              <div className="movie_genre">
                <div className="movie_trailer show_genre" onClick={showgenre}>
                  <h1>
                    Show Genre
                    <FontAwesomeIcon
                      className="fa-icon"
                      icon={isShow ? faCircleMinus : faCirclePlus}
                      style={{
                        color: "white",
                        fontSize: "2rem",
                        paddingLeft: "1.5rem",
                      }}
                    />
                  </h1>
                </div>
                <div
                  className="detail_genre"
                  style={
                    isShow
                      ? {
                          transform: "translateX(0)",
                          opacity: "1",
                          transition: "transform 0.5s ease-out",
                        }
                      : {
                          opacity: "0",
                          transform: "translateX(-10%)",
                        }
                  }
                >
                  <ul>
                    {genre[0]?.map((item) => {
                      return <li>{item.name}</li>;
                    })}
                  </ul>
                </div>
              </div>
              <div className="movie_trailer" onClick={() => setOpen(true)}>
                <h1>
                  <FontAwesomeIcon
                    className="fa-icon"
                    icon={faPlay}
                    style={{
                      color: "white",
                      fontSize: "2rem",
                      paddingRight: "1.5rem",
                    }}
                  />
                  Trailer
                </h1>
              </div>
            </div>
          </div>
        );
      })}
      <div>
        <React.Fragment>
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen}
            videoId={trailer}
            onClose={() => setOpen(false)}
          />
        </React.Fragment>
      </div>
      <div className="similar" onClick={showsimi}>
                  <h1>
                  Similiar Show
                    <FontAwesomeIcon
                      className="fa-icon"
                      icon={isShowsimi ? faCircleArrowDown : faCircleArrowUp}
                      style={{
                        color: "white",
                        fontSize: "2rem",
                        paddingLeft: "1.5rem",
                      }}
                    />
                  </h1>
                </div>
      {isShowsimi ? render(Alldata[0],true) : ""}
      {seachResult()}
    </div>
  );
};
export default Formdata;
