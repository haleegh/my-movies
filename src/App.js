import React, { useReducer, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState = {
  loading: true,
  movies: [],
  errorMessage : null
}

/* 3가지 useState(componentDidMount, componentDidUpdate, componentWillUnmount)
를 결합하는 방식이 'useReducer' */

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST' :
      return {
        ...state,
        loading: true,
        errorMessage: null
      }
    case 'SEARCH_MOVIES_SUCCESS' :
      return {
        ...state,
        loading: false,
        movies: action.payload
      }
    case 'SEARCH_MOVIES_FAILURE' :
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }
    default :
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(()=> {
    async function initialize() {
      const response = await fetch(MOVIE_API_URL)
      const jsonResponse = await response.json()

      if(jsonResponse) {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.Search
        })
      }
    }
    initialize()
  }, [])
  
  
  const search = (searchValue) => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST'
    })

    async function initialize() {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      const jsonResponse = await response.json()
      if(jsonResponse) {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.Search
        })
      } else {
        dispatch({
          type: ' SEARCH_MOVIES_FAILURE',
          error: jsonResponse.Error
        })
      }
    }

    initialize()
  };

  const {movies, errorMessage, loading} = state

  return (
    <div className="App">
      <Header text="My Movies"/>
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={index} movie={movie} />
            //key={`${index}-${movie.Title}`}
          ))
        )}
      </div>
    </div>
  );
};

export default App;
