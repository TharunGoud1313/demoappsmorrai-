"use client";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "../../ui/use-toast";
import { Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define form schema with validation rules
const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please Enter a valid email address." })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters." }),
});

const otpFormSchema = z.object({
  mobile: z
    .string()
    .min(10, { message: "Enter a valid Mobile Number" })
    .max(10, { message: "Enter a valid Mobile Number" }),
  otp: z
    .string()
    .min(4, { message: "Enter a valid OTP" })
    .max(6, { message: "Enter a valid OTP" }),
});

type UserFormValue = z.infer<typeof formSchema>;

type OtpFormValue = z.infer<typeof otpFormSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [showLoginOtpField, setShowLoginOtpField] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSessionId, setOtpSessionId] = useState<string | null>(null);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPwdLoading, setForgotPwdLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const otpForm: any = useForm<OtpFormValue>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      mobile: "",
      otp: "",
    },
  });

  const onSendOtp = async () => {
    const { mobile } = otpForm.getValues();
    if (!mobile) {
      toast({
        description: "Mobile number is required to send OTP.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("api/otp/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile }),
      });
      const result = await response.json();

      if (response.ok) {
        setOtpSessionId(result.sessionId);
        setShowLoginOtpField(true);
        toast({ description: "OTP sent successfully", variant: "default" });
      } else {
        toast({ description: "Failed to send OTP", variant: "destructive" });
      }
    } catch (error) {
      toast({
        description: "An error occurred while sending OTP.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitOtp = async (data: any) => {
    if (!otpSessionId) {
      toast({
        description: "Please request OTP first",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const response: any = await signIn("mobile-otp", {
        mobile: data.mobile,
        otp: data.otp,
        redirect: false,
        sessionId: otpSessionId,
      });
      console.log("response----", response);
      if (response?.error && response?.error === "CredentialsSignin") {
        toast({
          description: "Invalid OTP. Please try again.",
          variant: "destructive",
        });
      } else if (response?.error && response?.error === "Configuration") {
        toast({
          description: "Invalid OTP. Please try again.",
          variant: "destructive",
        });
      } else if (response?.ok) {
        router.push("/role_menu");
      } else {
        toast({
          description: "Invalid OTP, please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      router.push("/applogin");
      toast({
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPwdLoading(true);
    try {
      const response = await fetch("api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });
      console.log("response===", response);
      console.log("---", forgotPasswordEmail);

      const data = await response.json();

      if (response.ok) {
        toast({
          description: "Password reset link has been sent to your email",
        });
        setIsOpen(false);
      } else {
        toast({
          variant: "destructive",
          description: data.error || "Failed to send reset link",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An unexpected error occurred",
      });
    } finally {
      setForgotPwdLoading(false);
    }
  };

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      const result: any = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      console.log("result--",result)
      if (result.ok) {
        router.push("/role_menu");
      } else {
        let text: any = document.getElementById("error-text");
        text.textContent = "Invalid email or password, please try again.";
        toast({
          description: "Invalid email or password, please try again.",
          variant: "destructive",
        });
        router.push("/applogin");
      }
    } catch (error) {
      router.push("/applogin");
      toast({
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <RadioGroup
        defaultValue="email"
        onValueChange={setLoginMethod}
        className="flex space-x-4 mb-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="email" id="email-login" />
          <Label htmlFor="email-login">Email</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mobile" id="mobile-login" />
          <Label htmlFor="mobile-login">Mobile</Label>
        </div>
      </RadioGroup>

      {loginMethod === "email" && (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-red-500 mr-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        disabled={loading}
                        className="focus:!ring-offset-0 focus:!ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password <span className="text-red-500 mr-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="border-secondary gap-2 rounded-md border flex items-center">
                        <Input
                          type={`${showPassword ? "text" : "password"}`}
                          placeholder="Password"
                          disabled={loading}
                          className="focus:!ring-offset-0 border-none focus:!ring-0"
                          {...field}
                        />
                        {showPassword ? (
                          <EyeOff
                            className="cursor-pointer pr-1"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        ) : (
                          <Eye
                            className="cursor-pointer pr-1"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p id="error-text" className="font-md text-red-500"></p>

              <Button
                disabled={loading}
                className="ml-auto w-full"
                type="submit"
              >
                Login
              </Button>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <p className="px-0 underline text-gray-500 hover:text-gray-900 text-sm cursor-pointer flex justify-end text-right font-normal">
                    Forgot password?
                  </p>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Forgot password</DialogTitle>
                    <DialogDescription>
                      Enter your email address and we&apos;ll send you a link to
                      reset your password.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    <Label htmlFor="forgot-email">Email</Label>
                    <Input
                      id="forgot-email"
                      placeholder="Email"
                      type="email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button onClick={handleForgotPassword} className="w-full">
                    {forgotPwdLoading ? "Sending..." : "Send reset link"}
                  </Button>
                </DialogContent>
              </Dialog>
            </form>
          </Form>
        </>
      )}

      {loginMethod === "mobile" && (
        <>
          <Form {...otpForm}>
            <form onSubmit={otpForm.handleSubmit(onSubmitOtp)}>
              <div className="space-y-3">
                <FormField
                  control={otpForm.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Mobile Number
                        <span className="text-red-500 mr-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="mobile"
                          type="number"
                          placeholder="+1234567890"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!showLoginOtpField && (
                  <Button
                    disabled={loading}
                    type="button"
                    className="w-full"
                    onClick={onSendOtp}
                  >
                    Get OTP
                  </Button>
                )}

                {showLoginOtpField && (
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          OTP
                          <span className="text-red-500 mr-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="otp"
                            inputMode="numeric"
                            type="number"
                            placeholder="Enter OTP"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {showLoginOtpField && (
                  <Button
                    disabled={loading}
                    className="ml-auto w-full"
                    type="submit"
                  >
                    Verify OTP
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default LoginPage;
