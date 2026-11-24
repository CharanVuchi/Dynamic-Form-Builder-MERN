import { Tag } from "antd";
import { FiEye, FiSave, FiSend } from "react-icons/fi";
import { Button } from "../../../../../components";

const BuilderHeader = ({
  title = "Create Form",
  description = "Build a dynamic form by adding, editing and configuring fields.",
  status = "Draft",
  onPreview,
  onSaveDraft,
  onPublish,
  saving = false,
  publishing = false,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      {/* Left Section */}
      <div>
        <h1 className="text-[24px] font-bold text-[#161F42]">{title}</h1>

        <p className="text-base text-[#718096] mt-1">{description}</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Status */}
        <Tag variant="filled" className={`!rounded-full !px-3 !py-1 font-medium ${status === "Published" ? "!bg-[#E8F8EF] !text-[#16834B]" : "!bg-[#FFF3DC] !text-[#B7791F]"}`}>
          {status}
        </Tag>

        {/* Preview */}
        <Button variant="outline" textContent="Preview" icon={<FiEye />} onClick={onPreview} className="h-8 px-5" />

        {/* Save Draft */}
        <Button variant="outline" textContent="Save Draft" icon={<FiSave />} onClick={onSaveDraft} isLoading={saving} className="h-8 px-5" />

        {/* Publish */}
        <Button variant="primary" textContent="Publish" icon={<FiSend />} onClick={onPublish} isLoading={publishing} className="h-8 px-5" />
      </div>
    </div>
  );
};

export default BuilderHeader;
