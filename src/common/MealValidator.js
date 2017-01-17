/*

Meal Validator class

Written using Node.js compatible code, not transpiled so that server can use it

*/

module.exports = {
  validateMeal: (meal) => {
    if(!meal || !meal.name) {
      return undefined;
    } else {
      if(meal.name.length > 0) {
        return meal;
      } else {
        return undefined;
      }
    }
  }
}
