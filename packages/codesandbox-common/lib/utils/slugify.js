"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slugify;

function slugify(text) {
  var a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
  var b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
  var p = new RegExp(a.split('').join('|'), 'g');
  /* eslint-disable */

  return text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
  .replace(p, function (c) {
    return b.charAt(a.indexOf(c));
  }) // Replace special chars
  .replace(/&/g, '-and-') // Replace & with 'and'
  .replace(/[^\w\-]+/g, '') // Remove all non-word chars
  .replace(/\-\-+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, ''); // Trim - from end of text

  /* eslint-enable */
}