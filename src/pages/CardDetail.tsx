import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardById } from "../services/cards";
import { useQuery } from "@tanstack/react-query";
import BackButton from "@/components/BackButton";
import { Spinner } from "@/components/ui/spinner";

interface CardData {
  id: string;
  name: string;
  localId: string;
  hp: number;
  stage: string;
  image: string;
  types: string[];
  illustrator: string;
  variants: {
    firstEdition: boolean;
  };
  rarity: string;
  set: {
    name: string;
  };
  attacks?: Array<{
    name: string;
    damage: string;
    cost: string[];
    effect: string;
  }>;
  legal: {
    standard: boolean;
    expanded: boolean;
  };
  pricing?: {
    tcgplayer?: {
      unit: string;
      updated: string;
      holofoil?: {
        marketPrice: number;
        lowPrice: number;
      };
      normal?: {
        marketPrice: number;
        lowPrice: number;
      };
      "reverse-holofoil"?: {
        marketPrice: number;
        lowPrice: number;
      };
    };
  };
}

const CardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: pokemonData, error, isError, isLoading } = useQuery<CardData, Error>({
    queryKey: ['card', id],
    queryFn: () => {
      if (!id) throw new Error('Card ID is required');
      return getCardById(id);
    },
    enabled: !!id,
    retry: false
  });

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        navigate('/cards');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isError, navigate]);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Grass: 'bg-green-500',
      Fire: 'bg-red-500',
      Water: 'bg-blue-500',
      Electric: 'bg-yellow-500',
      Psychic: 'bg-purple-500',
      Fighting: 'bg-orange-700',
      Darkness: 'bg-gray-800',
      Metal: 'bg-gray-500',
      Colorless: 'bg-gray-400',
    };
    return colors[type] || 'bg-gray-400';
  };

  const formatPrice = (price: number | undefined, unit: string) => {
    return `${unit === 'USD' ? '$' : '€'}${price?.toFixed(2)}`;
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) return <Spinner />;

  if (isError) return <p className="text-red-700">Error: {error.message}, redirecting in 3, 2, 1...</p>;

  if (!pokemonData) return <p>No data found</p>;

  return (<>
    <BackButton />
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{pokemonData.name}</h2>
          <span className="text-sm opacity-80">#{pokemonData.localId}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm">HP {pokemonData.hp}</span>
          <span className="text-sm">{pokemonData.stage}</span>
        </div>
      </div>

      {/* Card Image */}
      <div className="p-4 bg-gray-50">
        <img
          src={`${pokemonData.image}/high.png`}
          alt={pokemonData.name}
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>

      {/* Card Details */}
      <div className="p-4 space-y-3">
        {/* Types */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Type:</span>
          <div className="flex gap-1">
            {pokemonData.types?.map((type, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getTypeColor(type)}`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            <span className="font-medium">Illustrator:</span> {pokemonData.illustrator}
          </span>
          <span className="text-gray-600">
            <span className="font-medium">Variant:</span> {pokemonData.variants.firstEdition}
          </span>
        </div>

        {/* Rarity and Set */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            <span className="font-medium">Rarity:</span> {pokemonData.rarity}
          </span>
          <span className="text-gray-600">
            <span className="font-medium">Set:</span> {pokemonData.set.name}
          </span>
        </div>

        {/* Attacks */}
        {pokemonData.attacks && pokemonData.attacks.length > 0 && (
          <>
            <span className="text-sm font-medium text-gray-600">Attacks:</span>
            <div className="mt-1 space-y-1">
              {pokemonData.attacks.map((attack, index) => (
                <div key={index} className="bg-gray-50 rounded p-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{attack.name}</span>
                    <span className="text-sm text-red-600 font-bold">{attack.damage}</span>
                  </div>
                  <div className="flex gap-1 mt-1">
                    {attack.cost.map((cost, costIndex) => (
                      <span
                        key={costIndex}
                        className={`px-1 py-0.5 rounded text-xs text-white ${getTypeColor(cost)}`}
                      >
                        {cost}
                      </span>
                    ))}
                  </div>
                  <p className="text-left text-sm text-gray-600 mt-2">
                    {attack.effect}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Legal Formats */}
        {(pokemonData.legal.standard || pokemonData.legal.expanded) && (
          <div className="flex gap-2">
            <span className="text-sm font-medium text-gray-600">Legal in:</span>
            <div className="flex gap-2">
              {pokemonData.legal.standard && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                  Standard
                </span>
              )}
              {pokemonData.legal.expanded && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                  Expanded
                </span>
              )}
            </div>
          </div>)}

        {/* Pricing */}
        {pokemonData.pricing?.tcgplayer && (
          <div className="border-t pt-3 border-gray-200">
            <span className="text-sm font-medium text-gray-600">TCGPlayer Pricing:</span>
            <div className="grid grid-cols-2 gap-2 mt-1 text-xs">

              {pokemonData.pricing.tcgplayer?.holofoil && (
                <div className="bg-gray-50 rounded p-2">
                  <div className="font-medium">Holo</div>
                  <div>Market: {formatPrice(pokemonData.pricing.tcgplayer?.holofoil?.marketPrice, pokemonData.pricing.tcgplayer?.unit)}</div>
                  <div className="text-gray-600">
                    Low: {formatPrice(pokemonData.pricing.tcgplayer?.holofoil?.lowPrice, pokemonData.pricing.tcgplayer?.unit)}
                  </div>
                </div>
              )}

              {pokemonData.pricing.tcgplayer?.normal && (
                <div className="bg-gray-50 rounded p-2">
                  <div className="font-medium">Normal</div>
                  <div>Market: {formatPrice(pokemonData.pricing.tcgplayer?.normal?.marketPrice, pokemonData.pricing.tcgplayer?.unit)}</div>
                  <div className="text-gray-600">
                    Low: {formatPrice(pokemonData.pricing.tcgplayer?.normal?.lowPrice, pokemonData.pricing.tcgplayer?.unit)}
                  </div>
                </div>
              )}

              {pokemonData.pricing.tcgplayer["reverse-holofoil"] && (
                <div className="bg-gray-50 rounded p-2">
                  <div className="font-medium">Reverse Holo</div>
                  <div>Market: {formatPrice(pokemonData.pricing.tcgplayer["reverse-holofoil"]?.marketPrice, pokemonData.pricing.tcgplayer?.unit)}</div>
                  <div className="text-gray-600">
                    Low: {formatPrice(pokemonData.pricing.tcgplayer["reverse-holofoil"]?.lowPrice, pokemonData.pricing.tcgplayer?.unit)}
                  </div>
                </div>
              )}
            </div>
            <div className="text-left w-full">
              <span className="text-xs text-gray-600">Last price updated: {formatDate(pokemonData.pricing.tcgplayer?.updated)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  </>);
}

export default CardDetail;