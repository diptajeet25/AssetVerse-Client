import React, { useEffect, useState } from 'react';

const Package = ({packagePromise}) => {
    
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    packagePromise.then(setPackages);
  }, [packagePromise]);
  return (
    <div>
        <h1 className="text-4xl font-bold text-center mb-8 mt-8 text-black">Choose the Best Package for Your Team</h1>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 p-6 pt-2">
            
      {packages.map((pkg, index) => (
        <div
          key={index}
          className="border rounded-xl p-6 shadow hover:shadow-lg text-black transition bg-white"
        >
        
          <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
          <p className=" text-sm mb-4">
            Employee Limit: {pkg.employeeLimit}
          </p>

          <div className="text-3xl font-bold mb-4">
            ${pkg.price}
            <span className="text-sm "> /month</span>
          </div>

          <ul className="mb-6 space-y-2">
            {pkg.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {feature}
              </li>
            ))}
          </ul>
          <button className="w-full text-white py-2 rounded-lg bg-black hover:bg-gray-800">
            Choose {pkg.name}
          </button>
        </div>
      ))}
    </div>

    </div>
  );
};

export default Package;