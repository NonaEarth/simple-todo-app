import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, customCategoriesState, toDoState } from "../atoms";

interface IForm {
	toDo: string;
}

interface IAddCCForm {
	addInput: string;
}

function CreateToDo() {
	const setToDos = useSetRecoilState(toDoState);
	const category = useRecoilValue(categoryState);
	const { register, handleSubmit, setValue } = useForm<IForm>();

	const handleValid = ({ toDo }: IForm) => {
		setToDos((oldToDos) => {
			const newToDos = [
				{ text: toDo, id: Date.now(), category: category },
				...oldToDos,
			];

			localStorage.setItem("toDos", JSON.stringify(newToDos));
			return newToDos;
		});
		setValue("toDo", "");
	};

	const setCustomCategory = useSetRecoilState<string[]>(customCategoriesState);
	const {
		register: addCCRegister,
		handleSubmit: addCCHandleSubmit,
		setValue: addCCSetValue,
	} = useForm<IAddCCForm>();

	const addHandleValid = ({ addInput }: IAddCCForm) => {
		setCustomCategory((prev) => {
			const newCustomCategories = [...prev, addInput];
			localStorage.setItem("customCategories", JSON.stringify(newCustomCategories));
			return newCustomCategories;
		});
		addCCSetValue("addInput", "");
	};
	// // const addHandleValid: SubmitHandler<FieldValues> = ({ addInput }) => {
	// // 	setCustomCategory((prev) => {
	// // 		const newCategories = [...prev, addInput];
	// // 		localStorage.setItem("customCategories", JSON.stringify(newCategories));
	// // 		return newCategories;
	// // 	});
	// // 	addSetValue("addInput", "");
	// // };

	return (
		<>
			<form onSubmit={addCCHandleSubmit(addHandleValid)}>
				<input
					{...addCCRegister("addInput", { required: true })}
					placeholder="Your custom category!"
				></input>
				<button>Add</button>
			</form>
			<form onSubmit={handleSubmit(handleValid)}>
				<input
					{...register("toDo", { required: true })}
					placeholder="Write a to do"
				></input>
				<button>Add</button>
			</form>
		</>
	);
}

export default CreateToDo;
