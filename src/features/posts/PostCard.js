import React from "react";
import { Card, CardBody, CardHeader, Box, Heading, Grid } from "grommet";
import { Ascending, Descending } from "grommet-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "../authorization/authorizationSlice";
import { changeVote, makeVote, selectPosts } from "./postsSlice";

export default function PostCard({ id, content, height }) {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const post = useSelector(selectPosts)[id];
  const buttonStyle = {
    background: "none",
    color: "inherit",
    border: "none",
    padding: 0,
    font: "inherit",
    outline: "inherit",
  };

  const currentVote = useSelector(selectPosts)[id].vote_state;

  const vote = (e) => {
    var dir = e.currentTarget.value;
    console.log(`${post.id} current vote: ${currentVote}`);
    if (currentVote === dir) {
      dir = "0";
    }
    console.log(e.currentTarget.value);
    dispatch(
      makeVote({ id: `t3_${post.id}`, dir: dir, accessToken: accessToken })
    );
    dispatch(changeVote({ id: post.id, vote: dir }));
  };

  return (
    <Box align="center">
      <Card
        name="Post"
        direction="column"
        margin={{ top: "medium" }}
        height={height}
        width="large"
      >
        <CardHeader
          direction="row"
          justify="between"
          pad="small"
          align="center"
        >
          <Grid height="xsmall" width="xxsmall">
            <Box justify="center" align="center">
              <button style={buttonStyle} value="1" onClick={vote}>
                <Ascending
                  color={currentVote === "1" ? "accent-4" : "active"}
                  size="large"
                />
              </button>
            </Box>
            <Box justify="center" align="center">
              <button style={buttonStyle} value="-1" onClick={vote}>
                <Descending
                  color={currentVote === "-1" ? "accent-1" : "active"}
                  size="large"
                />
              </button>
            </Box>
          </Grid>
          <Box
            onClick={() => window.open(`https://reddit.com${post.redditLink}`)}
            justify="start"
            align="start"
            fill="horizontal"
            overflow="auto"
          >
            <Heading style={{ whiteSpace: "nowrap" }} level="2">
              {post.title}
            </Heading>
          </Box>
        </CardHeader>
        <CardBody pad="small">{content}</CardBody>
      </Card>
    </Box>
  );
}
