const jwt = require("jsonwebtoken");
const { JWT_AC_SECRET, JWT_AC_EXP, JWT_RF_SECRET, JWT_RF_EXP } = process.env;
const tokenModel = require("./../models/token-model");
const ApiError = require("./../exceptions/api-errors");

class TokenService {
    generateTokens(payload) {
      const accessToken = jwt.sign(payload, JWT_AC_SECRET, {
        expiresIn: JWT_AC_EXP,
      });
      const refreshToken = jwt.sign(payload, JWT_RF_SECRET, {
        expiresIn: JWT_RF_EXP,
      });
  
      return {
        accessToken,
        refreshToken,
      };
    }
  
    // async validateAccessToken(token, next) {
    //   try {
    //     const userData = jwt.verify(token, process.env.JWT_AC_SECRET);
    //     const userDataBase = await userModel.findUserByEmail(userData.email);
    //     userDataBase.iat = userData.iat;
    //     userDataBase.exp = userData.exp;
    //     if (!userDataBase) {
    //       return next(ApiError.NotFoundError(userData.email));
    //     }
    //     const isactivated_token = userDataBase.isactivated;
    //     if (!isactivated_token) {
    //       return next(ApiError.AccessDeniedForRole("User not activated"));
    //     }
    //     const role = userDataBase.role;
    //     if (role === "manager" || role === "admin") {
    //       return userDataBase;
    //     } else {
    //       return next(ApiError.AccessDeniedForRole("Wrong role"));
    //     }
    //   } catch (e) {
    //     return null;
    //   }
    // }
  
    // validateRefreshToken(token) {
    //   try {
    //     const userData = jwt.verify(token, process.env.JWT_RF_SECRET);
    //     return userData;
    //   } catch (e) {
    //     return null;
    //   }
    // }
  
    async saveToken(userId, refreshToken, trx) {
      const [tokenData] = await tokenModel.getUserToken({ userId }, trx);
      if (tokenData) {
        tokenData.refreshtoken = refreshToken;
      }
      
      const token = await tokenModel.saveToken(userId, refreshToken, trx);
      return token;
    }
  
    async removeToken(refreshToken, trx) {
      try {
        const tokenData = await tokenModel.deleteOneToken(refreshToken, trx);
        return tokenData;
      } catch (error) {
        return res.status(500).json(ApiError.IntServError(error));
      }
    }
  
    // async findToken(refreshToken, trx) {
    //   const tokenData = await tokenModel.findOneToken(refreshToken, trx);
  
    //   return tokenData;
    // }
  }
  
  module.exports = new TokenService();
  