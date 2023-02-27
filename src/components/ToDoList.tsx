import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, customCategoriesState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
	// const toDos = useRecoilValue(toDoState);
	const toDos = useRecoilValue(toDoSelector);

	const [category, setCategory] = useRecoilState(categoryState);
	const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
		setCategory(event.currentTarget.value as any);
	};

	const customCategory = useRecoilValue(customCategoriesState);

	console.log(toDos, customCategory);
	return (
		<div>
			<h1>TO-DOs</h1>
			<hr />
			<select value={category} onInput={onInput}>
				<option value={Categories.TO_DO}>To Do</option>
				<option value={Categories.DOING}>Doing</option>
				<option value={Categories.DONE}>Done</option>
				{customCategory.map((one) => <option value={one}>{one}</option>)}
			</select>
			<CreateToDo />
			{toDos?.map((toDo) => (
				<ToDo key={toDo.id} {...toDo} />
			))}
		</div>
	);
}

// ## Example without "react-hook-form"
// function ToDoList() {
// 	const [toDo, setToDo] = useState("");
// 	const [toDoError, setToDoError] = useState("");
// 	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
// 		const {
// 			currentTarget: { value },
// 		} = event;
// 		setToDoError("");
// 		setToDo(value);
// 	};
// 	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();
// 		console.log(toDo);

// 		if (toDo.length < 10) {
// 			return setToDoError("To do should be longer.");
// 		}

// 		console.log("submit");
// 	};
// 	return (
// 		<div>
// 			<form onSubmit={onSubmit}>
// 				<input onChange={onChange} value={toDo} placeholder="Write a to do" />
// 				<button>Add</button>
// 				{toDoError !== "" ? toDoError : null}
// 			</form>
// 		</div>
// 	);
// }

// ## Example with "react-hook-form"
// interface IForm {
// 	password: string;
// 	password1: string;
// 	extraError?: string;
// }

// function ToDoList() {
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 		setError,
// 	} = useForm<IForm>();

// 	const onValid = (data: IForm) => {
// 		if (data.password !== data.password1) {
// 			setError(
// 				"password1",
// 				{ message: "Password are not the same!" },
// 				{ shouldFocus: true }
// 			);
// 		}

// 		// setError("extraError", { message: "Server offline. " });
// 	};

// 	return (
// 		<div>
// 			<form
// 				style={{ display: "flex", flexDirection: "column" }}
// 				onSubmit={handleSubmit(onValid, () => {
// 					console.log("There was an error.");
// 				})}
// 			>
// 				<span>{errors?.password?.message}</span>
// 				<input
// 					{...register("password", {
// 						required: "You entered nothing in the input!",
// 						minLength: {
// 							value: 5,
// 							message: "It's too short! It needs to be at least 5 letters.",
// 						},
// 						validate: (value) => !value.includes("nico"),
// 					})}
// 					placeholder="Password"
// 				></input>
// 				<span>{errors?.password1?.message}</span>
// 				<input
// 					{...register("password1", {
// 						required: "You entered nothing in the input!",
// 						minLength: {
// 							value: 5,
// 							message: "It's too short! It needs to be at least 5 letters.",
// 						},
// 					})}
// 					placeholder="Password"
// 				></input>
// 				<button>Add</button>
// 				<span>{errors?.extraError?.message}</span>
// 			</form>
// 		</div>
// 	);
// }

export default ToDoList;
