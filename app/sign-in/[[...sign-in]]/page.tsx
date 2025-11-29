import { SignIn } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";

export default function SignInPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-24 px-4 md:px-6 bg-muted/40 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
				<div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
			</div>

			<div className="w-full max-w-md space-y-8 relative z-10">
				<div className="flex flex-col items-center text-center space-y-2">
					<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg mb-4">
						<LayoutDashboard className="h-6 w-6" />
					</div>
					<h2 className="text-3xl font-bold tracking-tight text-foreground">
						Welcome Back
					</h2>
					<p className="text-sm text-muted-foreground max-w-xs">
						Sign in to access your admin dashboard and manage your portfolio.
					</p>
				</div>
				<div className="flex justify-center">
					<SignIn
						appearance={{
							elements: {
								rootBox: "mx-auto w-full",
								card: "bg-card text-card-foreground border border-border shadow-xl rounded-xl w-full",
								headerTitle: "hidden",
								headerSubtitle: "hidden",
								socialButtonsBlockButton:
									"bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent h-10",
								socialButtonsBlockButtonText:
									"text-secondary-foreground font-medium",
								dividerLine: "bg-border",
								dividerText: "text-muted-foreground bg-card",
								formFieldLabel: "text-foreground font-medium",
								formFieldInput:
									"bg-background border-input text-foreground h-10",
								footerActionText: "text-muted-foreground",
								footerActionLink:
									"text-primary hover:text-primary/90 font-medium",
								formButtonPrimary:
									"bg-primary text-primary-foreground hover:bg-primary/90 h-10",
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
}
