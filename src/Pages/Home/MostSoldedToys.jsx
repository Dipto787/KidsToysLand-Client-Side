import axios from "axios";
import { useEffect, useState } from "react";

const MostSoldEdToys = () => {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    axios.get('Toys.json')
      .then(res => {
        // Sort from highest sold to lowest sold
        const sorted = res.data.sort((a, b) => b.sold - a.sold);
        setToys(sorted);
      })
     
  }, []);

  return (
    <div>
      <h2>Most Sold Toys (High to Low)</h2>
      {toys.map((toy, i) => (
        <div key={i}>
          <h3>{toy.name}</h3>
          <p>Sold: {toy.sold}</p>
        </div>
      ))}
    </div>
  );
};

export default MostSoldEdToys;
