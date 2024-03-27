const ApiError = require("./../exceptions/api-errors");

const TokensTable = "tokens";

async function getUserToken(userId, trx) {
  const data = await trx(TokensTable)
    .select("id", "refreshtoken")
    .where("user_id", "=", userId.userId);
  return data;
}

async function saveToken(userId, refreshToken, trx) {
  try {
    const userExist = await trx(TokensTable)
      .select("*")
      .where("user_id", "=", userId);
    if (userExist.length) {
      await trx(TokensTable)
        .where("user_id", "=", userId)
        .update({ refreshtoken: refreshToken });
    } else {
      await trx(TokensTable).insert({
        user_id: userId,
        refreshtoken: refreshToken,
      });
    }
    return refreshToken;
  } catch (error) {
    throw ApiError.IntServError(error);
  }
}

async function deleteOneToken(refreshToken, trx) {
  try {
    const data = await trx(TokensTable)
      .where("refreshtoken", refreshToken)
      .del();
    return data + " user logout";
  } catch (error) {
    throw ApiError.IntServError(error);
  }
}

async function findOneToken(refreshToken, trx) {
  const data = await trx(TokensTable)
    .select("user_id", "refreshtoken")
    .where("refreshtoken", refreshToken);
  return data;
}

module.exports = {
  saveToken,
  getUserToken,
  deleteOneToken,
  findOneToken,
};
