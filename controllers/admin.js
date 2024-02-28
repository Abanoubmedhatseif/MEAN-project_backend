const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../Models/admin');

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
      message: 'Admin account created successfully',
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
      res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      res.status(401).json({ error: 'Invalid username or password' });
    }

    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ adminId: admin._id, role: 'admin' }, 'myRandomKey');

    res.status(200).json({
      message: 'Login successful',
      admin: {
        // eslint-disable-next-line no-underscore-dangle
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
      res.status(401).json({ error: 'cant find Admin account' });
    }

    if (username) {
      admin.userName = username;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    const updatedAdminAccount = await admin.save();
    res.status(201).json({
      message: 'Credentials changed successfully',
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
      res.status(401).json({ error: 'cant find Admin account' });
    }

    res.status(200).json({
      message: 'Admin account deleted successfully',
      admin: deletedAdmin,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = {
  createAdminAccount,
  loginAdmin,
  updateCredentials,
  deleteAdmin,
};
