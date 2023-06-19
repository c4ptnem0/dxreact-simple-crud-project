import { message } from "antd";

const SuccessMessage = {
  // show successful message
  successAddMessage: () => {
    message.success("Medical Appointment Added!");
  },
  successEditMessage: () => {
    message.success("Edited Appointment Successfully!");
  },
  successDeleteMessage: () => {
    message.success("Deleted Appointment Successfully!");
  },
};

export default SuccessMessage;
