import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface GooglePlace {
  place_id: string;
  name: string;
}

interface GooglePlaceDetails {
  result: {
    name: string;
    formatted_phone_number?: string;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { cep, keyword, clientCount } = req.body;

  if (!cep || !keyword || !clientCount) {
    return res.status(400).json({ message: 'Parâmetros inválidos' });
  }

  // Definir uma chave API para Google Maps
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ 
      message: 'Chave de API do Google Maps não configurada. Configure a variável de ambiente GOOGLE_MAPS_API_KEY.' 
    });
  }

  try {
    // 1. Primeiro, converter o CEP em coordenadas de latitude e longitude
    const geocodeResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cep)}&key=${apiKey}`
    );

    if (geocodeResponse.data.status !== 'OK') {
      return res.status(400).json({ message: 'CEP inválido ou não encontrado' });
    }

    const location = geocodeResponse.data.results[0].geometry.location;
    const { lat, lng } = location;

    // 2. Usar a API Places para buscar negócios com a palavra-chave próximos ao CEP
    const placesResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&keyword=${encodeURIComponent(keyword)}&key=${apiKey}`
    );

    if (placesResponse.data.status !== 'OK') {
      return res.status(400).json({ 
        message: 'Não foi possível encontrar resultados para a pesquisa',
        googleStatus: placesResponse.data.status
      });
    }

    // 3. Limitar aos primeiros resultados conforme solicitado
    const places = placesResponse.data.results.slice(0, Math.min(clientCount, 20));
    
    // 4. Para cada lugar, obter mais detalhes, incluindo o telefone
    const results = await Promise.all(
      places.map(async (place: GooglePlace) => {
        const detailsResponse = await axios.get<GooglePlaceDetails>(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_phone_number&key=${apiKey}`
        );

        const details = detailsResponse.data.result;
        
        return {
          nome: details.name || place.name,
          telefone: details.formatted_phone_number || 'Telefone não disponível'
        };
      })
    );
    
    return res.status(200).json({ results });
  } catch (error: any) {
    console.error('Erro na API de busca:', error);
    return res.status(500).json({ 
      message: 'Erro ao buscar dados', 
      error: error.response?.data || error.message 
    });
  }
} 