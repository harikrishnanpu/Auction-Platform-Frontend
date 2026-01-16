import AuthNavbar from "@/components/layout/navbars/AuthNavbar"




export default function AdminLoginLayout({ children }: { children: React.ReactNode }){
    return (
        <>
            <AuthNavbar />
        {children}
        </>
   ) 
}