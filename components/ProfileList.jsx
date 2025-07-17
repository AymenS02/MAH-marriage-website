import { profile_data } from '@/assets/assets'
import React from 'react'
import ProfileItem from './ProfileItem'

const ProfileList = () => {
  const [menu, setMenu] = React.useState('All');

  const filteredData = profile_data.filter((item) => {
    if (menu === "All") return true;
    if (menu === "GreaterThan25") return item.age >= 25;
    if (menu === "LessThan25") return item.age <= 25;
    if (menu === "LessThan22") return item.age <= 22;
    return true;
  });

  return (
    <div className='bg-white py-5'>
      <div className="flex justify-center gap-10 py-10">
        <button onClick={() => setMenu('All')} className={menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}>All</button>
        <button onClick={() => setMenu('GreaterThan25')} className={menu === "GreaterThan25" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}>{'>'} 25</button>
        <button onClick={() => setMenu('LessThan25')} className={menu === "LessThan25" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}>{'<' } 25</button>
        <button onClick={() => setMenu('LessThan22')} className={menu === "LessThan22" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}>{'<' } 22</button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {filteredData.map((item, index) => (
          <ProfileItem
            key={index}
            id={item.id}
            image={item.image}
            gender={item.gender}
            name={item.name}
            description={item.description}
            age={item.age}
          />
        ))}
      </div>
    </div>
  );
}

export default ProfileList;
