const kafka = require('../kafka/client');
const { ADD_POST_TEXT, ADD_POST_IMAGE, ADD_POST_LINK, GET_POST, GET_POST_COMMUNITY, GET_POST_BY_ID,
  SEARCH_POST_BY_CRITERIA, SORT_DASHPOSTS_BY_UPVOTES } = require('../kafka/topics');
var { auth, checkAuth } = require('../utils/passport')
auth();

exports.addPostText = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(ADD_POST_TEXT, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        //role: results.role,
      });
    }
  });
};

exports.addPostImage = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(ADD_POST_IMAGE, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      //  console.log(results);
      res.status(200).json({
        msg: results.msg,
        //role: results.role,
      });
    }
  });
};

exports.addPostLink = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(ADD_POST_LINK, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        //role: results.role,
      });
    }
  });
};

exports.getPosts = async (req, res) => {
  // console.log("******getPosts backend controller********");

  const payload = { body: req.body };
  kafka.make_request(GET_POST, payload, (error, results) => {
    // console.log("******results********", results);

    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
        success: results.success
        //role: results.role,
      });
    }
  });
};

exports.getPostbyID = async (req, res) => {
  console.log("******getPostbyID backend controller********");

  const payload = { body: req.body };

  kafka.make_request(GET_POST_BY_ID, payload, (error, results) => {
    console.log("******results********", results);
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        //role: results.role,
      });
    }
  });
};

exports.getPostCommunity = async (req, res) => {
  // console.log("******getPosts backend controller********");

  const payload = { body: req.body };
  kafka.make_request(GET_POST_COMMUNITY, payload, (error, results) => {
    // console.log("******results********", results);

    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
        success: results.success
        //role: results.role,
      });
    }
  });
};

exports.searchPostsCriteria = async (req, res) => {
  const payload = { searchPostsCriteria: req.query.searchText };
  console.log("payload is:", payload);
  kafka.make_request(SEARCH_POST_BY_CRITERIA, payload, (error, results) => {
    if (!results.success) {
      console.log("error:", results);
      res.status(400).send(results);
    } else {
      console.log("results:", results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.sortDashPostsByUpvotes = async (req, res) => {
  const payload = {
    userId: req.body.userId
  };
  console.log("payload is:", payload);
  kafka.make_request(SORT_DASHPOSTS_BY_UPVOTES, payload, (error, results) => {
    if (!results.success) {
      console.log("error:", results);
      res.status(400).send(results);
    } else {
      console.log("results:", results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
}