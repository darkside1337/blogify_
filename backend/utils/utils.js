/*  function to beautify errors into a one simple object that looks like this:
  {
    error.field: error.message[]
  }
*/
const parseErrors = (errors) => {
  return errors.inner.reduce((acc, err) => {
    const { path, message } = err;
    if (acc[path]) {
      // If there's already an entry for the path, append the new message to the array
      acc[path] = [...acc[path], message];
    } else {
      // Otherwise, create a new entry with the path and an array containing the message
      acc[path] = [message];
    }
    return acc;
  }, {});
};
module.exports = { parseErrors };
