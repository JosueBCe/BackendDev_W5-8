const mongodb = require('../models/connectdb'); // requires functions from db/connect
const ObjectId = require('mongodb').ObjectId; // Requieres the ID 


// Function that allows to get the collection "UserS"
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db("ecommerce").collection("users").find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

};

// const getByCategory = async (req, res) => {
//   try {
//     const UserCategory = req.params.admin
//     const result = await mongodb
//       .getDb()
//       .db("ecommerce")
//       .collection("users")
//       .find({ admin : UserCategory == true });
//     result.toArray().then((lists) => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(200).json(lists);
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// };

const getById = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("ecommerce")
      .collection("users")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

const addNewUser = async (req, res) => {
  try {
    const user = {
        admin : req.body.admin,
        name : req.body.name,
        lastname : req.body.lastname,
        email : req.body.email,
        phone : req.body.phone,
        country : req.body.country,
        password : req.body.password

    };
    // Inserting in DB New User
    const response = await mongodb
      .getDb()
      .db("ecommerce")
      .collection("users")
      .insertOne(user);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || "Some error occurred while creating the User");
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id); // Get the id specified in the url parameter
    const user = {
    
        admin : req.body.admin,
      name : req.body.name,
      lastname : req.body.lastname,
      email : req.body.email,
      phone : req.body.phone,
      country : req.body.country,
      password : req.body.password
    };
    const response = await mongodb
      .getDb()
      .db("ecommerce")
      .collection("users")
      .replaceOne({ _id: userId }, user);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the User.');
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};


const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await
      mongodb.getDb()
        .db("ecommerce")
        .collection("users")
        .deleteOne({ _id: userId });

    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the User.');
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};
module.exports = { getAll, getById, addNewUser, updateUser, deleteUser } //getByCategory