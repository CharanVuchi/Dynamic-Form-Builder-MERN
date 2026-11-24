import { descriptions, metaDesription } from "./message.js";

const apiResponse = (res, result) => {
  const meta = metaDesription(result);
  const description = descriptions?.[result.action];

  let desc = description?.desc;
  const { response: _, ...errorWithoutResponse } = description || {};

  const response_json = {
    action: result?.action,
    code: description?.code,
    data: result?.data || null,
    error: description?.response === "FAILED" ? { ...errorWithoutResponse, desc, ...(result?.missing_fields && { fields: result?.missing_fields }) } : null,
    meta: meta,
    status: descriptions?.[result.action]?.response,
    success: description?.response === "PASSED" ? { ...errorWithoutResponse, desc } : null,
  };

  res.status(description?.code).json(response_json);
};

const internalServerResponse = (res, error) => {
  const description = descriptions?.[5];
  const { response: _, ...errorWithoutResponse } = description || {};

  const response_json = {
    action: 5,
    code: description?.code,
    data: null,
    error: description?.response === "FAILED" ? errorWithoutResponse : null,
    meta: null,
    status: descriptions?.[5]?.response,
    success: null,
    ...(isDev && { debug: error?.message }),
  };

  res.status(500).json(response_json);
};

export { apiResponse, internalServerResponse };
