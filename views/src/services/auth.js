import Cookies from "js-cookie";

const NAME = "_auth";

export const isAuth = () => {
	if (Cookies.get(NAME)) {
		return true;
	} else {
		return false;
	}
};

export const removeAuth = (props) => {
	Cookies.remove(NAME);
	props.history.push("/");
};
