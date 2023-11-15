import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestPosts, selectPosts, selectLastName } from "./postsSlice";
import ShakaPlayer from "shaka-player-react";
import "shaka-player-react/dist/controls.css";
import {
  Box,
  Button as GrommetButton,
  Card,
  Image,
  Anchor,
  Grid,
  Carousel,
} from "grommet";
import PostCard from "./PostCard";

export default function User() {
  const dispatch = useDispatch();
  const lastPostName = useSelector(selectLastName);
  const posts = useSelector(selectPosts);

  /* <Card name="Post" direction="column" justify="start" pad="xsmall" gap="none" margin={{"top": "medium"}} width="100%" key={post}>
                    <h3>{posts[post].title}</h3>\
                    <a target="blank" href={posts[post].url}>{posts[post].url}</a>
                </Card>*/

  return (
    <>
      <GrommetButton
        onClick={() => {
          console.log("lastPostName :", lastPostName);
          console.log("posts", posts);
          dispatch(requestPosts(lastPostName));
        }}
        label="POSTS"
      />
      <Box direction="column">
        {Object.keys(posts).map((post) => {
          if (posts[post].type === "image") {
            return (
              <PostCard
                key={post}
                id={post}
                height="large"
                content={
                  <Image fit="contain" fill="vertical" src={posts[post].url} />
                }
              />
            );
          } else if (posts[post].type === "hosted:video") {
            return (
              <PostCard
                key={post}
                id={post}
                height="large"
                content={
                  <Box
                    direction="row"
                    justify="center"
                    align="center"
                    fit="contain"
                    fill="horizontal"
                  >
                    <div style={{ width: 350 }}>
                      <ShakaPlayer muted={true} src={posts[post].video} />
                    </div>
                  </Box>
                }
              />
            );
          } else if (posts[post].type === "link") {
            return (
              <PostCard
                key={post}
                id={post}
                height="medium"
                content={
                  <Box
                    direction="row"
                    align="start"
                    justify="center"
                    fit="contain"
                    fill="horizontal"
                  >
                    <Grid rows={["full"]} columns={["2/3", "1/3"]}>
                      <Box
                        direction="row"
                        align="center"
                        justify="center"
                        fit="contain"
                        fill="horizontal"
                      >
                        <Anchor
                          size="small"
                          label={posts[post].url}
                          href={posts[post].url}
                        />
                      </Box>
                      <Box
                        round="xlarge"
                        direction="row"
                        align="center"
                        justify="center"
                        fit="contain"
                        fill="horizontal"
                      >
                        <Image fit="cover" src={posts[post].thumbnail} />
                      </Box>
                    </Grid>
                  </Box>
                }
              />
            );
          } else if (posts[post].type === "gallery") {
            return (
              <PostCard
                key={post}
                id={post}
                height="large"
                content={
                  <Carousel>
                    {posts[post].galleryData.map((link) => {
                      return (
                        <Image
                          key={link}
                          fit="contain"
                          fill="vertical"
                          src={link}
                        />
                      );
                    })}
                  </Carousel>
                }
              />
            );
          }
          return (
            <Card
              name="Post"
              direction="column"
              justify="start"
              pad="xsmall"
              gap="none"
              margin={{ top: "medium" }}
              width="100%"
              key={post}
            >
              {posts[post].title}
              <p style={{ color: "red" }}>UNRECOGNIZED POST</p>
              <a
                target="blank"
                href={`https://reddit.com${posts[post].redditLink}`}
              >
                {posts[post].redditLink}
              </a>
            </Card>
          );
        })}
      </Box>
    </>
  );
}
