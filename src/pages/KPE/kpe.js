import React from 'react';

const KPE = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">KPE</h1>
      <br />
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Görsel 1 */}
        <div className="flex justify-center">
          <img
            src="/logos/ORBİTİE-BROŞÜR-1.png"
            alt="KPE Görsel 1"
            style={{ maxWidth: '100%', height: '100%', maxHeight: '2000px' }}
            className="rounded-lg"
          />
        </div>

        {/* Görsel 2 */}
        <div className="flex justify-center">
          <img
            src="/logos/ORBİTİE-BROŞÜR-2.png"
            alt="KPE Görsel 2"
            style={{ maxWidth: '100%', height: '100%', maxHeight: '2000px' }}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default KPE; 