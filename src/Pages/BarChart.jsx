import { useQuery } from '@tanstack/react-query';
import { use } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';





export default function CustomizeLegendAndTooltipStyle() {
    const {user,loading}=use(AuthContext)
    const axiosSecure=useAxiosSecure();



    const {data:request=[]}=useQuery(
    {
        queryKey:['asset-requests-for--chart',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/requestForChart?hrEmail=${user.email}`);
            return Array.isArray(res.data) ? res.data : [];

    }
}
)



const assetCount=request.reduce((acc,res)=>
{
    const name=res.assetName;

    if (acc[name]) {
    acc[name] += 1;
  } 
  else 
    {
    acc[name] = 1;
  }

  return acc;

},{});

const assetArray = Object.entries(assetCount).map(
  ([name, count]) => ({
    name,
    count
  })
);

const top5Assets = assetArray
  .sort((a, b) => b.count - a.count)
  .slice(0, 5);





const data = top5Assets.map((asset) => ({
    name: asset.name,
    number: asset.count,
    }));
const margin = { top: 5, right: 30, left: 20, bottom: 5 };


  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={margin}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="5 5" />
          <Bar dataKey="number" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
