// testGetCoordinates.ts
import { getCoordinates } from './src/utils/getCoordinates';

(async () => {
    const coords = await getCoordinates("Rua das Flores", "Lisboa", "1200-195");
    console.log("Resultado:", coords);
})();
