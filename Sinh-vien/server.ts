import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Google Gen AI setup
let aiClient: any = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        aiClient = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
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

// Academic response helper if Gemini is unavailable
const getAcademicFallback = (userMessage: string) => {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes("điểm") || msg.includes("gpa") || msg.includes("tính điểm")) {
    return `Chào bạn! Điểm trung bình tích lũy (GPA) hệ 4 tại DMRS được tính bằng tổng (điểm học phần nhân số tín chỉ) chia cho tổng số tín chỉ. 
Mốc xếp loại:
- Xuất sắc: 3.6 - 4.0
- Giỏi: 3.2 - 3.59
- Khá: 2.5 - 3.19
- Trung bình: 2.0 - 2.49

Bạn có thể xem chi tiết trong Sổ tay Sinh viên 2024 ở mục tài liệu.`;
  }
  
  if (msg.includes("học bổng") || msg.includes("khuyến khích")) {
    return `Điều kiện để xét học bổng khuyến khích học tập tại DMRS kỳ này:
1. Đăng ký tối thiểu 14 tín chỉ trong học kỳ chính.
2. Điểm trung bình chung học tập (GPA) đạt từ 8.0/10 trở lên ( hoặc 3.2/4.0 trở lên).
3. Đạt điểm rèn luyện loại Tốt trở lên (từ 80 điểm trở lên).
4. Không bị kỷ luật hoặc có học phần bị điểm F.`;
  }

  if (msg.includes("thẻ sinh viên") || msg.includes("mất thẻ")) {
    return `Thủ tục xin cấp lại thẻ sinh viên tại Văn phòng Đào tạo gồm các bước:
1. Tải mẫu đơn trực tuyến trên hệ thống DMRS.
2. Điền đầy đủ thông tin cá nhân và xin xác nhận của Ban Chủ nhiệm Khoa.
3. Nộp kèm 1 ảnh thẻ 3x4 tại phòng tiếp nhận hồ sơ.
4. Lệ phí cấp lại: 50.000 VNĐ. Thời gian xử lý là 5-7 ngày làm việc.`;
  }

  if (msg.includes("đăng ký học") || msg.includes("quy chế") || msg.includes("bổ sung")) {
    return `Theo Quy chế Đào tạo 2024 của DMRS, các mốc thời gian quy định đăng ký học phần bổ sung/điều chỉnh đợt cuối học kỳ này là:
- Đăng ký đợt 1: 15/08 – 20/08 (Đã thành công)
- Điều chỉnh đợt cuối: 01/09 – 05/09 (Trạng thái: Chờ xử lý)

Lưu ý: Học viên phải đóng học phí bổ sung trước ngày 15/09 để học phần điều chỉnh đợt cuối chính thức có hiệu lực học tập.`;
  }

  if (msg.includes("xin chào") || msg.includes("hello") || msg.includes("hi")) {
    return `Chào bạn! Tôi là DMRS Assistant, trợ lý AI chuyên hỗ trợ các bạn Sinh viên tại DMRS. Tôi có thể giải đáp các thắc mắc về quy định đào tạo, phòng dịch vụ sinh viên, tìm kiếm tài liệu học tập, hoặc hỗ trợ bạn sắp xếp lịch thi. Hôm nay bạn cần trợ giúp gì nào?`;
  }

  return `Cảm ơn câu hỏi của bạn. Câu hỏi của bạn về: "${userMessage}" có liên quan đến hệ thống quản lý dữ liệu tối ưu DMRS. 
Tôi gợi ý bạn nên xem thêm tài liệu "Sổ tay Sinh viên 2024" hoặc sử dụng chức năng "Câu trả lời đã lưu" để tra cứu các quy định tương đương. Bạn có cần tôi hỗ trợ trực tiếp từ văn phòng đào tạo không?`;
};

// API: Core Chat Route with Gemini
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const ai = getGeminiClient();

  if (!ai) {
    // Return mock fallback
    const fallbackText = getAcademicFallback(message);
    return res.json({ text: fallbackText });
  }

  try {
    // Generate Prompt with rich context for Vietnamese DMRS system
    const systemPrompt = `You are DMRS Assistant, an AI expert managing document classification and answering student queries for the DMRS (Document Management & Retrieval System).
Respond in professional, friendly Vietnamese. Focus on student needs (registration, schedules, transcripts, university regulations).
Keep answers highly helpful, split into clear points, and use Markdown formatting where useful (e.g. bold terms, short lists).
Keep answers concise (around 150-250 words MAX) as they fit in chat bubbles.

User query is: "${message}"`;

    const chatHistory = history ? history.map((h: any) => ({
      role: h.sender === "user" ? "user" : "model",
      parts: [{ text: h.text }]
    })) : [];

    const contents = [...chatHistory, { role: "user", parts: [{ text: systemPrompt }] }];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
    });

    const text = response.text || "Xin lỗi, tôi gặp sự cố khi xử lý dữ liệu. Vui lòng thử lại.";
    return res.json({ text });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    // Graceful fallback on API error
    const fallbackText = getAcademicFallback(message);
    return res.json({ text: fallbackText, note: "API Error Fallback activated" });
  }
});

// Serve UI assets & hook up Vite in Dev or Dist in Prod
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DMRS server running at http://localhost:${PORT}`);
  });
}

initServer().catch((err) => {
  console.error("Failed to start DMRS server:", err);
});
