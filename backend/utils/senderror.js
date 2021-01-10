
const errorToSend = (status = 401, title, errors) => {
  const err = new Error(title);
  err.status = status;
  err.title = title;
  err.errors = errors;
  return err;
}

module.exports = { errorToSend }