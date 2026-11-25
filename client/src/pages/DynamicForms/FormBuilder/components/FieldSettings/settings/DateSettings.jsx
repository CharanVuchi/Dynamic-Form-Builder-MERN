import { DatePicker } from "src/components";
import dayjs from "dayjs";

const DateSettings = ({ field, onUpdate }) => {
  const validation = field.validation || {};

  const minDate = validation.minDate ? dayjs(validation.minDate) : null;
  const maxDate = validation.maxDate ? dayjs(validation.maxDate) : null;

  const handleChange = (key, value) => {
    onUpdate({
      validation: {
        ...validation,
        [key]: value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="block text-sm font-medium text-[var(--theme-text-neutral-strong)] mb-2">Start Date</label>

        <DatePicker
          value={minDate}
          format="DD-MM-YYYY"
          placeholder="Select start date"
          className="w-full h-10"
          disabledDate={(current) => Boolean(maxDate) && current.isAfter(maxDate, "day")}
          onChange={(value) => handleChange("minDate", value ? value.format("YYYY-MM-DD") : null)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--theme-text-neutral-strong)] mb-2">End Date</label>

        <DatePicker
          value={maxDate}
          format="DD-MM-YYYY"
          placeholder="Select end date"
          className="w-full h-10"
          disabledDate={(current) => Boolean(minDate) && current.isBefore(minDate, "day")}
          onChange={(value) => handleChange("maxDate", value ? value.format("YYYY-MM-DD") : null)}
        />
      </div>

      <p className="text-xs text-[var(--theme-text-subtle)]">Users can only pick a date within the selected start and end date range.</p>
    </div>
  );
};

export default DateSettings;
