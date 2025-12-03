import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Mail, CheckCircle2, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock password reset - in real app would send reset email
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            {emailSent ? (
              <CheckCircle2 className="h-8 w-8 text-primary" />
            ) : (
              <Sparkles className="h-8 w-8 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {emailSent ? "Check Your Email" : "Reset Password"}
          </CardTitle>
          <CardDescription>
            {emailSent
              ? "We've sent password reset instructions to your email address"
              : "Enter your email address and we'll send you instructions to reset your password"}
          </CardDescription>
        </CardHeader>
        {!emailSent ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <p className="text-muted-foreground">
                  You'll receive an email with a link to reset your password
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">
                Send Reset Instructions
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                type="button"
                onClick={() => navigate("/login")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to login
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-center">
                If an account exists for <strong>{email}</strong>, you will receive password reset instructions shortly.
              </p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Didn't receive the email?</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Check your spam or junk folder</li>
                <li>Make sure you entered the correct email address</li>
                <li>Wait a few minutes and check again</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setEmailSent(false);
                  setEmail("");
                }}
              >
                Try Another Email
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => navigate("/login")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to login
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
