import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

let defaultCatecories: string[] = ['TODO', 'DOING', 'DONE'];

const { persistAtom } = recoilPersist({
  key: 'toDos',
  storage: localStorage,
});

export const categoryState = atom<string>({
  key: 'category',
  default: defaultCatecories[0],
});

export const categoriesState = atom<string[]>({
  key: 'categories',
  default: defaultCatecories,
  effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
});
