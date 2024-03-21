const { default: Link } = require("next/link")

import NavLink from "./NavbarLink/NavbarLink"
import styles from "./links.module.css"

const Links = () => {
    const links = [
        {title:"Homepage",
         path:"/"},
         {title:"to-do-app",
         path:"/to-do-app"},
         {title:"products",
         path:"/products"},
         {title:"tic-tac-toe",
         path:"/tic-tac-toe"},
         {title:"About",
         path:"/about"},
         {title:"Contact",
         path:"/contact"},
         {title:"Blog",
         path:"/blog"},
    ]


return(
    <div className={styles.links}>
        {links.map((link) => 
        <NavLink item={link} key={link.title} />
        )}
    </div>


)

        }



export default Links