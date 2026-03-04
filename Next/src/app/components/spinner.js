export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-40 bg-black/65 backdrop-blur-xl">
      <div className="w-14 h-14 rounded-full border-4 border-slate-400 border-t-white border-b-white animate-spin"></div>
    </div>
  );
}
