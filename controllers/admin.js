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

    res.status(201).json({
      successMessage: 'Admin account created successfully',
      admin: savedAdminAccount,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const admin = await Admin.findOne({ userName });

    if (!admin) {
      return res.status(401).json({ errorMessage: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ errorMessage: 'Invalid username or password' });
    }

    const token = jwt.sign({ adminId: admin._id }, 'myRandomKey');

    res.status(200).json({
      successMessage: 'Login successful',
      admin: {
        _id: admin._id,
        userName: admin.userName,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const updateCredentials = async (req, res) => {
  try {
    const adminId = req.params.id;
    const { userName, password } = req.body;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(401).json({ errorMessage: 'cant find Admin account' });
    }

    if (userName) {
      admin.userName = userName;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    const updatedAdminAccount = await admin.save();
    res.status(201).json({
      successMessage: 'Credentials changed successfully',
      admin: updatedAdminAccount,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      return res.status(401).json({ errorMessage: 'cant find Admin account' });
    }

    res.status(200).json({
      successMessage: 'Admin account deleted successfully',
      admin: deletedAdmin,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = {
  createAdminAccount, loginAdmin, updateCredentials, deleteAdmin,
};
