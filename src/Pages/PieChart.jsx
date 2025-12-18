import React, { use } from 'react';
import { Pie, PieChart, Tooltip, Cell, Legend } from 'recharts';
import { AuthContext } from '../Contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';


const COLORS = ['#2563EB', '#9CA3AF'];


export default function PieChartDefaultIndex({ isAnimationActive = true }) {

    const {user,loading}=use(AuthContext)
    const axiosSecure=useAxiosSecure();
    const { data:assets=[]}=useQuery({
    queryKey: ['assets-for-chart',user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async()=>
    {
        const res=await axiosSecure.get(`/assetsAssignedforChart?hrEmail=${user.email}`)
            return Array.isArray(res.data) ? res.data : [];

    }
    })
console.log(assets);
const returnableCount=assets.filter(asset=>asset.assetType==="returnable")
console.log(returnableCount);


const data = [
  { name: 'Returnable', value: returnableCount.length },
  { name: 'Non-Returnable', value: assets.length - returnableCount.length },
];
  return (
    <PieChart width={300} height={300} className='mx-auto'>
  <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
        isAnimationActive={isAnimationActive}
        label
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />

      <Legend
        verticalAlign="bottom"
        align="center"
        iconType="circle"
      />
    </PieChart>
  );
}
