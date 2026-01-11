import React from 'react';
import PieChart from '../Pages/PieChart'
import CustomizeLegendAndTooltipStyle from '../Pages/BarChart';

const Chart = () => {
  return (
    <div>

                <h2 className="text-3xl font-bold text-center mt-24 mb-6 text-base-content">Distribution of Assets by Returnability
</h2>
    
<div className='w-full mx-auto'>
<PieChart></PieChart>
</div>
<div className='mb-8'>
<h2 className="text-3xl font-bold text-center mt-24 mb-6 text-base-content">Assets Request Bar Chart
</h2>
    <CustomizeLegendAndTooltipStyle />

</div >
    </div>
  );
};

export default Chart;