
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RegionSelector = () => {
  const [selectedRegion, setSelectedRegion] = useState('');

  const regions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'eu', label: 'European Union' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'jp', label: 'Japan' },
    { value: 'sg', label: 'Singapore' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white text-xl font-semibold">Select Region</CardTitle>
        <p className="text-slate-400 text-sm">Choose your region (or country)</p>
      </CardHeader>
      <CardContent>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-purple-500">
            <SelectValue placeholder="Select your region" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            {regions.map((region) => (
              <SelectItem 
                key={region.value} 
                value={region.value}
                className="text-white hover:bg-slate-700 focus:bg-slate-700"
              >
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default RegionSelector;
