const mongoose = require('mongoose');
mongoose.set('runValidators', true);

mongoose.connect("mongodb+srv://root:Dolphin76@cluster0.sjxyk.mongodb.net/Cluster0?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Established a connection");
    })
    .catch(()=> {
        console.log("There has been an error");
    })