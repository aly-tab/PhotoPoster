const mongoose = require('mongoose');
mongoose.set('runValidators', true);

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://root:Dolphin76@cluster0.sjxyk.mongodb.net/Cluster0?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Established a connection");
    })
    .catch(()=> {
        console.log("There has been an error");
    })