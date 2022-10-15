import { combineReducers } from "redux";

import themeReducer from "./themeReducer";
import userReducer from "./userReducer";
import musicReducer from "./musicReducer";

const rootReducer = combineReducers({
	themeReducer,
	userReducer,
	musicReducer
});

export default rootReducer;