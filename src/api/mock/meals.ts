import BeansWithVeggies from '@/assets/images/beans-with-veggies.png';
import BreadAndCordSoup from '@/assets/images/bread-and-corn-soup.png';
import CaesersSalad from '@/assets/images/caesers-salad.png';
import FruitSalad from '@/assets/images/fruit-salad.png';
import HerbedRice from '@/assets/images/herbed-rice.png';
import ParfaitBowl from '@/assets/images/parfait-bowl.png';
import Porridge from '@/assets/images/porridge.png';
import QuinoaBowl from '@/assets/images/quinoa-bowl.png';
import RiceAndVeggies from '@/assets/images/rice-and-veggies.png';
import RiceWithGrilledSalmon from '@/assets/images/rice-with-grilled-salmon.png';
import RiceWithLegumesAndSalmon from '@/assets/images/rice-with-legumes-and-salmon.png';
import SpringSalad from '@/assets/images/spring-salad.png';

export const meals = [
  {
    img: BeansWithVeggies,
    name: 'Beans with veggies',
    price: 7000,
    nutrients: {
      kcal: '400',
      fat: '10g',
      fibre: '10g',
      protein: '2g',
    },
  },
  {
    img: BreadAndCordSoup,
    name: 'Bread and cord soup',
    price: 7000,
    nutrients: {
      kcal: '400',
      fat: '10g',
      fibre: '10g',
      protein: '2g',
    },
  },
  {
    img: CaesersSalad,
    name: 'Caesers Salad',
    price: 7000,
    nutrients: {
      kcal: '400',
      fat: '10g',
      fibre: '10g',
      protein: '2g',
    },
  },
  {
    img: FruitSalad,
    name: 'Beans with veggies',
    price: 7000,
    nutrients: {
      kcal: '400',
      fat: '10g',
      fibre: '10g',
      protein: '2g',
    },
  },
  {
    img: HerbedRice,
    name: 'Beans with veggies',
    price: 7000,
    nutrients: {
      kcal: '400',
      fat: '10g',
      fibre: '10g',
      protein: '2g',
    },
  },
  {
    img: ParfaitBowl,
    name: 'Beans with veggies',
    price: 7000,
    nutrients: {
      kcal: '400',
      fat: '10g',
      fibre: '10g',
      protein: '2g',
    },
  },
  {
    img: Porridge,
    name: 'Beans with veggies',
    price: 7000,
    nutrients: {
      kcal: '400',
      fat: '10g',
      fibre: '10g',
      protein: '2g',
    },
  },
  {
    img: QuinoaBowl,
    name: 'Beans with veggies',
    price: 7000,
    nutrients: {
      kcal: '400',
      fat: '10g',
      fibre: '10g',
      protein: '2g',
    },
  },
  {
    img: RiceAndVeggies,
    name: 'Beans with veggies',
    price: 7000,
    nutrients: {
      kcal: '400',
      fat: '10g',
      fibre: '10g',
      protein: '2g',
    },
  },
  {
    img: RiceWithGrilledSalmon,
    name: 'Beans with veggies',
    price: 7000,
    nutrients: {
      kcal: '400',
      fat: '10g',
      fibre: '10g',
      protein: '2g',
    },
  },
  {
    img: RiceWithLegumesAndSalmon,
    name: 'Beans with veggies',
    price: 7000,
    nutrients: {
      kcal: '400',
      fat: '10g',
      fibre: '10g',
      protein: '2g',
    },
  },
  {
    img: SpringSalad,
    name: 'Beans with veggies',
    price: 7000,
    nutrients: {
      kcal: '400',
      fat: '10g',
      fibre: '10g',
      protein: '2g',
    },
  },
].map((item, index) => ({ ...item, id: `${index}` }));
