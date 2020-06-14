module.exports = (milliseconds) => {
  return new Promise(r => setTimeout(r, milliseconds));
}
