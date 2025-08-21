import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { set_id, setRole, setUsername } from "./redux/user/userSlice";

export const ExtractData = () => {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(setUsername(JSON.parse(document.cookie.split('; ').find(row => row.startsWith('chat-app='))?.split('=')[1] || '{}').username))
  dispatch(setRole(JSON.parse(document.cookie.split('; ').find(row => row.startsWith('chat-app='))?.split('=')[1] || '{}').role))
  dispatch(set_id(JSON.parse(document.cookie.split('; ').find(row => row.startsWith('chat-app='))?.split('=')[1] || '{}').userID))

  const chatAppCookie = document.cookie.split('; ').find(row => row.startsWith('chat-app='));
  if (chatAppCookie) {
    const cookieValue = chatAppCookie.split('=')[1];
    document.cookie = `chat-app=${cookieValue}; expires=${new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
  }
}