// "use client";
// import { useEffect, useState } from "react";

// export function ClientProviders({ children }: { children: React.ReactNode }) {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);

//     // Only run this on the client side and after the component has mounted
//     const registerSW = async () => {
//       try {
//         await registerSW();
//       } catch (error) {
//         console.error("Failed to initialize service worker:", error);
//       }
//     };

//     if (isMounted) {
//       registerSW();
//     }

//     return () => {
//       setIsMounted(false);
//     };
//   }, [isMounted]);

//   return <>{children}</>;
// }
