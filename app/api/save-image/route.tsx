import { storage } from "@/config/firebaseConfig";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { url } = data;

    try {
        // Convert the image to a base64-encoded string
        const base64Image = "data:image/png;base64," + await convertImage(url);
        if (!base64Image) {
            return NextResponse.json({ error: "Failed to convert image to base64." }, { status: 400 });
        }

        console.log(`Base64 Image Length: ${base64Image.length}`); // Log length for debugging
        const fileName = '/ai-story/' + Date.now() + ".png";
        const imageRef = ref(storage, fileName);

        // Upload the image as a base64-encoded string using 'data_url'
        await uploadString(imageRef, base64Image, 'data_url');

        // Get the download URL after uploading
        const downloadUrl = await getDownloadURL(imageRef);
        console.log('File uploaded successfully, URL:', downloadUrl);

        return NextResponse.json({ imageUrl: downloadUrl });
    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// Helper function to convert an image to a base64 string
async function convertImage(imageUrl: string): Promise<string | null> {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const base64Image = Buffer.from(response.data, 'binary').toString('base64'); // Ensure binary encoding
        return base64Image;
    } catch (error) {
        console.error("Error converting base64 image:", error);
        return null; // Return null in case of error
    }
}



// import { storage } from "@/config/firebaseConfig";
// import axios from "axios";
// import { getDownloadURL, ref, uploadString } from "firebase/storage";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//     const data = await req.json();
//     const { url } = data;

//     try {
//         const base64Image = "data:image/png;base64," + await convertImage(url);
//         if (!base64Image) {
//             return NextResponse.json({ error: "Failed to convert image to base64." }, { status: 400 });
//         }

//         console.log(`Base64 Image Length: ${base64Image.length}`); // Log length for debugging
//         const fileName = '/ai-story/' + Date.now() + ".png";
//         const imageRef = ref(storage, fileName);

//         await uploadString(imageRef, base64Image, 'data_url'); // Change 'base64' to 'data_url'

//         const downloadUrl = await getDownloadURL(imageRef);
//         console.log('File uploaded successfully, URL:', downloadUrl);

//         return NextResponse.json({ imageUrl: downloadUrl });
//     } catch (error) {
//         console.error("Error uploading image:", error);
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//     }
// }

// export const convertImage = async (imageUrl: string) => {
//     try {
//         const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
//         const base64Image = Buffer.from(response.data, 'binary').toString('base64'); // Ensure binary encoding
//         return base64Image;
//     } catch (e) {
//         console.log("Error converting base64 image:", e);
//         return null; // Return null in case of error
//     }
// };


// import { storage } from "@/config/firebaseConfig";
// import axios from "axios";
// import { getDownloadURL, ref, uploadString } from "firebase/storage";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req:NextRequest){
//     const data=await req.json();
//     const {url}=data;

//     const base64Image="data:image/png;base64," + await convertImage(url)
//     const fileName='/ai-story/'+Date.now()+".png"
//     const imageRef=ref(storage,fileName)

//     await uploadString(imageRef,base64Image,'base64').then((snapshot)=>{
//         console.log('file uploaded')
//     })

//     const downloadeurl = await getDownloadURL(imageRef);
//     console.log(downloadeurl);

//     return NextResponse.json({imageUrl:downloadeurl})
// }

// export const convertImage=async(imageUrl:string)=>{
//     try{
//         const response=await axios.get(imageUrl,{responseType:'arraybuffer'});
//         const base64Image=Buffer.from (response.data).toString('base64');
//         return base64Image;
//     }catch(e){
//         console.log("Error converting base64 image")
//     }
// }