import medicineCategory from "../FoodsDB/foodCategories";

function compareStrings(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}



export async function discoverFoodCategories(items){
  let result = [];
  for(let i = 1; i < medicineCategory.length; i++){
    let foods = items.filter(({ type }) => type.find((str) => str == medicineCategory[i].name));
    if(foods.length >= 1) result.push(medicineCategory[i]); //eger bir katogoride 1 urun veya daha fazlasi var ise onu ekrana bas...
    // console.log(`${ foodCategory[i].name }: ${ foods.length }`);
  }
  return(result);
}


export async function foodIngredient(food = []){
  let ingredients = [];
  for(let i = 0; i < food.length; i++) {
    let result = Ingredients.filter((ingredient) => ingredient.name == food[i].image);
    if(result.length > 0){
      ingredients.push(result[0]);
    } else {
      ingredients.push(null);
    }
  }

  return(ingredients);
}