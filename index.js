// Create a person object with age 0
const person = {
  age: 0
};

// Function that celebrates a birthday by incrementing the person's age
function celebrateBirthday(p) {
  p.age += 1;
  return p;
}

// Expose globally (in browser environment it's already global by const/function in non-module script)

