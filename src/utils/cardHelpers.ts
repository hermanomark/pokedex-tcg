export const getTypeColor = (type: string): string => {
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

export const getTypeGradientColor = (type: string): string => {
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

export const formatPrice = (price: number | undefined, unit: number | string | undefined): string => {
  return `${unit === 'USD' ? '$' : '€'}${price?.toFixed(2)}`;
};

export const formatDate = (dateString: string | number | undefined): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString as string);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
