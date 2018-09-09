const hasˀ = prop =>
  prop.endsWith('ˀ');

const actualProp = prop =>
  hasˀ(prop) ? prop.substr(0, prop.length - 1) : prop;

const canAccess = value =>
  value !== undefined && value !== null;

function ˀ(value, oldValue) {
  let target = function() {};
  target.value = value;
  target.oldValue = oldValue;

  return new Proxy(target, {
    get(obj, prop) {
      let result;
      let shouldWrap = hasˀ(prop);

      prop = actualProp(prop);

      if (canAccess(obj.value)) {
        result = obj.value[prop];
      }

      return shouldWrap ? ˀ(result, obj.value) : result;
    },

    set(obj, prop, value) {
      prop = actualProp(prop);

      if (canAccess(obj.value)) {
        target.value[prop] = value;
      }
    },

    apply(obj, thisContext, args) {
      if (canAccess(obj.value)) {
        return obj.value.apply(obj.oldValue, args);
      }

      return undefined;
    },
  });
}

module.exports = ˀ;
