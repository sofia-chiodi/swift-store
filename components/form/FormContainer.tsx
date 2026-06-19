"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { actionFunction } from "@/utils/types";

const initialState = {
  message: "",
};

function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    // so everytime the state value changes, it displays the toast
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state, toast]);
  return (
    <form action={formAction} encType='multipart/form-data'>
      {children}
    </form>
  );
}

export default FormContainer;
