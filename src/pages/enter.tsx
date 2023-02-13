import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import Input from "../components/input";
import { cls } from "../libs/utils";

interface EnterForm {
  email?: string;
  phone?: string;
}

const Enter: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<EnterForm>();
  const [method, setMethod] = useState<"email" | "phone">("email");
  const onEmailClick = () => {
    reset();
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset();
    setMethod("phone");
  };
  const onValid = (data: EnterForm) => {
    fetch("/api/users/enter", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register('email', {
          required: `email은 필수 입니다.`,
        })} placeholder="email" />
        <input {...register('phone', {
          required: `phone은 필수 입니다.`,
        })} placeholder="phone" />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
};
export default Enter;