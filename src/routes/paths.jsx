import Description from '../pages/Description';
import Home from '../pages/Home';
import Lab1 from '../pages/Lab1';
import Lab2 from '../pages/Lab2';

export const HOME = '/';
export const LAB1 = '/lab1';
export const LAB2 = '/lab2';
export const DESCRIPTION = '/description';

export const PAGES = [
  {
    id: HOME,
    path: HOME,
    element: <Home />,
    title: 'Головна',
  },
  {
    id: LAB1,
    path: LAB1,
    element: <Lab1 />,
    title: 'Лабораторна робота №1',
  },
  {
    id: LAB2,
    path: LAB2,
    element: <Lab2 />,
    title: 'Лабораторна робота №2',
  },
  {
    id: DESCRIPTION,
    path: DESCRIPTION,
    element: <Description />,
    title: 'Опис',
  },
];
