import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardById } from "@/services/cards";
import { useQuery } from "@tanstack/react-query";
import BackButton from "@/components/BackButton";
import { Spinner } from "@/components/ui/spinner";
import { type Card } from "@/types";
import PokemonCardDetail from "@/components/PokemonCardDetail";
import TrainerCardDetail from "@/components/TrainerCardDetail";
import EnergyCardDetail from "@/components/EnergyCardDetail";

const CardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: cardData,
    isLoading,
    error: errorCardDetail,
    isError: isErrorCardDetail,
  } = useQuery<Card, Error>({
    queryKey: ['card', id],
    queryFn: () => {
      if (!id) throw new Error('Card ID is required');
      return getCardById(id);
    },
    enabled: !!id,
    retry: false,
  });

  useEffect(() => {
    if (isErrorCardDetail) {
      const timer = setTimeout(() => {
        navigate('/cards');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isErrorCardDetail, navigate]);

  const renderCard = (card: Card) => {
    switch (card.category) {
      case 'Pokemon':
        return <PokemonCardDetail card={card} />;
      case 'Trainer':
        return <TrainerCardDetail card={card} />;
      case 'Energy':
        return <EnergyCardDetail card={card} />;
      default:
        return null;
    }
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
      ) : isLoading || !cardData ? (
        <div className="flex justify-center py-8">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Spinner />
            Loading...
          </div>
        </div>
      ) : (
        renderCard(cardData)
      )}
    </>
  );
};

export default CardDetail;