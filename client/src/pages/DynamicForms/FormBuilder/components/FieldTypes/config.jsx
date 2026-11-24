
import {
  FiType,
  FiMail,
  FiHash,
  FiPhone,
  FiAlignLeft,
  FiCalendar,
  FiChevronDown,
  FiCircle,
  FiCheckSquare,
} from "react-icons/fi";

export const FIELD_TYPES = [
  {
    type: "text",
    label: "Text Input",
    description: "Single line text",
    icon: FiType,
  },
  {
    type: "email",
    label: "Email",
    description: "Email address",
    icon: FiMail,
  },
  {
    type: "number",
    label: "Number",
    description: "Numeric input",
    icon: FiHash,
  },
  {
    type: "phone",
    label: "Phone",
    description: "Phone number",
    icon: FiPhone,
  },
  {
    type: "textarea",
    label: "Text Area",
    description: "Multi-line text",
    icon: FiAlignLeft,
  },
  {
    type: "date",
    label: "Date Picker",
    description: "Date selection",
    icon: FiCalendar,
  },
  {
    type: "select",
    label: "Dropdown",
    description: "Select an option",
    icon: FiChevronDown,
  },
  {
    type: "radio",
    label: "Radio Button",
    description: "Single choice",
    icon: FiCircle,
  },
  {
    type: "checkbox",
    label: "Checkbox",
    description: "Multiple choices",
    icon: FiCheckSquare,
  },
];
