export interface ApiResponse {
  headers: {
      "Access-Control-Allow-Origin": string;
      "Access-Control-Allow-Credentials": boolean;
      [key: string]: string | boolean;
  };
  statusCode: number;
  body: string; 
}

const sendResponse = (statusCode: number, body: any, headers: Record<string, string | boolean> = {}): ApiResponse => ({
  headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      ...headers,
  },
  statusCode,
  body: JSON.stringify(body),
});

export default sendResponse;