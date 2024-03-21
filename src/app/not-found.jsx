const { default: Link } = require("next/link")


const NotFound = () => {

    return(
        <div>
            <h2>Not found</h2>
            <p> Sorry the page that you are looking for does not exist</p>
            <Link href="/"> Return Home</Link>
        </div>
        )
}

export default NotFound