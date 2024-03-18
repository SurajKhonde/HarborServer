const mongoose = require('mongoose');

mongoose
    .connect("mongodb+srv://surajrkhonde:mLHVwjTYxjgMapED@cluster001.toagofm.mongodb.net/")
    .then(() => {
        console.log('db is connected!')
    })
    .catch((ex) => {
        console.log('db connection failed: ', ex)
    })
    