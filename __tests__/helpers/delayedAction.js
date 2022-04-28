module.exports = delayedAction = async (waitTime, action) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(action());
      } catch (err) {
        reject(err);
      }
    }, waitTime);
  });
};