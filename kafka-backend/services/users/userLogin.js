const UserModel = require("../../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const { client } = require("../../db");
const secret = "CMPE_273_Splitwise_secret";
const handle_request = async (req, callback) => {
  try {
    const searchTerm = req.body.email;
    client.get(searchTerm, async (err, user) => {
      if (err) throw err;

      if (user) {
        const member = JSON.parse(user);
        if (bcrypt.compareSync(req.body.password, member.password)) {
          const token = jwt.sign(
            { userId: member._id, email: member.email },
            `${process.env.JWT_SECRET}`,
            {
              expiresIn: "4h",
            }
          );

          return callback(null, {
            token,
            msg: "Logged in successfully",
            userId: member._id,
            success: true,
          });
        }
      } else {
        await UserModel.findOne({ email: req.body.email }, (err, doc) => {
          console.log(">>>>>>>>>>>Inside Fetch<<<<<<<<<<<<<");
          if (!doc) {
            //return res.status(404).json({ msg: 'Account Not Found' });
            return callback(null, {
              msg: "Account Not Found",
              success: true,
            });
          }

          //check if password entered matches with the one in DB
          if (bcrypt.compareSync(req.body.password, doc.password)) {
            client.setex(searchTerm, 600, JSON.stringify(doc));
            const token = jwt.sign(
              { userId: doc.id, email: doc.email },
              secret,
              {
                expiresIn: "4h",
              }
            );
            return callback(null, {
              token,
              msg: "Logged in successfully",
              userId: doc.id,
              success: true,
            });
          } else {
            //return res.status(401).json({ msg: 'Invalid Credentials Entered' });
            return callback(null, {
              msg: "Invalid Credentials Entered",
              success: false,
            });
          }
        });
      }
    });
  } catch (err) {}
};

exports.handle_request = handle_request;
