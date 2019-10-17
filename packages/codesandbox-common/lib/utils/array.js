"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveItem = moveItem;

function moveItem(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    var k = newIndex - array.length;

    while (k-- + 1) {
      array.push(undefined);
    }
  }

  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array; // for testing purposes
}