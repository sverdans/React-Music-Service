import { colorItems } from "../../utils/constants";

const initialState = { theme: localStorage.getItem('theme') || "dark"};

const themeReducer = (state = initialState, action) =>
{
	if (action.type === "SET_THEME" && colorItems.find((item) => item.id === action.payload) !== -1)
	{
		localStorage.setItem('theme', action.payload);
		return { theme: action.payload };
	}
	else
		return state;
}

export default themeReducer;