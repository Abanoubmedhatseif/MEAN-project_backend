const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');

const createAdminAccount = async (req, res) => {
  try {
    const { password, userName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      userName,
      password: hashedPassword,
    });

    const savedAdminAccount = await admin.save();

    const token = jwt.sign({ adminId: savedAdminAccount._id }, 'myRandomKey');

    res.status(201).json({
      message: 'Admin account created successfully',
      admin: savedAdminAccount,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const admin = await Admin.findOne({ userName });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ adminId: admin._id }, 'myRandomKey');

    res.status(200).json({
      message: 'Login successful',
      admin: {
        _id: admin._id,
        userName: admin.userName,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createAdminAccount, loginAdmin };
