import React from 'react'
import ExploreNav from '../ExploreNav'
import { Outlet } from "react-router-dom";
import './index.css'

const ExploreLayout = () => {
  return (
    <section className="exploreLayout">
      <ExploreNav />
      <div className='exploreLayout--children'>
        <Outlet />
      </div>
    </section>
  );
}

export default ExploreLayout