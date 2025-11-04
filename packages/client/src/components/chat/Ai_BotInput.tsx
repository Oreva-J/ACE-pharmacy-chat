import { FaArrowUp } from "react-icons/fa";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

type ChatFormData = {
  prompt: string;
};

type props = {
  onSubmit: (data: ChatFormData) => void;
};

const Ai_BotInput = ({ onSubmit }: props) => {
  const { register, handleSubmit, formState, reset } = useForm<ChatFormData>();

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };
  const submit = handleSubmit((data) => {
    reset({ prompt: "" });
    onSubmit(data);
  });

  return (
    <form
      onSubmit={submit}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-2 items-end border-2 rounded-2xl m-12 p-4"
    >
      <textarea
        {...register("prompt", {
          required: true,
          validate: (data) => data.trim().length > 0,
        })}
        autoFocus
        className="w-full outline-none resize-none border-0 p-8 "
        placeholder="Type your message here..."
        maxLength={500}
      />
      <Button
        disabled={!formState.isValid}
        className=" text-4xl rounded-full w-9 h-9"
      >
        <FaArrowUp />
      </Button>
    </form>
  );
};

export default Ai_BotInput;
