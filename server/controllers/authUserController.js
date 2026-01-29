const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {

  try {

    const { username, fname, lname, email, phone, password } = req.body;

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const EmailExists = await User.findOne({ email });
    if (EmailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, fname, email, lname, phone, password: hashedPassword });

    const token = jwt.sign({ id: user._id, role: user.role, fname: user.fname, email: user.email }, process.env.JWT_SECRET, { expiresIn: "24hr" });

    await User.findByIdAndUpdate(
      user._id,
      {

        $inc: { count: 1 } // increment count by 1
      },
      { new: true }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
}

exports.loginUser = async (req, res) => {
  try {

    const { identifier, password } = req.body;



    const user = await User.findOne({
      $or: [
        { username: identifier },
        { email: identifier }
      ]
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }


    const token = jwt.sign({ id: user._id, role: user.role, fname: user.fname }, process.env.JWT_SECRET, { expiresIn: "24hr" });

    await User.findByIdAndUpdate(
      user._id,
      {
        status: !user.status,
        $inc: { count: 1 } // increment count by 1
      },
      { new: true }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.getUsers = async (req, res) => {
  try {

    const users = await User.find()
    if (!users) return res.json({ message: "No Users" })
    res.json({ users })

  } catch (error) {
    console.error(error)
  }
}

exports.updateUserInfo = async (req, res) => {
  try {
    const { fname, lname, email, phone, role } = req.body

    const updateData = {}
    if (fname) updateData.fname = fname.trim()
    if (lname) updateData.lname = lname.trim()
    if (email) updateData.email = email.trim()
    if (phone) updateData.phone = phone.trim()
    if (role) updateData.role = role.trim()

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update",
      })
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    // ✅ Return the full updated user
    return res.status(200).json({
      message: "User updated successfully",
      updatedUser, // <--- this is critical
    })
  } catch (err) {
    console.error("Update user error:", err)
    res.status(500).json({ message: "Server error" })
  }
}




exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      deletedUserId: deletedUser._id, // <-- send ID for frontend
    });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error" });
  }
}


exports.userLogedOut = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = false; // or `!user.status` if you actually want to toggle
    await user.save();

    res.status(200).json({ message: "User logged out successfully", status: user.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProfile = async (req, res) => {
  const { id } = req.params; // ✅ correct param

  try {
    const profile = await User.findById(id).select(
      "username fname lname email phone"
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found!" });
    }

    return res.status(200).json({ profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, fname, lname, email, phone } = req.body;

  try {
    const updatedProfile = await User.findByIdAndUpdate(
      id,
      {
        username,
        fname,
        lname,
        email,
        phone,
      },
      {
        new: true,        // return updated doc
        runValidators: true,
      }
    ).select("username fname lname email phone");

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found!" });
    }

    return res.status(200).json({
      profile: updatedProfile,
      response: { message: "Profile updated successfully" },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
