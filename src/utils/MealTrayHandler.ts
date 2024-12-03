import StoredMeal from '@/types/StoredMeal';

class MealTrayHandler {
  getMeals(): StoredMeal[] {
    return JSON.parse(localStorage.getItem('trayItems')!) || [];
  }

  addMeal(meal: StoredMeal) {
    try {
      const trayItems: StoredMeal[] =
        JSON.parse(localStorage.getItem('trayItems')!) || [];
      trayItems.push(meal);

      localStorage.setItem('trayItems', JSON.stringify(trayItems));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  removeMeal(mealId: string) {
    const trayItems: StoredMeal[] =
      JSON.parse(localStorage.getItem('trayItems')!) || [];

    const mealIndex = trayItems.findIndex((meal) => meal.id === mealId);

    if (mealIndex !== -1) {
      trayItems.splice(mealIndex, 1);
    }

    localStorage.setItem('trayItems', JSON.stringify(trayItems));
  }

  setMealQuantity(mealId: string, quantity: number) {
    const trayItems: StoredMeal[] =
      JSON.parse(localStorage.getItem('trayItems')!) || [];

    const mealIndex = trayItems.findIndex((meal) => meal.id === mealId);

    if(mealIndex === -1) return;

    trayItems[mealIndex].quantity = `${quantity}`;

    console.log(trayItems, quantity);
    

    localStorage.setItem('trayItems', JSON.stringify(trayItems));
  }

  clearTray() {
    return localStorage.removeItem('trayItems');
  }

  isMealInTray(mealId: string) {
    const trayItems: StoredMeal[] =
      JSON.parse(localStorage.getItem('trayItems')!) || [];

    return !!trayItems.find((meal) => meal.id === mealId);
  }
}

export default new MealTrayHandler();
