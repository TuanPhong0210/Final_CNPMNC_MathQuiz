export const getResult = (name) => {
  var position = name.indexOf('(');
  name = name.substring(0, position);
  return name;
};
