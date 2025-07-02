import type { FormEvent, ReactNode } from "react";

interface FormParams {
  handleSubmit: (e: FormEvent) => Promise<void>;
  children: ReactNode;
}

export default function Form(params: FormParams) {
  return (
    <form
      className="flex flex-col gap-6 px-5 py-8 rounded-lg shadow-md max-w-xl w-full text-center border border-stone-300"
      onSubmit={params.handleSubmit}
    >
      {params.children}
    </form>
  );
}
