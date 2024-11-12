export default interface Meal {
  img: any;
  name: string;
  id: string;
  price: number;
  nutrients: Record<string, string>;
  highCalorie?: boolean;
}
