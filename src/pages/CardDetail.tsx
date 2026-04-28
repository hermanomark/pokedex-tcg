import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardById } from "@/services/cards";
import { useQuery } from "@tanstack/react-query";
import BackButton from "@/components/BackButton";
import { Spinner } from "@/components/ui/spinner";
import FadeUp from "@/components/FadeUp";

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

  const { data: pokemonData,
    isLoading,
    error: errorCardDetail, isError: isErrorCardDetail } = useQuery<CardData, Error>({
      queryKey: ['card', id],
      queryFn: () => {
        if (!id) throw new Error('Card ID is required');
        return getCardById(id);
      },
      enabled: !!id,
      retry: false
    });

  useEffect(() => {
    if (isErrorCardDetail) {
      const timer = setTimeout(() => {
        navigate('/cards');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isErrorCardDetail, navigate]);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Grass: 'bg-green-500 dark:bg-green-600',
      Fire: 'bg-red-500 dark:bg-red-600',
      Water: 'bg-blue-500 dark:bg-blue-600',
      Electric: 'bg-yellow-500 dark:bg-yellow-600',
      Psychic: 'bg-purple-500 dark:bg-purple-600',
      Fighting: 'bg-orange-700 dark:bg-orange-800',
      Darkness: 'bg-gray-800 dark:bg-gray-900',
      Metal: 'bg-gray-500 dark:bg-gray-600',
      Colorless: 'bg-gray-400 dark:bg-gray-500',
    };
    return colors[type] || 'bg-gray-400 dark:bg-gray-500';
  };

  const getTypeGradientColor = (type: string) => {
    const colors: Record<string, string> = {
      Grass: 'bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700',
      Fire: 'bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700',
      Water: 'bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700',
      Electric: 'bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700',
      Psychic: 'bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700',
      Fighting: 'bg-gradient-to-r from-orange-700 to-orange-800 dark:from-orange-800 dark:to-orange-900',
      Darkness: 'bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black',
      Metal: 'bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700',
      Colorless: 'bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-600',
    };
    return colors[type] || 'bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-600';
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

  return (
    <>
      <BackButton />
      {isErrorCardDetail ? (
        <div className="flex justify-center py-8">
          <div className="text-md flex items-center gap-2">
            <p className="text-destructive">
              Error: {errorCardDetail.message}, redirecting in 3, 2, 1...
            </p>
          </div>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center py-8">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Spinner />
            Loading...
          </div>
        </div>
      ) : !pokemonData ? (
        <div className="flex justify-center py-8">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Spinner />
            Loading...
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          {/* Left Column - Image and General Info */}
          <div className="space-y-6">
            {/* Header Card */}
            <FadeUp>
              <div className="rounded-xl shadow-lg border border-border overflow-hidden">
                <div className={`text-white p-4 ${getTypeGradientColor(pokemonData.types?.[0] || 'Colorless')}`}>
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{pokemonData.name}</h1>
                    <span className="text-sm opacity-90">#{pokemonData.localId}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">HP {pokemonData.hp}</span>
                    <span className="text-sm">{pokemonData.stage}</span>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Card Image */}
            <FadeUp>
              <div className="relative group">
                <div className="relative perspective-1000">
                  <img
                    src={`${pokemonData.image}/high.webp`}
                    alt={pokemonData.name}
                    className="shadow-lg group-hover:scale-105 w-full h-auto object-contain rounded-[1.3rem] max-w-md mx-auto transition-all duration-300 ease-out cursor-pointer
                          hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]
                          transform-gpu preserve-3d"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'perspective(1000px)',
                      filter: 'brightness(1) contrast(1)'
                    }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;
                      const rotateX = (y - centerY) / 15;
                      const rotateY = (centerX - x) / 15;

                      // Calculate cursor position as percentage
                      const xPercent = (x / rect.width) * 100;
                      const yPercent = (y / rect.height) * 100;

                      e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

                      // Apply dynamic gradient filter for lightning effect
                      e.currentTarget.style.filter = `
                        brightness(1.1) 
                        contrast(1.1) 
                        drop-shadow(0 0 20px rgba(255,255,255,0.3))
                        drop-shadow(${(50 - xPercent) / 4}px ${(50 - yPercent) / 4}px 25px rgba(255,255,255,0.6))
                        drop-shadow(${(50 - xPercent) / 6}px ${(50 - yPercent) / 6}px 15px rgba(100,200,255,0.4))
                        drop-shadow(${(50 - xPercent) / 8}px ${(50 - yPercent) / 8}px 10px rgba(255,100,200,0.3))
                      `;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                      e.currentTarget.style.filter = 'brightness(1) contrast(1)';
                    }}
                  />
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="space-y-6">
            {/* Basic Info */}
            <FadeUp>
              <div className="bg-card rounded-xl shadow-lg border border-border p-6 space-y-4">
                <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  General Information
                </h2>

                {/* Types */}
                <div className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Types:</span>
                  <div className="flex gap-2 flex-wrap">
                    {pokemonData.types?.map((type, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getTypeColor(type)}`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Basic Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Illustrator:</span>
                    <p className="text-sm text-foreground">{pokemonData.illustrator}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">First Edition:</span>
                    <p className="text-sm text-foreground">
                      {pokemonData.variants.firstEdition ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Rarity:</span>
                    <p className="text-sm text-foreground">{pokemonData.rarity}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Set:</span>
                    <p className="text-sm text-foreground">{pokemonData.set.name}</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Attacks */}
            {pokemonData.attacks && pokemonData.attacks.length > 0 && (
              <FadeUp>
                <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2 mb-4">
                    Attacks
                  </h2>
                  <div className="space-y-4">
                    {pokemonData.attacks.map((attack, index) => (
                      <div key={index} className="bg-muted/50 border border-border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-foreground">{attack.name}</span>
                          <span className="text-red-600 dark:text-red-400 font-bold">{attack.damage}</span>
                        </div>
                        <div className="flex gap-1 mb-3">
                          {attack.cost && attack.cost.map((cost, costIndex) => (
                            <span
                              key={costIndex}
                              className={`px-2 py-1 rounded text-xs text-white ${getTypeColor(cost)}`}
                            >
                              {cost}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {attack.effect}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            )}

            {/* Legal Formats */}
            {(pokemonData.legal.standard || pokemonData.legal.expanded) && (
              <FadeUp>
                <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2 mb-4">
                    Legal Formats
                  </h2>
                  <div className="flex gap-3">
                    {pokemonData.legal.standard && (
                      <span className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-sm font-medium">
                        Standard
                      </span>
                    )}
                    {pokemonData.legal.expanded && (
                      <span className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm font-medium">
                        Expanded
                      </span>
                    )}
                  </div>
                </div>
              </FadeUp>
            )}

            {/* Pricing */}
            {pokemonData.pricing?.tcgplayer && (
              <FadeUp>
                <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2 mb-4">
                    TCGPlayer Pricing
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {pokemonData.pricing.tcgplayer?.holofoil && (
                      <div className="bg-muted/50 rounded-lg p-4 border border-border">
                        <div className="font-medium text-foreground mb-2">Holofoil</div>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Market:</span>{' '}
                            <span className="font-medium text-foreground">
                              {formatPrice(pokemonData.pricing.tcgplayer?.holofoil?.marketPrice, pokemonData.pricing.tcgplayer?.unit)}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Low:</span>{' '}
                            <span className="text-foreground">
                              {formatPrice(pokemonData.pricing.tcgplayer?.holofoil?.lowPrice, pokemonData.pricing.tcgplayer?.unit)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {pokemonData.pricing.tcgplayer?.normal && (
                      <div className="bg-muted/50 rounded-lg p-4 border border-border">
                        <div className="font-medium text-foreground mb-2">Normal</div>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Market:</span>{' '}
                            <span className="font-medium text-foreground">
                              {formatPrice(pokemonData.pricing.tcgplayer?.normal?.marketPrice, pokemonData.pricing.tcgplayer?.unit)}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Low:</span>{' '}
                            <span className="text-foreground">
                              {formatPrice(pokemonData.pricing.tcgplayer?.normal?.lowPrice, pokemonData.pricing.tcgplayer?.unit)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {pokemonData.pricing.tcgplayer["reverse-holofoil"] && (
                      <div className="bg-muted/50 rounded-lg p-4 border border-border">
                        <div className="font-medium text-foreground mb-2">Reverse Holofoil</div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Market:</span>{' '}
                            <span className="font-medium text-foreground">
                              {formatPrice(pokemonData.pricing.tcgplayer["reverse-holofoil"]?.marketPrice, pokemonData.pricing.tcgplayer?.unit)}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Low:</span>{' '}
                            <span className="text-foreground">
                              {formatPrice(pokemonData.pricing.tcgplayer["reverse-holofoil"]?.lowPrice, pokemonData.pricing.tcgplayer?.unit)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last updated: {formatDate(pokemonData.pricing.tcgplayer?.updated)}
                  </div>
                </div>
              </FadeUp>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CardDetail;