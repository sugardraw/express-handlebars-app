module.exports.helper= function(arguments) {
    var arg = Array.prototype.slice.call(arguments, 0);
    arg.pop();
    return arg.join("");
  }
