const mongoose = require ("mongoose");
require('dotenv').config()
mongoose.connect(`${process.env.DATABASE_URL}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})

.then(() => {
    console.log("Suecessfully connected to MongodB");
})
.catch((err)=>{
    console.error("Error connecting to MongodB:", err);
});

