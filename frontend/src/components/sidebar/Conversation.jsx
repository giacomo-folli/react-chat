import { useSocketContext } from "../../context/SocketContext";
import { isPersonOrGroup } from "../../utils/isPersonOrGroup";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useCoversation";
import useTheme from "../../store/useTheme";

const Conversation = ({ conversation, lastIdx }) => {
  const { selected, setSelected } = useConversation();
  const isSelected = selected?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const { authUser } = useAuthContext();
  const { theme } = useTheme();

  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? " bg-sky-500" : ""
        }`}
        onClick={() => setSelected(conversation)}
      >
        <div className={`avatar ${isOnline ? " online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={isPersonOrGroup(conversation, authUser).profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between items-center">
            <p
              className={`font-bold ${
                theme ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {isPersonOrGroup(conversation, authUser).fullName}
            </p>
            <div className="rounded-full flex items-center justify-center w-4 h-4 btn-circle bg-sky-500 bg-opacity-70">
              <span className="text-xs">1</span>
            </div>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1 opacity-0" />}
    </>
  );
};

export default Conversation;
