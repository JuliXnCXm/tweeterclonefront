import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import { AnimatePresence } from "framer-motion";
import UserLikes from "../pages/UserLikes";
import UserTweets from "../pages/UserTweets";
import UserMedia from "../pages/UserMedia";
import UserTweetsReplies from "../pages/UserTweetsReplies";
import ExploreTop from "../pages/ExploreTop";
import ExploreMedia from "../pages/ExploreMedia";
import ExploreLatest from "../pages/ExploreLatest";
import ExplorePeople from "../pages/ExplorePeople";
import ExploreLayout from "../components/Explore/ExploreLayout";
import UserLayout from "../components/User/UserLayout";
import BookmarksLayout from "../components/Bookmarks/BookmarksLayout";
import BookmarksTweets from "../pages/BookmarksTweets";
import BookmarksMedia from "../pages/BookmarksMedia";
import BookmarksLikes from "../pages/BookmarksLikes";
import BookmarksTweetsAndReplies from "../pages/BookmarksTweetsAndReplies";

const IndexRouter = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="explore" element={<ExploreLayout />}>
          <Route index element={<ExploreTop/>} />
          <Route path="latest" element={<ExploreLatest />} />
          <Route path="people" element={<ExplorePeople />} />
          <Route path="media" element={<ExploreMedia />} />
        </Route>
        <Route path="bookmarks" element={<BookmarksLayout />}>
          <Route index element={<BookmarksTweets/>} />
          <Route path="with_replies" element={<BookmarksTweetsAndReplies />} />
          <Route path="likes" element={<BookmarksLikes/>} />
          <Route path="media" element={<BookmarksMedia />} />
        </Route>
        <Route path=":screenname" element={<UserLayout />}>
          <Route index element={<UserTweets />} />
          <Route path="with_replies" element={<UserTweetsReplies />} />
          <Route path="likes" element={<UserLikes />} />
          <Route path="media" element={<UserMedia />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
};

export default IndexRouter;
