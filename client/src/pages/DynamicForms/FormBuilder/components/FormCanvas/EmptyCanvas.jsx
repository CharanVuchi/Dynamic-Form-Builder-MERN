import { FiPlus, FiMousePointer } from "react-icons/fi";

const EmptyCanvas = () => {
  return (
    <div className="min-h-[420px] flex flex-col items-center justify-center text-center border-2 border-dashed border-[#D9E0EA] rounded-xl bg-[#FAFBFD] p-8">
      <div className="w-16 h-16 rounded-2xl bg-[#EDF1FF] flex items-center justify-center mb-4">
        <FiMousePointer size={28} className="text-[#283B80]" />
      </div>

      <h3 className="text-lg font-semibold text-[#161F42]">Start Building Your Form</h3>

      <p className="text-sm text-[#8190AA] mt-2 max-w-[320px]">Select a field type from the left panel to add your first field. Your form fields will appear here.</p>

      <div className="flex items-center gap-2 mt-5 text-sm text-[#8190AA]">
        <FiPlus size={16} />
        <span>Add your first field</span>
      </div>
    </div>
  );
};

export default EmptyCanvas;
