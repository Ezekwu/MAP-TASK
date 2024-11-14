export default interface Meal {
  img: any;
  name: string;
  id: string;
  price: number;
  // TODO: figure out if nutrients would be best as array or object.
  nutrients: Record<string, string>;
  highCalorie?: boolean;
  spotlight?: boolean;
  inStock?: boolean;
  isBestSeller?: boolean;
}
