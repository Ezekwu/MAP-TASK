export default interface Meal {
  img: any;
  name: string;
  id: string;
  price: number;
  // TODO: figure out if nutrients would be best as array or object.
  nutrients: {
    fibre?: number;
    fat?: number;
    kcal?: number;
    protein?: number;
  };
  highCalorie: boolean;
  spotlight?: boolean;
  bestSeller?: boolean;
  soldOut?: boolean;
}
