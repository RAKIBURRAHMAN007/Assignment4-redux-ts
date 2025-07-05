import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-xl text-gray-700">Oops! Page not found.</p>
        <p className="text-sm text-gray-500">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
