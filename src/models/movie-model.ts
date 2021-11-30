const mongoose = require('mongoose')
const Schema = mongoose.Schema

export interface IMovie {
  imdbID?: String
  name?: String
  comment?: String
  personalScore?: Number
  Title?: String
  Year?: Number
  Released?: String
  Runtime?: String
  Genre?: String
  Director?: String
  Writer?: String
  Actors?: String
  Language?: String
  Country?: String
  Poster?: String
  imdbRating?: String
  imdbVotes?: String
  DVD?: String
  save: () => Promise<any>
}

const Movie = new Schema(
    {
      imdbID: { type: String, required: false },
      name: { type: String, required: false },
      comment: { type: String, required: false },
      personalScore: { type: Number, required: false },
      Title: { type: String, required: false },
      Year: { type: Number, required: false },
      Released: { type: String, required: false },
      Runtime: { type: String, required: false },
      Genre: { type: String, required: false },
      Director: { type: String, required: false },
      Writer: { type: String, required: false },
      Actors: { type: String, required: false },
      Language: { type: String, required: false },
      Country: { type: String, required: false },
      Poster: { type: String, required: false },
      imdbRating: { type: String, required: false },
      imdbVotes: { type: String, required: false },
      DVD: { type: String, required: false },
    },
    { timestamps: true },
)

export default mongoose.model('movies', Movie)