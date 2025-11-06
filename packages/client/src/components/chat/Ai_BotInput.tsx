import { FaArrowUp } from "react-icons/fa";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useRef } from "react";

export type ChatFormData = {
  prompt: string;
};

type props = {
  onSubmit: (data: ChatFormData) => void;
};

const Ai_BotInput = ({ onSubmit }: props) => {
  // enable onChange so formState.isValid updates as the user types
  const { register, handleSubmit, formState, reset } = useForm<ChatFormData>({ mode: "onChange" });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };
  const submit = handleSubmit((data) => {
    reset({ prompt: "" });
    // restore focus so user can continue typing without a manual click
    textareaRef.current?.focus();
    onSubmit(data);
  });

  return (
    <form
      onSubmit={submit}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-1 items-end border-2 rounded-2xl m-12 p-4"
    >
      <textarea
        {...(() => {
          // keep register props but attach our own ref so we can focus after reset
          const reg = register("prompt", {
            required: true,
            validate: (data) => data.trim().length > 0,
          });
          return {
            ...reg,
            ref: (e: HTMLTextAreaElement | null) => {
              reg.ref(e);
              textareaRef.current = e;
            },
          };
        })()}
        autoFocus
        className="w-full outline-none resize-none border-0 p-0 "
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
