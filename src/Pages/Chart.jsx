import React from 'react';
import PieChart from '../Pages/PieChart'

const Chart = () => {
  return (
    <div>

                <h2 className="text-3xl font-bold text-center mt-16 mb-2 text-black">Distribution of Assets by Returnability
</h2>
    
<div className='w-full mx-auto'>
<PieChart></PieChart>
</div>
    </div>
  );
};

export default Chart;