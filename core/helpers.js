const _randomStr = (maxLength) => {
  return new Promise((resolve) => {
    resolve(
      Math.random()
        .toString(36)
        .slice(2, maxLength + 2)
    );
  });
};

module.exports.createRandomStr = (length) => {
  return new Promise(async (resolve) => {
    let resultStr = "";

    while (resultStr.length < length) {
      resultStr += await _randomStr(length - resultStr.length);
    }

    resolve(resultStr);
  });
};

module.exports.createError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;

  return err;
};
