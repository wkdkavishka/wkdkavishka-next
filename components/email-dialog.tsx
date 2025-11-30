"use client";

import { useState } from "react";
import { Copy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

export function EmailDialog({ 
  email, 
  children 
}: { 
  email: string; 
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send a Message</DialogTitle>
          <DialogDescription>
            Send me a message directly or use your email client.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2 rounded-md border p-3 bg-muted/50">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <code className="flex-1 text-sm">{email}</code>
            <Button
              size="sm"
              variant="ghost"
              onClick={copyEmail}
              className="h-8"
            >
              <Copy className="mr-2 h-3 w-3" />
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or send via
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full" asChild>
            <Link href={`mailto:${email}`}>
              Open Mail Client
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
