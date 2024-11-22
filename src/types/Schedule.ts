export default interface Schedule {
  id: string;
  name: string;
  meals: { meal: string; date: string; time: string }[];
}
