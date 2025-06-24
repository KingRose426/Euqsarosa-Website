export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page Not Found</p>
      <a href="/" className="text-purple-400 hover:underline">
        Go back home
      </a>
    </div>
  );
}
