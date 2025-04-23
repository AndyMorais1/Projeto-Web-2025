import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

if (!GOOGLE_MAPS_API_KEY) {
    throw new Error("Google Maps API Key não definida no arquivo .env");
}

export async function getCoordinates(
    address: string,
    city: string,
    zipCode: string
): Promise<{ latitude: number; longitude: number } | null> {
    const formattedAddress = `${address}, ${city}, Portugal, ${zipCode}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formattedAddress)}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
        const { data } = await axios.get(url);

        console.log("📦 Google API response:", JSON.stringify(data, null, 2));

        if (data.status === "OK") {
            const location = data.results[0]?.geometry?.location;
            if (location) {
                console.log(" Coordenadas encontradas:", location);
                return { latitude: location.lat, longitude: location.lng };
            }
        } else {
            console.warn(" Erro na resposta da API:", data.status, data.error_message || "");
        }
    } catch (error) {
        console.error(" Erro ao buscar coordenadas:", (error as Error).message);
    }

    return null;
}
