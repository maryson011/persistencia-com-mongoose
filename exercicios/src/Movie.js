const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    rated: { type: String, required: true },
    runtime: Number,
    num_mflix_comments: Number,
    countries: { type: [String], required: true },
    genres: { type: [String], required: true },
    directors: { type: [String], required: true },
    writers: { type: [String], required: true },
    cast: { type: [String], required: true },
    languages: { type: [String], required: true },
    plot: { type: String, required: true },
    fullPlot: String,
    poster: String,
    imdb: {
        id: Number,
        rating: Number,
        votes: Number,
    },
    tomato: {
        viewer: {
            meter: Number,
            rating: Number,
            numReviews: Number,
        },
        critic: {
            meter: Number,
            rating: Number,
            numReviews: Number,
        },
        dvd: Number,
        rotten: Number,
        fresh: Number,
        lastUpdated: Number,
        production: String,
    },
    type: String,
    metacritic: Number,
    awards: {
        wins: Number,
        nominations: Number,
        text: String,
    },
    lastUpdated: { type: Date, required: true },
    released: { type: Date, required: true },
});

movieSchema.virtual("premiosTexto").get(function(){
    return `O filme ${this.name} ganhou ${this.awards.win} prêmios e foi indicado à mais ${this.awards.nominations}`
})

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;