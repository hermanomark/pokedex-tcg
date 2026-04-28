import FadeUp from "@/components/FadeUp";
import { type PokemonCard } from "@/types";
import { getTypeColor, getTypeGradientColor, formatPrice, formatDate } from "@/utils/cardHelpers";

interface PokemonCardDetailProps {
  card: PokemonCard;
}

const PokemonCardDetail = ({ card }: PokemonCardDetailProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
      {/* Left Column - Image and Header */}
      <div className="space-y-6">
        {/* Header */}
        <FadeUp>
          <div className="rounded-xl shadow-lg border border-border overflow-hidden">
            <div className={`text-white p-4 ${getTypeGradientColor(card.types?.[0] || 'Colorless')}`}>
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{card.name}</h1>
                <span className="text-sm opacity-90">#{card.localId}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                {card.hp && <span className="text-sm">HP {card.hp}</span>}
                {card.stage && <span className="text-sm">{card.stage}</span>}
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Card Image */}
        <FadeUp>
          <div className="relative group">
            <div className="relative perspective-1000">
              <img
                src={`${card.image}/high.webp`}
                alt={card.name}
                className="shadow-lg group-hover:scale-105 w-full h-auto object-contain rounded-[1.3rem] max-w-md mx-auto transition-all duration-300 ease-out cursor-pointer
                      hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]
                      transform-gpu preserve-3d"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'perspective(1000px)',
                  filter: 'brightness(1) contrast(1)',
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 15;
                  const rotateY = (centerX - x) / 15;
                  const xPercent = (x / rect.width) * 100;
                  const yPercent = (y / rect.height) * 100;
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
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
        {/* General Info */}
        <FadeUp>
          <div className="bg-card rounded-xl shadow-lg border border-border p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
              General Information
            </h2>

            {/* Types */}
            {card.types && card.types.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">Types:</span>
                <div className="flex gap-2 flex-wrap">
                  {card.types.map((type, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getTypeColor(type)}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Illustrator:</span>
                <p className="text-sm text-foreground">{card.illustrator}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">First Edition:</span>
                <p className="text-sm text-foreground">{card.variants.firstEdition ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Rarity:</span>
                <p className="text-sm text-foreground">{card.rarity}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Set:</span>
                <p className="text-sm text-foreground">{card.set.name}</p>
              </div>
              {card.evolveFrom && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Evolves From:</span>
                  <p className="text-sm text-foreground">{card.evolveFrom}</p>
                </div>
              )}
              {card.dexId && card.dexId.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Pokédex:</span>
                  <p className="text-sm text-foreground">#{card.dexId.join(', #')}</p>
                </div>
              )}
            </div>

            {/* Description */}
            {card.description && (
              <div>
                <span className="text-sm font-medium text-muted-foreground">Description:</span>
                <p className="text-sm text-foreground mt-1 italic">{card.description}</p>
              </div>
            )}

            {/* Held Item */}
            {card.item && (
              <div className="bg-muted/50 rounded-lg p-3 border border-border">
                <span className="text-sm font-medium text-foreground">Item: {card.item.name}</span>
                <p className="text-sm text-muted-foreground mt-1">{card.item.effect}</p>
              </div>
            )}
          </div>
        </FadeUp>

        {/* Attacks */}
        {card.attacks && card.attacks.length > 0 && (
          <FadeUp>
            <div className="bg-card rounded-xl shadow-lg border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2 mb-4">
                Attacks
              </h2>
              <div className="space-y-4">
                {card.attacks.map((attack, index) => (
                  <div key={index} className="bg-muted/50 border border-border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">{attack.name}</span>
                      <span className="text-red-600 dark:text-red-400 font-bold">{attack.damage}</span>
                    </div>
                    {attack.cost && attack.cost.length > 0 && (
                      <div className="flex gap-1 mb-3">
                        {attack.cost.map((cost, costIndex) => (
                          <span
                            key={costIndex}
                            className={`px-2 py-1 rounded text-xs text-white ${getTypeColor(cost)}`}
                          >
                            {cost}
                          </span>
                        ))}
                      </div>
                    )}
                    {attack.effect && (
                      <p className="text-sm text-muted-foreground">{attack.effect}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        )}

        {/* Weaknesses */}
        {card.weaknesses && card.weaknesses.length > 0 && (
          <FadeUp>
            <div className="bg-card rounded-xl shadow-lg border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2 mb-4">
                Weaknesses
              </h2>
              <div className="flex gap-3 flex-wrap">
                {card.weaknesses.map((weakness, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-medium ${getTypeColor(weakness.type)}`}
                  >
                    <span>{weakness.type}</span>
                    <span className="opacity-80">{weakness.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        )}

        {/* Legal Formats */}
        {(card.legal.standard || card.legal.expanded) && (
          <FadeUp>
            <div className="bg-card rounded-xl shadow-lg border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2 mb-4">
                Legal Formats
              </h2>
              <div className="flex gap-3">
                {card.legal.standard && (
                  <span className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-sm font-medium">
                    Standard
                  </span>
                )}
                {card.legal.expanded && (
                  <span className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm font-medium">
                    Expanded
                  </span>
                )}
              </div>
            </div>
          </FadeUp>
        )}

        {/* Pricing */}
        {card.pricing?.tcgplayer && (
          <FadeUp>
            <div className="bg-card rounded-xl shadow-lg border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2 mb-4">
                TCGPlayer Pricing
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {card.pricing.tcgplayer.holofoil && (
                  <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <div className="font-medium text-foreground mb-2">Holofoil</div>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Market:</span>{' '}
                        <span className="font-medium text-foreground">
                          {formatPrice(card.pricing.tcgplayer.holofoil.marketPrice, card.pricing.tcgplayer.unit)}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Low:</span>{' '}
                        <span className="text-foreground">
                          {formatPrice(card.pricing.tcgplayer.holofoil.lowPrice, card.pricing.tcgplayer.unit)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {card.pricing.tcgplayer.normal && (
                  <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <div className="font-medium text-foreground mb-2">Normal</div>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Market:</span>{' '}
                        <span className="font-medium text-foreground">
                          {formatPrice(card.pricing.tcgplayer.normal.marketPrice, card.pricing.tcgplayer.unit)}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Low:</span>{' '}
                        <span className="text-foreground">
                          {formatPrice(card.pricing.tcgplayer.normal.lowPrice, card.pricing.tcgplayer.unit)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {card.pricing.tcgplayer['reverse-holofoil'] && (
                  <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <div className="font-medium text-foreground mb-2">Reverse Holofoil</div>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Market:</span>{' '}
                        <span className="font-medium text-foreground">
                          {formatPrice(card.pricing.tcgplayer['reverse-holofoil']?.marketPrice, card.pricing.tcgplayer.unit)}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Low:</span>{' '}
                        <span className="text-foreground">
                          {formatPrice(card.pricing.tcgplayer['reverse-holofoil']?.lowPrice, card.pricing.tcgplayer.unit)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                Last updated: {formatDate(card.pricing.tcgplayer.updated)}
              </div>
            </div>
          </FadeUp>
        )}
      </div>
    </div>
  );
};

export default PokemonCardDetail;
