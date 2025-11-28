import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-24 px-4 md:px-6 bg-background">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
						Admin Access
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						Sign in to manage your portfolio
					</p>
				</div>
				<div className="flex justify-center">
					<SignIn
						appearance={{
							elements: {
								rootBox: "mx-auto",
								card: "bg-card text-card-foreground border border-border shadow-sm",
								headerTitle: "text-foreground",
								headerSubtitle: "text-muted-foreground",
								socialButtonsBlockButton:
									"bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
								socialButtonsBlockButtonText: "text-secondary-foreground",
								dividerLine: "bg-border",
								dividerText: "text-muted-foreground",
								formFieldLabel: "text-foreground",
								formFieldInput: "bg-background border-input text-foreground",
								footerActionText: "text-muted-foreground",
								footerActionLink: "text-primary hover:text-primary/90",
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
}
