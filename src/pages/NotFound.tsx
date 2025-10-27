import { Link } from "react-router-dom"
import Header from "../components/Header";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Header header="Page Not Found" />
      <Link to="/" className="underline">Go back to home page</Link>
    </div>
  )
}

export default NotFound;