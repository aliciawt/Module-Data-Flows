const personOne = {
  name: "Popeye",
  age: 34,
  favoriteFood: "Spinach",
};

// Update the parameter to this function to make it work.
// Don't change anything else.
function introduceYourself({ name, age, favoriteFood }) {
  console.log(
    `Hello, my name is ${name}. I am ${age} years old and my favorite food is ${favoriteFood}.`
  );
}

introduceYourself(personOne);
