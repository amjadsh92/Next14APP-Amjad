const { default: Link } = require("next/link")
//import { usePathname } from "next/navigation"
import NavLink from "./NavbarLink/NavbarLink"
import styles from "./links.module.css"
//import { getSession } from 'next-auth';
//import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

const Links = async () => {


    
    //const session = await getSession(authOptions);
    const links = [
        {title:"Homepage",
         path:"/"},
         {title:"to-do-app",
         path:"/to-do-app"},
         {title:"products",
         path:"/products"},
         {title:"tic-tac-toe",
         path:"/tic-tac-toe"},
         {title:"SignUp",
         path:"/signup"},
        
    ]


return(
    <div className={styles.links}>
        {links.map((link) => 
        <NavLink item={link} key={link.title} />
        )}

    
 
    </div>


)

        }


        
        
        
        
    const AuthLinks = ({session}) => { 
    "use client"
    const { usePathname} = require("next/navigation")
    const pathName = usePathname()
    
    {session && session.user?.email ? (
        <>
            <Link href='/signout' className={`${styles.container} ${pathName === '/signout'  && styles.active}`} >Sign out</Link>
            <p>
                <b>Signed in as {session.user?.email}</b>
            </p>
        </>
    ) : (
        <>
            <Link href='/signin' className={`${styles.container} ${pathName === '/signin'  && styles.active}`}>Sign in</Link>
            <Link href='/signup' className={`${styles.container} ${pathName === '/signup'  && styles.active}`}>Sign up</Link>
        </>
    )}
   

    
}



export default Links
