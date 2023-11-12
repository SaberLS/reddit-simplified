import React from "react";
import { Card, CardBody, CardHeader, Box, Heading, Grid, } from "grommet";
import { Ascending, Descending } from "grommet-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "../authorization/authorizationSlice";
import { makeVote } from "./postsSlice";



export default function PostCard({ post, content, height }) {
    const accessToken = useSelector(selectAccessToken);
    const dispatch = useDispatch();


    const vote = ({target}) => {
        dispatch(makeVote({id: `t3_${post.id}`, dir: '1', accessToken: accessToken }));
    }


    return (
        <Box align="center">
            <Card name="Post" direction="column" margin={{"top": "medium"}} height={height} width="large">
                <CardHeader direction="row" justify="between" pad="small" align="center">
                    <Grid  height="xsmall" width="xxsmall">
                        <Box justify="center" align="center">
                            <Ascending size="large" onClick={vote} />
                        </Box>
                        <Box justify="center" align="center">
                            <Descending size="large" onClick={vote} />
                        </Box>
                    </Grid>
                    <Box onClick={ () => window.open(`https://reddit.com${post.redditLink}`)} justify="start" align="start" fill="horizontal" overflow="auto">
                        <Heading style={{whiteSpace: 'nowrap'}} level="2">{post.title}</Heading>
                    </Box>
                </CardHeader>
                <CardBody pad="small">
                    { content }
                </CardBody>
            </Card>
        </Box>

    )
}