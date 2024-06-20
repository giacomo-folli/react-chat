import { useState } from "react";
import useConversation from "../store/useCoversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selected } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {

      const res = await fetch(`/api/messages/send/${selected._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.error) throw new Error("Error in useSendMessage:", data.error);

      console.log(messages)

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
