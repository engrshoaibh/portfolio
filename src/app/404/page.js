// app/404.js
export default function NotFound() {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <h1 className="text-6xl">404</h1>
        <p className="mt-4">Page Not Found</p>
        <a href="/" className="mt-8 text-blue-500 hover:underline">
          Go back to Home
        </a>
      </div>
    );
  }
  