import jwt from "jsonwebtoken";

export const gentoken = (user, res) => {
  try {
    const payload = {
      id: user._id,
      role: user.role || "admin",
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    }); //s, m

    console.log(token);

    res.cookie("parleG", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
      sameSite: "lax", //lax special mode of cookie
    });
  } catch (error) {
    throw error;
  }
};

export const getotptoken = (user, res) => {
  try {
    const payload = {
      id: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10m",
    }); //s, m

    console.log(token);

    res.cookie("otpToken", token, {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
      secure: false,
      sameSite: "lax", //lax special mode of cookie
    });
  } catch (error) {
    throw error;
  }
};
