import React from 'react'
import BookmarksNav from '../BookmarksNav'
import { Outlet } from "react-router-dom";
import './index.css'

const BookmarksLayout = () => {
  return (
    <section className="bookmarksLayout">
      <BookmarksNav />
      <Outlet />
    </section>
  );
}

export default BookmarksLayout