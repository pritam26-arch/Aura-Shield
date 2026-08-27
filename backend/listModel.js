require('dotenv').config();

async function showAvailableModels() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.log("❌ Error: GEMINI_API_KEY .env file mein nahi mili!");
        return;
    }

    try {
        console.log("⏳ Fetching models from Google...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            console.log("❌ API Error:", data.error.message);
            return;
        }

        console.log("\n🟢 Aapke liye available Gemini Models yeh hain:\n");
        data.models.forEach(model => {
            // Sirf 'generateContent' support karne wale text models filter kar rahe hain
            if (model.supportedGenerationMethods.includes("generateContent")) {
                console.log(`👉 ${model.name.replace('models/', '')}`);
            }
        });
        console.log("\n✅ Inme se koi bhi naam aap apne aiRoutes.js mein use kar sakte hain!");

    } catch (error) {
        console.error("❌ Failed to fetch models:", error);
    }
}

showAvailableModels();