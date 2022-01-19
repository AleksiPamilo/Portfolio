import React from 'react'
import { Link } from "react-router-dom";

type NotFoundProps = {

}

const NotFound: React.FC<NotFoundProps> = () => {

  document.title = "404 | Not Found";

  return (
    <div className="md:ml-60 md:mt-44 ml-5 mt-14">
      <p className="text-cyan-500 md:text-2xl text-xl">An error occurred</p>
      <h1 className="name mt-2 md:text-7xl text-3xl">404 | Page Not Found</h1>
      <p className="secondary-txt mt-5 mb-10 md:text-2xl text-md">Are you lost? How did you even get here?</p>
      <Link to="/" className="py-4 px-5 text-xl rounded border-2 text-cyan-500 border-cyan-500">Back to Home Page!</Link>
    </div>
  )
}

export default NotFound
