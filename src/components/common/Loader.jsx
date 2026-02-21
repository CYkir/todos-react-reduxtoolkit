export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 space-y-2">
      <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
}
