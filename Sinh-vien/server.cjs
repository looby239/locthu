var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        aiClient = new import_genai.GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build"
            }
          }
        });
      } catch (error) {
        console.error("Failed to initialize Google Gen AI:", error);
      }
    }
  }
  return aiClient;
}
var getAcademicFallback = (userMessage) => {
  const msg = userMessage.toLowerCase();
  if (msg.includes("\u0111i\u1EC3m") || msg.includes("gpa") || msg.includes("t\xEDnh \u0111i\u1EC3m")) {
    return `Ch\xE0o b\u1EA1n! \u0110i\u1EC3m trung b\xECnh t\xEDch l\u0169y (GPA) h\u1EC7 4 t\u1EA1i DMRS \u0111\u01B0\u1EE3c t\xEDnh b\u1EB1ng t\u1ED5ng (\u0111i\u1EC3m h\u1ECDc ph\u1EA7n nh\xE2n s\u1ED1 t\xEDn ch\u1EC9) chia cho t\u1ED5ng s\u1ED1 t\xEDn ch\u1EC9. 
M\u1ED1c x\u1EBFp lo\u1EA1i:
- Xu\u1EA5t s\u1EAFc: 3.6 - 4.0
- Gi\u1ECFi: 3.2 - 3.59
- Kh\xE1: 2.5 - 3.19
- Trung b\xECnh: 2.0 - 2.49

B\u1EA1n c\xF3 th\u1EC3 xem chi ti\u1EBFt trong S\u1ED5 tay Sinh vi\xEAn 2024 \u1EDF m\u1EE5c t\xE0i li\u1EC7u.`;
  }
  if (msg.includes("h\u1ECDc b\u1ED5ng") || msg.includes("khuy\u1EBFn kh\xEDch")) {
    return `\u0110i\u1EC1u ki\u1EC7n \u0111\u1EC3 x\xE9t h\u1ECDc b\u1ED5ng khuy\u1EBFn kh\xEDch h\u1ECDc t\u1EADp t\u1EA1i DMRS k\u1EF3 n\xE0y:
1. \u0110\u0103ng k\xFD t\u1ED1i thi\u1EC3u 14 t\xEDn ch\u1EC9 trong h\u1ECDc k\u1EF3 ch\xEDnh.
2. \u0110i\u1EC3m trung b\xECnh chung h\u1ECDc t\u1EADp (GPA) \u0111\u1EA1t t\u1EEB 8.0/10 tr\u1EDF l\xEAn ( ho\u1EB7c 3.2/4.0 tr\u1EDF l\xEAn).
3. \u0110\u1EA1t \u0111i\u1EC3m r\xE8n luy\u1EC7n lo\u1EA1i T\u1ED1t tr\u1EDF l\xEAn (t\u1EEB 80 \u0111i\u1EC3m tr\u1EDF l\xEAn).
4. Kh\xF4ng b\u1ECB k\u1EF7 lu\u1EADt ho\u1EB7c c\xF3 h\u1ECDc ph\u1EA7n b\u1ECB \u0111i\u1EC3m F.`;
  }
  if (msg.includes("th\u1EBB sinh vi\xEAn") || msg.includes("m\u1EA5t th\u1EBB")) {
    return `Th\u1EE7 t\u1EE5c xin c\u1EA5p l\u1EA1i th\u1EBB sinh vi\xEAn t\u1EA1i V\u0103n ph\xF2ng \u0110\xE0o t\u1EA1o g\u1ED3m c\xE1c b\u01B0\u1EDBc:
1. T\u1EA3i m\u1EABu \u0111\u01A1n tr\u1EF1c tuy\u1EBFn tr\xEAn h\u1EC7 th\u1ED1ng DMRS.
2. \u0110i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 th\xF4ng tin c\xE1 nh\xE2n v\xE0 xin x\xE1c nh\u1EADn c\u1EE7a Ban Ch\u1EE7 nhi\u1EC7m Khoa.
3. N\u1ED9p k\xE8m 1 \u1EA3nh th\u1EBB 3x4 t\u1EA1i ph\xF2ng ti\u1EBFp nh\u1EADn h\u1ED3 s\u01A1.
4. L\u1EC7 ph\xED c\u1EA5p l\u1EA1i: 50.000 VN\u0110. Th\u1EDDi gian x\u1EED l\xFD l\xE0 5-7 ng\xE0y l\xE0m vi\u1EC7c.`;
  }
  if (msg.includes("\u0111\u0103ng k\xFD h\u1ECDc") || msg.includes("quy ch\u1EBF") || msg.includes("b\u1ED5 sung")) {
    return `Theo Quy ch\u1EBF \u0110\xE0o t\u1EA1o 2024 c\u1EE7a DMRS, c\xE1c m\u1ED1c th\u1EDDi gian quy \u0111\u1ECBnh \u0111\u0103ng k\xFD h\u1ECDc ph\u1EA7n b\u1ED5 sung/\u0111i\u1EC1u ch\u1EC9nh \u0111\u1EE3t cu\u1ED1i h\u1ECDc k\u1EF3 n\xE0y l\xE0:
- \u0110\u0103ng k\xFD \u0111\u1EE3t 1: 15/08 \u2013 20/08 (\u0110\xE3 th\xE0nh c\xF4ng)
- \u0110i\u1EC1u ch\u1EC9nh \u0111\u1EE3t cu\u1ED1i: 01/09 \u2013 05/09 (Tr\u1EA1ng th\xE1i: Ch\u1EDD x\u1EED l\xFD)

L\u01B0u \xFD: H\u1ECDc vi\xEAn ph\u1EA3i \u0111\xF3ng h\u1ECDc ph\xED b\u1ED5 sung tr\u01B0\u1EDBc ng\xE0y 15/09 \u0111\u1EC3 h\u1ECDc ph\u1EA7n \u0111i\u1EC1u ch\u1EC9nh \u0111\u1EE3t cu\u1ED1i ch\xEDnh th\u1EE9c c\xF3 hi\u1EC7u l\u1EF1c h\u1ECDc t\u1EADp.`;
  }
  if (msg.includes("xin ch\xE0o") || msg.includes("hello") || msg.includes("hi")) {
    return `Ch\xE0o b\u1EA1n! T\xF4i l\xE0 DMRS Assistant, tr\u1EE3 l\xFD AI chuy\xEAn h\u1ED7 tr\u1EE3 c\xE1c b\u1EA1n Sinh vi\xEAn t\u1EA1i DMRS. T\xF4i c\xF3 th\u1EC3 gi\u1EA3i \u0111\xE1p c\xE1c th\u1EAFc m\u1EAFc v\u1EC1 quy \u0111\u1ECBnh \u0111\xE0o t\u1EA1o, ph\xF2ng d\u1ECBch v\u1EE5 sinh vi\xEAn, t\xECm ki\u1EBFm t\xE0i li\u1EC7u h\u1ECDc t\u1EADp, ho\u1EB7c h\u1ED7 tr\u1EE3 b\u1EA1n s\u1EAFp x\u1EBFp l\u1ECBch thi. H\xF4m nay b\u1EA1n c\u1EA7n tr\u1EE3 gi\xFAp g\xEC n\xE0o?`;
  }
  return `C\u1EA3m \u01A1n c\xE2u h\u1ECFi c\u1EE7a b\u1EA1n. C\xE2u h\u1ECFi c\u1EE7a b\u1EA1n v\u1EC1: "${userMessage}" c\xF3 li\xEAn quan \u0111\u1EBFn h\u1EC7 th\u1ED1ng qu\u1EA3n l\xFD d\u1EEF li\u1EC7u t\u1ED1i \u01B0u DMRS. 
T\xF4i g\u1EE3i \xFD b\u1EA1n n\xEAn xem th\xEAm t\xE0i li\u1EC7u "S\u1ED5 tay Sinh vi\xEAn 2024" ho\u1EB7c s\u1EED d\u1EE5ng ch\u1EE9c n\u0103ng "C\xE2u tr\u1EA3 l\u1EDDi \u0111\xE3 l\u01B0u" \u0111\u1EC3 tra c\u1EE9u c\xE1c quy \u0111\u1ECBnh t\u01B0\u01A1ng \u0111\u01B0\u01A1ng. B\u1EA1n c\xF3 c\u1EA7n t\xF4i h\u1ED7 tr\u1EE3 tr\u1EF1c ti\u1EBFp t\u1EEB v\u0103n ph\xF2ng \u0111\xE0o t\u1EA1o kh\xF4ng?`;
};
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  const ai = getGeminiClient();
  if (!ai) {
    const fallbackText = getAcademicFallback(message);
    return res.json({ text: fallbackText });
  }
  try {
    const systemPrompt = `You are DMRS Assistant, an AI expert managing document classification and answering student queries for the DMRS (Document Management & Retrieval System).
Respond in professional, friendly Vietnamese. Focus on student needs (registration, schedules, transcripts, university regulations).
Keep answers highly helpful, split into clear points, and use Markdown formatting where useful (e.g. bold terms, short lists).
Keep answers concise (around 150-250 words MAX) as they fit in chat bubbles.

User query is: "${message}"`;
    const chatHistory = history ? history.map((h) => ({
      role: h.sender === "user" ? "user" : "model",
      parts: [{ text: h.text }]
    })) : [];
    const contents = [...chatHistory, { role: "user", parts: [{ text: systemPrompt }] }];
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents
    });
    const text = response.text || "Xin l\u1ED7i, t\xF4i g\u1EB7p s\u1EF1 c\u1ED1 khi x\u1EED l\xFD d\u1EEF li\u1EC7u. Vui l\xF2ng th\u1EED l\u1EA1i.";
    return res.json({ text });
  } catch (err) {
    console.error("Gemini API Error:", err);
    const fallbackText = getAcademicFallback(message);
    return res.json({ text: fallbackText, note: "API Error Fallback activated" });
  }
});
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DMRS server running at http://localhost:${PORT}`);
  });
}
initServer().catch((err) => {
  console.error("Failed to start DMRS server:", err);
});
//# sourceMappingURL=server.cjs.map
