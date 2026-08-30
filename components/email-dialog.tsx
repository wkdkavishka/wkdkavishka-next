"use client";

import emailjs from "@emailjs/browser";
import { AlertCircle, CheckCircle, Copy, Mail, Send } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function EmailDialog({
	email,
	children,
}: {
	email: string;
	children: React.ReactNode;
}) {
	const [copied, setCopied] = useState(false);
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
	const formRef = useRef<HTMLFormElement>(null);

	const copyEmail = () => {
		navigator.clipboard.writeText(email);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setStatus("idle");

		const formData = new FormData(e.currentTarget);
		const templateParams = {
			from_name: formData.get("from_name"),
			from_email: formData.get("from_email"),
			message: formData.get("message"),
			to_email: email,
		};

		const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
		const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
		const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

		if (!serviceId || !templateId || !publicKey) {
			console.error("EmailJS configuration is missing");
			setStatus("error");
			setLoading(false);
			setTimeout(() => setStatus("idle"), 5000);
			return;
		}

		try {
			await emailjs.send(serviceId, templateId, templateParams, publicKey);

			setStatus("success");
			formRef.current?.reset();

			// Reset success message after 5 seconds
			setTimeout(() => setStatus("idle"), 5000);
		} catch (error) {
			console.error("Failed to send email:", error);
			setStatus("error");

			// Reset error message after 5 seconds
			setTimeout(() => setStatus("idle"), 5000);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Send a Message</DialogTitle>
					<DialogDescription>
						Send me a message directly or use your email client.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					{/* Contact Form */}
					<form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="from_name">Name</Label>
							<Input
								id="from_name"
								name="from_name"
								placeholder="Your name"
								required
								disabled={loading}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="from_email">Email</Label>
							<Input
								id="from_email"
								name="from_email"
								type="email"
								placeholder="your@email.com"
								required
								disabled={loading}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="message">Message</Label>
							<Textarea
								id="message"
								name="message"
								placeholder="Type your message here..."
								className="min-h-[120px] resize-none"
								required
								disabled={loading}
							/>
						</div>

						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? (
								<>
									<span className="animate-spin mr-2">⏳</span>
									Sending...
								</>
							) : (
								<>
									<Send className="mr-2 h-4 w-4" />
									Send Message
								</>
							)}
						</Button>

						{status === "success" && (
							<div className="flex items-center gap-2 p-3 rounded-md bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200">
								<CheckCircle className="h-4 w-4" />
								<p className="text-sm">Message sent successfully!</p>
							</div>
						)}

						{status === "error" && (
							<div className="flex items-center gap-2 p-3 rounded-md bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200">
								<AlertCircle className="h-4 w-4" />
								<p className="text-sm">
									Failed to send message. Please try again.
								</p>
							</div>
						)}
					</form>

					<div className="relative my-2">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or use
							</span>
						</div>
					</div>

					{/* Email Display with Copy */}
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

					{/* Open Mail Client Button */}
					<Button variant="outline" className="w-full" asChild>
						<Link href={`mailto:${email}`}>Open Mail Client</Link>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
