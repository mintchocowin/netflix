import React, {useState} from "react";
import styled from "styled-components";
import{useQuery} from "react-query";
import {motion,AnimatePresence, useScroll} from "framer-motion";
import {useNavigate,useMatch, PathMatch} from "react-router-dom";
import {getMovies,IGetmoviesResult} from "../api";
import {makeImagePath} from "../util";