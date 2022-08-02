import { message } from "antd";

export const successMessage = (messageText) => {
	message.success(messageText);
};

export const errorMessage = (messageText) => {
	message.error(messageText);
};

export const warningMessage = (messageText) => {
	message.warning(messageText);
};
