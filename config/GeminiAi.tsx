/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "create kids story on description for 5-8 years kids, educational story, and all images in paper cut style: story of boy and magic school, give me 5 chapter, with detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON field format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"story\": {\n    \"title\": \"The Boy Who Found Magic School\",\n    \"cover_image\": {\n      \"description\": \"A boy, about 7 years old, with messy brown hair and a mischievous grin, stands in front of a large, colorful building that seems to shimmer. The building has swirling windows, a door with a golden handle, and a sign that reads 'Magic School' in bubble letters. The boy is holding a book in one hand and a wand in the other, both glowing with a soft, magical light.\",\n      \"style\": \"Paper cut style, with vibrant colors and whimsical details.\"\n    },\n    \"chapters\": [\n      {\n        \"title\": \"The Mysterious Note\",\n        \"description\": \"A young boy named Leo is playing in his backyard when he discovers a crumpled, handwritten note under a rose bush. The note is written in a spidery script and invites him to a magical school.\",\n        \"image\": {\n          \"description\": \"Leo, with brown hair and bright blue eyes, is crouched down in a backyard filled with flowers. He's holding the note in his hands, his brow furrowed in concentration. The note is a simple piece of paper with faded ink, but it's surrounded by a faint, glowing aura.\",\n          \"style\": \"Paper cut style, with a soft, whimsical feel.\"\n        }\n      },\n      {\n        \"title\": \"The Secret Door\",\n        \"description\": \"Leo, intrigued by the note, follows the directions and finds a hidden door in his own backyard. The door is carved from wood and adorned with an intricate design of swirling vines and magical creatures.\",\n        \"image\": {\n          \"description\": \"Leo stands before a large, wooden door with a vine-covered frame. The door is hidden among trees and bushes, and only a small part of it is visible. There is a glowing inscription above the door that reads 'Magic School' in swirling letters.\",\n          \"style\": \"Paper cut style, with a focus on detail and texture.\"\n        }\n      },\n      {\n        \"title\": \"Welcome to Magic School\",\n        \"description\": \"Leo steps through the door and finds himself in a magical school unlike anything he's ever seen. The classrooms are filled with talking animals, floating books, and bubbling potions.\",\n        \"image\": {\n          \"description\": \"Leo is standing in a hallway lined with colorful classrooms. Each classroom has a unique design - one has a giant talking cat sitting on a desk, another has books flying through the air, and another has bubbling cauldrons filled with glowing liquids.\",\n          \"style\": \"Paper cut style, with bright and playful colors.\"\n        }\n      },\n      {\n        \"title\": \"The Magic Lesson\",\n        \"description\": \"Leo learns about the different types of magic, from simple spells to powerful enchantments. He practices his magic with other students, all of whom have different abilities and personalities.\",\n        \"image\": {\n          \"description\": \"Leo is sitting in a classroom with a group of other students, all wearing magical robes. They are surrounded by books, wands, and other magical objects. The teacher, a kind-looking wizard with a long beard, is demonstrating a spell with a swirling, luminous wand.\",\n          \"style\": \"Paper cut style, with a focus on intricate details and magical elements.\"\n        }\n      },\n      {\n        \"title\": \"The Magic of Friendship\",\n        \"description\": \"Leo learns that the most important magic is the magic of friendship. He and his new classmates work together to solve a problem and discover that even the smallest act of kindness can have a powerful effect.\",\n        \"image\": {\n          \"description\": \"Leo and his friends are standing together in a circle, their hands clasped. They are smiling brightly and their wands are glowing with a warm, friendly light. Behind them, the magical school is bathed in a soft, golden glow.\",\n          \"style\": \"Paper cut style, with a focus on warmth and camaraderie.\"\n        }\n      }\n    ]\n  }\n}\n```"},
          ],
        },
      ],
    });
