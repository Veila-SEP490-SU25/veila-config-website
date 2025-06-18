"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegisterMutation } from "@/services/apis";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();

  const registerSchema = z
    .object({
      username: z.string().min(1, "Username is required"),
      password: z
        .string()
        .min(8, "Password has to be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
          /[!@#$%^&*()_+[\]{}|;:,.<>?]/,
          "Password must contain at least one special character"
        ),
      repeatpassword: z.string(),
      fullName: z.string().min(1, "Full name is required"),
    })
    .refine((data) => data.password === data.repeatpassword, {
      message: "Passwords do not match",
    });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      repeatpassword: "",
      fullName: "",
    },
  });

  const [registerMutation, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
    console.log("Form submitted with values:", values);
    try {
      const { item, message, statusCode } = await registerMutation({
        username: values.username,
        password: values.password,
        fullName: values.fullName,
      }).unwrap();
      if (statusCode === 201) {
        toast.success("Đăng ký thành công", {
          description: "Vui lòng đăng nhập để tiếp tục.",
        });
        router.push("/login");
      } else {
        toast.error("Đăng ký thất bại", {
          description: message || "Vui lòng thử lại sau.",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full h-full space-y-3 flex flex-col items-center justify-center"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Username" />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="Password" />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatpassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Repeat Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Repeat Password"
                />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Full Name" />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />
        <Button variant="default" type="submit" className="w-full rounded-full">
          Register
        </Button>
      </form>
    </Form>
  );
};
