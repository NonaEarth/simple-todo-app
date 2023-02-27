import { atom, selector } from "recoil";

// type categories = "TO_DO" | "DOING" | "DONE";

export enum Categories {
	"TO_DO" = "TO_DO",
	"DOING" = "DOING",
	"DONE" = "DONE",
}

const storageCategories = localStorage.getItem("customCategories");
const filteredCategories = storageCategories ? JSON.parse(storageCategories) : []

export const customCategoriesState = atom<string[]>({
	key: "customCategories",
	default: filteredCategories,
});

export interface IToDo {
	text: string;
	id: number;
	category: Categories | string;
}

export const categoryState = atom<Categories>({
	key: "category",
	default: Categories.TO_DO,
});

const storageToDos = localStorage.getItem("toDos");
const filteredToDos = storageToDos ? JSON.parse(storageToDos) : []
export const toDoState = atom<IToDo[]>({
	key: "toDo",
	default: filteredToDos,
});

export const toDoSelector = selector({
	key: "toDoSelector",
	get: ({ get }) => {
		const toDos = get(toDoState);
		const category = get(categoryState);

		return toDos.filter((toDo) => toDo.category === category);
	},
});
