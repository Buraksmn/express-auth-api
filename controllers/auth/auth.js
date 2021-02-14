const { generateToken, decodeToken } = require("../../utils/token");
const { authenticationSC } = require("../../models/authModel");

const register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await authenticationSC.findOne({ email }).exec();
    if (user) {
      throw "email adresi daha önceden tanımlanmıştır.";
    } else {
      authenticationSC
        .create({
          username,
          email,
          password,
        })
        .then((result) => {
          const { _id, username } = result;
          const token = generateToken({ _id, username });
          res
            .json({
              isSuccess: true,
              message: "Kayıt işlemi başarılı",
              token,
            })
            .status(200);
        })
        .catch((err) => {
          res.json({ message: err, isSuccess: false }).status(400);
        });
    }
  } catch (error) {
    res.json({ isSuccess: false, message: error }).status(400);
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await authenticationSC.findOne({
      email,
      password,
    });
    if (user) {
      const { _id, username, email } = user;
      const token = generateToken({ _id, username, email });
      res.json({ isSuccess: true, token }).status(200);
    } else {
      throw "Email adresinizi veya şifrenizi kontrol ediniz.";
    }
  } catch (error) {
    res.json({ message: error, isSuccess: false }).status(400);
  }
};

const forgot = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await authenticationSC.findOne({ email });
    if (user) {
      const { _id } = user;
      const token = generateToken({ _id });
      res
        .json({
          isSuccess: true,
          token,
          message: "Lütfen e-posta adresinizi kontrol ediniz",
        })
        .status(200);
    } else {
      throw "Email adresinizi veya şifrenizi kontrol ediniz.";
    }
  } catch (error) {
    res.json({ message: error, isSuccess: false }).status(400);
  }
};

const resetPw = async (req, res) => {
  const { token, password } = req.body;
  // ?  2 tane pw  isteyip karşılaştırma işlemi frontend tarafında yapılması daha mantklı
  const decodedToken = decodeToken(token);
  console.log(decodedToken);
  if (decodedToken !== null) {
    const { _id } = decodedToken;
    try {
      const user = await authenticationSC.findOne({ _id });
      if (user) {
        console.log(user);
        user.password = password;
        const updatetedUser = await user.save();
        res
          .json({
            isSuccess: true,
          })
          .status(200);
      } else {
        throw "Bir sorunla karşılaşıldı";
      }
    } catch (error) {
      res.json({ message: error, isSuccess: false }).status(400);
    }
  }
  res.json({ message: "Geçersiz token", isSuccess: false }).status(400);
};

module.exports = { register, login, forgot, resetPw };
