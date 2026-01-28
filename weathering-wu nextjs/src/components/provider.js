"use client"; 

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "@/contexts/AuthContext"; 

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

//   useEffect(() => {
//     // Only run this in the browser (not on the server)
//     if (typeof window !== "undefined") {
//       let hrElement;
//       let counter = 70;
//       for (let i = 0; i < counter; i++) {
//         hrElement = document.createElement("HR");
//         hrElement.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
//         hrElement.style.animationDuration = 2 + Math.random() * 3 + "s";
//         hrElement.style.animationDelay = Math.random() * 5 + "s";
//         document.body.appendChild(hrElement);
//       }

//       return () => {
//         const hrs = document.querySelectorAll('hr');
//         hrs.forEach(hr => hr.remove());
//       };
//     }
//   }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
         <div className="whole">
            {children}
         </div>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}