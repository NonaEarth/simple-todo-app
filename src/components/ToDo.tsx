import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, customCategoriesState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name },
		} = event;

		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
			// const oldToDo = oldToDos[targetIndex];
			const newToDo = { text, id, category: name as any };
			console.log(
				"replace the to do in the index",
				targetIndex,
				"with",
				newToDo
			);

			return [
				...oldToDos.slice(0, targetIndex),
				newToDo,
				...oldToDos.slice(targetIndex + 1),
			];
		});
	};

	const customCategory = useRecoilValue(customCategoriesState);

	return (
		<li>
			<span>{text}</span>
			{category !== Categories.DOING && (
				<button name={Categories.DOING} onClick={onClick}>
					To Do
				</button>
			)}
			{category !== Categories.TO_DO && (
				<button name={Categories.TO_DO} onClick={onClick}>
					Doing
				</button>
			)}
			{category !== Categories.DONE && (
				<button name={Categories.DONE} onClick={onClick}>
					Done
				</button>
			)}
			{customCategory.map((one) => <button name={one} onClick={onClick}>{one}</button>)}
		</li>
	);
}

export default ToDo;
