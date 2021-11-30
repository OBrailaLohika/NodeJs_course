import Movie, {IMovie} from '../models/movie-model';
import axios from 'axios';
import { imdbApiKey, omdbPath } from '../routes/endpoints';
import { logErrorMsg } from '../utils/logger/logActions';

import type { Request, Response } from "express";
import { Error } from 'mongoose';



const getOmdbMovieData = async(movieName: String) => {
  try {
    const {statusText, data} = await axios.get(
      `${omdbPath}?t=godfatherhttp://www.omdbapi.com/?t=${movieName}&apikey=${imdbApiKey}`
      );
    return statusText === 'OK' && data ? data : null;
  } catch(error) {
    logErrorMsg(`${error}`);
  }
}

const createMovie = (req: Request, res: Response) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a movie',
    });
  }

  const movie = new Movie(body);

  if (!movie) {
    return res.status(400).json({ success: false, error: "Couldn't create movie model" });
  }

  movie
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: movie._id,
        message: 'Movie created!',
      });
    })
    .catch((error: Error) => {
      return res.status(400).json({
        error,
        message: 'Movie not created!',
      });
    });
};

const updateMovie = async (req: Request, res: Response) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  Movie.findOne({ _id: req.params.id }, (err: Error, movie: IMovie) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Movie not found!',
      });
      
    }
    movie.name = body.name;
    movie.comment = body.comment;
    movie.imdbRating = body.rating;
    movie.personalScore = body.personalScore;
    movie
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: movie.imdbID,
          message: 'Movie updated!',
        });
      })
      .catch((error: Error) => {
        return res.status(404).json({
          error,
          message: 'Movie not updated!',
        });
      });
  });
};

const deleteMovie = async (req: Request, res: Response) => {
  await Movie.findOneAndDelete({ _id: req.params.id }, (err: Error, movie: IMovie) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!movie) {
      return res.status(404).json({ success: false, error: `Movie not found` });
    }

    return res.status(200).json({ success: true, data: movie });
  }).catch((err: Error) => console.log(err));
};

const getMovieById = async (req: Request, res: Response) => {
  await Movie.findOne({ _id: req.params.id }, (err: Error, movie: IMovie) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!movie) {
      return res.status(404).json({ success: false, error: `Movie not found` });
    }
    return res.status(200).json({ success: true, data: movie });
  }).catch((err: Error) => console.log(err));
};

const getMovies = async (req: Request, res: Response) => {
  await Movie.find({}, (err: Error, movies: IMovie[]) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!movies.length) {
      return res.status(404).json({ success: false, error: `Movie not found` });
    }
    return res.status(200).json({ success: true, data: movies });
  }).catch((err: Error) => console.log(err));
};

export default {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovies,
  getMovieById,
};
