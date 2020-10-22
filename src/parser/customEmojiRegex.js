const regenerate = require('regenerate');

const treeRegex = regenerate()
  .add(0x1f332) // evergreen tree:  https://www.unicode.org/emoji/charts/emoji-list.html#1f332
  .add(0x1f333) // deciduous tree:  https://www.unicode.org/emoji/charts/emoji-list.html#1f333
  .add(0x1f334) // palm tree:       https://www.unicode.org/emoji/charts/emoji-list.html#1f334
  .add(0x1f335) // cactus:          https://www.unicode.org/emoji/charts/emoji-list.html#1f333
  .add(0x1f384) // Christmas tree:  https://www.unicode.org/emoji/charts/emoji-list.html#1f384
  .toRegExp();

const speechBallooonRegex = regenerate(0x1f4ac).toRegExp(); // speech balloon

const otherEmojiRegex = regenerate()
  .add(0x1f5e3) // speaking head    https://www.unicode.org/emoji/charts/emoji-list.html#1f5e3
  .add(0x1f3f7) // label            https://www.unicode.org/emoji/charts/emoji-list.html#1f3f7
  .toRegExp();

module.exports = {
  otherEmojiRegex,
  treeRegex,
  speechBallooonRegex,
};
