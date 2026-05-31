import React from 'react';

export const FlagIcon = ({ countryCode }) => {
  return (
    <span className="inline-block w-6 h-4 bg-gray-200 mr-2 rounded-sm overflow-hidden text-[10px] flex items-center justify-center font-bold">
      {countryCode}
    </span>
  );
};

export const FLAGS = {
  marketDeepScope: true,
  enableLocalization: true,
  showRoiForecast: true
};
