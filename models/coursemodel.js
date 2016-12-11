const mongoose = require('mongoose');

// Модель карты курса для базы

const courseSchema = mongoose.Schema({

    card: {
        link: {
            type: String,
            default: "#"
        },
        title: {
            type: String,
            default: "Course title"
        },
        author: {
            type: String,
            default: "Author not known"
        },
        description: {
            type: String,
            default: "No description"
        },
        date: {
            type: Date,
            default: Date.now
        },
        image: {
            type: String,
            default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=250"
        },
        language: {
            type: String,
            default: "Eng"
        },
        type: {
            type: String,
            default: "Video"
        },
        free: {
            type: Boolean,
            default: true
        },
        tags: {
            type: Array,
            default: ["frontend"]
        },
        level: {
            type: Number,
            default: 1,
            min: 1,
            max: 3
        },
        submittedBy: {
            type: String,
            default: "System"
        },
        vox: {
            favs: {
                type: Number,
                default: 0,
                min: 0
            },
            votes: {
                type: Number,
                default: 0,
                min: 0
            },
            views: {
                type: Number,
                default: 0,
                min: 0
            }
        }
    },

    author: {
      nickname: {
        type: String
      },
      email: {
        type: String
      }
    }
});

module.exports = mongoose.model('Course', courseSchema);
