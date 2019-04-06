const key = 'urlList';

export const setUrlList = list => {
	window.localStorage.setItem(key, JSON.stringify(list));
}

export const getUrlList = () => {
	const a = window.localStorage.getItem(key);
	return a!== undefined ? JSON.parse(a) : [];
}