import html2pdf from 'html2pdf.js';
const bingoCard = document.querySelector('.bingo');
const bingoItems = [
  ...document.querySelectorAll('.bingo__item:not([data-bingo-bg]'),
];
const bingers = [
  /* Lista de pessoas que vão bingar */
];

const getRandomInt = (min, max) => {
  const { ceil, floor, random } = Math;
  min = ceil(min);
  max = floor(max);
  return floor(random() * (max - min)) + min;
};

const generateBingoValues = () => {
  const bingoValues = Array.from({ length: 90 }, (_, i) => i);
  const bingoSelectedValues = [];
  while (bingoSelectedValues.length < 24) {
    let bingoValue = bingoValues[getRandomInt(1, 90)];
    if (!bingoSelectedValues.includes(bingoValue)) {
      bingoSelectedValues.push(bingoValue);
    }
  }
  return bingoSelectedValues.sort((min, max) => min - max);
};

const insertBingoValues = () => {
  generateBingoValues().forEach((value, index) => {
    bingoItems[index].innerText = value;
  });
};

const toKebabCase = name => name.split(" ").join("_")

for (let i = 0; i < bingers.length; i++) {
  insertBingoValues();

  html2pdf().from(bingoCard).set({
    margin: 5,
    filename: `${toKebabCase(bingers[i])}.pdf`
  }).save();
}
