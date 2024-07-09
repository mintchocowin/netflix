import React, {useState,useEffect} from "react";
import styled from "styled-components";
import {useLocation,Routes,Link,useMatch} from "react-router-dom";
import {useQuery} from "react-query";
import {IGetmoviesResult,IGetGeneresResult,getGenres,IMovie} from "../api"
import { makeImagePath } from "../util";
import Youtube from "react-youtube";
import Review from "../components/Review";
import Related from "../components/Related";
import Pagination from "react-js-pagination";

const SearchBox = styled.div`
  padding: 100px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentSection = styled.div`
  display: flex;
  img {
    width: 800px;
    margin-right: 20px;
  }
`;

const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
`;

const SearchTitle = styled.div`
  font-size: 42px;
  background-color: ${(props) => props.theme.red};
  border-radius: 14px 0 14px 0;
`;

const SearchOverview = styled.p`
  font-size: 18px;
  margin: 10px 0;
  margin-bottom: 32px;
  padding: 18px 0;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
`;

const SearchDate = styled.div`
  font-size: 18px;
  span {
    display: inline-block;
    width: 100px;
    text-align: center;
    background-color: #ffa300;
    color: ${(props) => props.theme.black.darker};
    border-radius: 14px 0 0 0;
    margin-right: 8px;
    padding: 8px;
  }
`;

const SearchValue = styled.div`
  font-size: 18px;
  margin: 10px 0;
  span {
    display: inline-block;
    width: 100px;
    text-align: center;
    background-color: #ffa300;
    color: ${(props) => props.theme.black.darker};
    border-radius: 14px 0 0 0;
    margin-right: 8px;
    padding: 8px;
  }
`;

const SearchPoint = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  span {
    display: inline-block;
    width: 100px;
    text-align: center;
    background-color: #ffa300;
    color: ${(props) => props.theme.black.darker};
    border-radius: 14px 0 0 0;
    margin-right: 8px;
    padding: 8px;
  }
`;

const SearchGeneres = styled.div`
  font-size: 18px;
  span {
    display: inline-block;
    width: 100px;
    text-align: center;
    background-color: #ffa300;
    color: ${(props) => props.theme.black.darker};
    border-radius: 14px 0 0 0;
    margin-right: 8px;
    padding: 8px;
  }
`;

const Tabs = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 25px 0;
  padding-left: 100px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 1);
  padding: 7px 30px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.red : props.theme.black.darker};
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.red};
    color: #fff;
  }
`;

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  ul {
    display: flex;
    list-style: none;
    padding: 0;
  }
  li {
    display: inline;
    margin: 0 5px;
    a {
      text-decoration: none;
      color: #fff;
      padding: 5px 10px;
      border-radius: 50%;
      transition: background-color 0.3s, color 0.3s;
      &:hover {
        background-color: ${(props) => props.theme.red};
        color: #fff;
      }
    }
    &.active a {
      color: #fff;
      background-color: ${(props) => props.theme.red};
    }
  }
`;

const Search = () =>{
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const API_KEY="fdf853894471ff5ff1084454abaf171f";
  const BASE_PATH="https://api.themoviedb.org/3";

const searchedMovies = () =>{
return fetch(`${BASE_PATH}/search/multi?query=${keyword}&api_key=${API_KEY}&language=ko-kr&page=1`
).then((response)=>response.json());
};

const {data:movieData, isLoading: movieLoading} =
useQuery<IGetmoviesResult>(["movies",keyword],searchedMovies);

const {data:GenereData, isLoading: genreLoading} =
useQuery<IGetGeneresResult>(["getGeneres"],getGeneres);

type Content ={
  author:string;
  content:string;
  title:string;
  backdrop_path:string;
}

type ContentsState<T> ={
  [key:number] :T[];
};

const [reviews, setReviews] = useState<ContentsState<Content>>({});
const [videos, setVideos] = useState<ContentsState<string>>({});
const [recommends, setRecommends] = useState<ContentsState<Content>>({});

const fetchReviews = (movieId:number)=>{
  return fetch(
    `${BASE_PATH}/movie/${movieId}/reviews?language=en-US&page=1&api_key=${API_KEY}`
  ).then((response)=>response.json());
};

const fetchVideos = (movieId:number) =>{
  return fetch(
    `${BASE_PATH}/movie/${movieId}/reviews?language=en-US&page=1&api_key=${API_KEY}`
  ).then((response)=>response.json());
};

const fetchRecommends = (movieId:number) =>{
return fetch(
  `${BASE_PATH}/movie/&{movieId}/recommendations?language=en-US&page=1&api_key=${API_KEY}`
).then((response)=>response.json())
};

useEffect(()=>{
  if(movieData){
    movieData.results.forEach((movie)=>{
      fetchReviews(movie.id).then((reviewData)=>
      setReviews((prev)=>({
        ...prev,
        [movie.id]:reviewData?.results?.map((review:any)=>
        author:review.author,
      content:reviewData.content,0)
      })))
    })
  }
})



}