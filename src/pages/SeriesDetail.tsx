import { useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSeriesById } from "../services/series";
import BackButton from "../components/BackButton";
import noImage from '../assets/no-image.png';
import { Spinner } from "../components/ui/spinner";
import FadeUp from "@/components/FadeUp";

interface Set {
  id: string;
  name: string;
  logo?: string;
  symbol?: string;
  cardCount: {
    official: number;
    total: number;
  };
}

interface SeriesDetail {
  name: string;
  logo?: string;
  releaseDate: string;
  firstSet: Set;
  lastSet: Set;
  sets: Set[];
}

const SeriesDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: seriesDetail,
    isLoading,
    error: errorSeriesDetail, isError: isErrorSeriesDetail } = useQuery<SeriesDetail>({
      queryKey: ['series', id],
      queryFn: () => {
        if (!id) throw new Error('Series ID is required');
        return getSeriesById(id);
      },
      enabled: !!id,
      retry: false
    });

  useEffect(() => {
    if (isErrorSeriesDetail) {
      const timer = setTimeout(() => {
        navigate('/sets');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isErrorSeriesDetail, navigate]);

  useEffect(() => {
    console.log('Series Detail:', seriesDetail);
  }, [seriesDetail]);

  return (
    <>
      <BackButton />
      {isErrorSeriesDetail ?
        (<div className="flex justify-center py-8">
          <div className="text-md flex items-center gap-2">
            <p className="text-pink-700">
              Error: {errorSeriesDetail.message}, redirecting in 3, 2, 1...
            </p>
          </div>
        </div>)
        : (
          isLoading ?
            (<div className="flex justify-center py-8">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Spinner />
                Loading...
              </div>
            </div>) : (
              !seriesDetail ?
                (<div className="flex justify-center py-8">
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Spinner />
                    Loading...
                  </div>
                </div>) : (
                  <>
                    {/* Header Section */}
                    <FadeUp>
                      <div className="flex items-center gap-4 mb-6 mt-4">
                        {seriesDetail.logo && (<img
                          src={`${seriesDetail.logo}.png`}
                          alt={`${seriesDetail.name} logo`}
                          className="w-20 h-20 object-contain"
                        />)}
                        <div>
                          <h1 className="text-3xl font-bold text-primary">{seriesDetail.name} Series</h1>
                          <p className="text-secondary-foreground">
                            Released on <span className="font-medium">{seriesDetail.releaseDate}</span>
                          </p>
                        </div>
                      </div>
                    </FadeUp>


                    {/* Summary Section */}
                    <FadeUp>
                      <div className="bg-card rounded-xl p-4 mb-6 border border-border">
                        <h2 className="text-xl font-semibold text-primary mb-3">
                          Series Overview
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            {seriesDetail.firstSet.symbol ? (<img
                              src={`${seriesDetail.firstSet.symbol}.png`}
                              alt={seriesDetail.firstSet.name}
                              className="w-8 h-8"
                            />) : (
                              <img
                                src={noImage}
                                alt='placeholder'
                                className="w-8 h-8"
                              />
                            )}
                            <span className="text-secondary-foreground">
                              <strong>First Set:</strong> {seriesDetail.firstSet.name} ({seriesDetail.firstSet.cardCount.total} cards)
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            {seriesDetail.lastSet.symbol && (<img src={`${seriesDetail.lastSet.symbol}.png`} alt={seriesDetail.lastSet.name} className="w-8 h-8" />)}
                            <span className="text-secondary-foreground">
                              <strong>Last Set:</strong> {seriesDetail.lastSet.name} ({seriesDetail.lastSet.cardCount.total} cards)
                            </span>
                          </div>
                        </div>
                      </div>
                    </FadeUp>

                    {/* Sets List */}
                    <div>
                      <FadeUp>
                        <h2 className="text-2xl font-bold text-secondary-foreground mb-4">Included Sets</h2>
                      </FadeUp>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {seriesDetail.sets.map((set: Set) => (
                          <FadeUp key={set.id}>
                            <Link to={`/sets/${set.id}`}>
                              <div
                                className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex flex-col items-center text-center"
                              >
                                {set.logo ? (<img
                                  src={`${set.logo}.png`}
                                  alt={set.name}
                                  className="w-24 h-24 object-contain mb-2"
                                />) :
                                  <img
                                    src={noImage}
                                    alt='placeholder'
                                    className="w-24 h-24 object-contain mb-2"
                                  />}
                                <h3 className="font-semibold text-secondary-foreground">{set.name}</h3>
                                {set.symbol ? (<img
                                  src={`${set.symbol}.png`}
                                  alt={`${set.name} symbol`}
                                  className="w-6 h-6 my-2"
                                />) : <img
                                  src={noImage}
                                  alt='placeholder'
                                  className="w-6 h-6 my-2"
                                />}
                                <p className="text-secondary-foreground text-sm">
                                  {set.cardCount.official} official / {set.cardCount.total} total
                                </p>
                              </div>
                            </Link>
                          </FadeUp>
                        ))}
                      </div>
                    </div>
                  </>
                )
            ))}
    </>
  );
}

export default SeriesDetail;