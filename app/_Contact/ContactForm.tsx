"use client";
import sendMail from "@/actions/sendMail";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import FormField from "./FormField";
import formSchema from "./formSchema";
import LoadingSpinner from "./LoadingSpinner";

const ContactForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { register, handleSubmit } = form;

  const onSubmit = (userMessage: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const { success } = await sendMail(userMessage);
      if (success) {
        toast.success("Message sent");
      } else {
        toast.error("Unable to send message");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <FormField
          label="NAME"
          name="name"
          placeholder="Your name"
          register={register}
        />
        <FormField
          label="EMAIL"
          name="email"
          type="email"
          placeholder="your@email.com"
          register={register}
        />
      </div>

      <FormField
        label="SUBJECT"
        name="subject"
        placeholder="Project inquiry"
        register={register}
      />
      <FormField
        label="MESSAGE"
        name="message"
        placeholder="Tell me about your project..."
        textarea
        register={register}
      />

      <button
        type="submit"
        disabled={isPending}
        className="rounded-2xl flex w-full items-center justify-center gap-2 border border-gray-300 px-4 py-2 font-mono text-xs font-bold uppercase hover:bg-foreground/5 sm:px-6 sm:py-3 sm:text-sm cursor-pointer"
      >
        {isPending ? (
          <LoadingSpinner />
        ) : (
          <>
            <Send className="h-4 w-4" />
            SEND MESSAGE
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
