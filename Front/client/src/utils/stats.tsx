// Passo 1: Funções utilitárias para salvar e ler visualizações/favoritos
import { housesServices } from "@/api/Houses";


export async function incrementHouseView(houseId: string): Promise<void> {
  try {
    await housesServices.incrementView(houseId);
  } catch (error: any) {
    console.error("Erro ao registrar visualização:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      fullError: error,
    });
  }
}

export function incrementHouseSave(houseId: string) {
  const saves = JSON.parse(localStorage.getItem("saveCounts") || "{}");
  saves[houseId] = (saves[houseId] || 0) + 1;
  localStorage.setItem("saveCounts", JSON.stringify(saves));
}

export function getTopViewedHouses(houses: any[], top = 5) {
  const views = JSON.parse(localStorage.getItem("viewCounts") || "{}");
  return [...houses]
    .sort((a, b) => (views[b.id] || 0) - (views[a.id] || 0))
    .slice(0, top);
}

export function getTopSavedHouses(houses: any[], top = 5) {
  const saves = JSON.parse(localStorage.getItem("saveCounts") || "{}");
  return [...houses]
    .sort((a, b) => (saves[b.id] || 0) - (saves[a.id] || 0))
    .slice(0, top);
}
