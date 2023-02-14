const mongoose = require("mongoose");

//mongoose local connection
mongoose
  .connect("mongodb://localhost:27017/playlist", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful..."))
  .catch((err) => console.log(err));

//schema-->defines the structure of the document

const playListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ctype: {
    type: String,
  },
  videos: {
    type: Number,
  },
  active: {
    type: Boolean,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

///mongoose model is a wrapper on the mongoose schema.
///it provides an interface to the database for creating, querying etc.
///(actually creates the collections)

const PlayList = new mongoose.model("PlayList", playListSchema);

//create document or insert
const createDocument = async () => {
  try {
    const newPlayList = new PlayList({
      name: "Node js",
      ctype: "Back End",
      videos: 0,
      active: true,
      author: "Shazid Morshed",
    });

    const result = await newPlayList.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// createDocument();

//create document or insert (multiple)
const createDocumentMultiple = async () => {
  try {
    const javascriptPlayList = new PlayList({
      name: "Javascript",
      ctype: "Front End",
      videos: 0,
      active: true,
      author: "Shazid Morshed",
    });

    const expressPlayList = new PlayList({
      name: "Express",
      ctype: "Back End",
      videos: 0,
      active: true,
      author: "Shazid Morshed",
    });

    const mongodbPlayList = new PlayList({
      name: "Mongodb",
      ctype: "Back End",
      videos: 0,
      active: true,
      author: "Shazid Morshed",
    });

    const result = await PlayList.insertMany([
      javascriptPlayList,
      expressPlayList,
      mongodbPlayList,
    ]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

//createDocumentMultiple();

//read and querying data from database
const getAllDocuments = async () => {
  try {
    const result = await PlayList.find();
    //       .select({
    //   name: 1,
    //   ctype: 1,
    // });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

//getAllDocuments();

//comparison operators in mongoDB
const usingComparisonOperators = async () => {
  try {
    const result = await PlayList.find({
      //   videos: { $gte: 10, $lte: 50 },
      ctype: { $in: ["Back End", "Database"] },
      //ctype: { $nin: ["Back End", "Database"] },
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

//usingComparisonOperators();

//logical operators in mongoDB
const usingLogicalOperators = async () => {
  try {
    const result = await PlayList.find({
      // $and: [{ author: "Shazid Morshed" }, { ctype: "Back End" }],
      $or: [{ author: "Shazid Morshed" }, { ctype: "Back End" }],
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

usingLogicalOperators();
