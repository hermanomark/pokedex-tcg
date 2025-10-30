import { Link } from "react-router-dom"
import Header from "../components/Header";

const NotFound = () => {
  return (
    <div className="flex flex-col h-100 w-full justify-center items-center gap-4">
      <Header header="Page Not Found" />
      <Link to="/" className="underline text-primary">Go back to home page</Link>
    </div>
  )
}

export default NotFound;