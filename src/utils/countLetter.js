export const countLetter = (array, letter) => {
  let letterCount = 0;

  array
    .join("")
    .split("")
    .forEach(function (character) {
      if (character.toLowerCase() === letter) letterCount++;
    });

  return letterCount;
};
